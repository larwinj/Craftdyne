/**
 * WCAG AA contrast audit.
 *
 * Colours are resolved by painting them onto a 1x1 canvas and reading the pixel
 * back, rather than by parsing the computed-style string. Tailwind v4 emits
 * `oklab()`/`oklch()` values, and a naive RGB parse of those produces wildly
 * wrong ratios — the canvas makes the browser do the colour-space conversion.
 *
 * Semi-transparent text and backgrounds are composited against what is actually
 * behind them before the ratio is taken.
 *
 * Usage:
 *   npm run build && npm run preview &
 *   node scripts/audit-contrast.mjs [baseUrl]
 */
import { chromium } from 'playwright';

import { LOCALES, ROUTE_PATHS } from '../app/config/site.js';

const BASE = process.argv[2] ?? 'http://localhost:4173';

/** Runs in the page. Returns every text node failing WCAG AA. */
function auditContrast() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  const cache = new Map();
  /** Resolve any CSS colour string to [r, g, b, a] in sRGB. */
  function toRgba(value) {
    if (cache.has(value)) return cache.get(value);
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = '#000';
    ctx.fillStyle = value;
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    const out = [r, g, b, a / 255];
    cache.set(value, out);
    return out;
  }

  const over = (fg, bg) => fg.slice(0, 3).map((c, i) => c * fg[3] + bg[i] * (1 - fg[3]));

  function luminance([r, g, b]) {
    const f = (c) => {
      const s = c / 255;
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  }

  function ratio(a, b) {
    const l1 = luminance(a);
    const l2 = luminance(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }

  /**
   * Pull the colour stops out of a gradient so it can be evaluated.
   * A gradient has no `backgroundColor`, so without this every element sitting
   * on one appears to be on the page's white background — which reports white
   * text on a green gradient as a 1.00 ratio.
   */
  function gradientStops(image) {
    if (!image || image === 'none' || !image.includes('gradient')) return [];
    const matches = image.match(/(?:rgba?|oklab|oklch|hsla?|color)\([^)]*\)|#[0-9a-f]{3,8}/gi) ?? [];
    return matches.map(toRgba).filter((c) => c[3] > 0);
  }

  /** Composite every backdrop between the element and the page root. */
  function effectiveBackgrounds(el) {
    const layers = [];
    let node = el;
    let gradient = [];

    while (node && node !== document.documentElement) {
      const style = getComputedStyle(node);
      const stops = gradientStops(style.backgroundImage);
      if (stops.length && gradient.length === 0) {
        gradient = stops;
        break; // a gradient is opaque for our purposes
      }
      const bg = toRgba(style.backgroundColor);
      if (bg[3] > 0) {
        layers.push(bg);
        if (bg[3] === 1) break;
      }
      node = node.parentElement;
    }

    let base = [255, 255, 255];
    for (let i = layers.length - 1; i >= 0; i -= 1) base = over(layers[i], base);

    // Every stop of a gradient must pass, so return them all and take the worst.
    if (gradient.length) return gradient.map((stop) => over(stop, base));
    return [base];
  }

  const failures = [];
  for (const el of document.querySelectorAll('a,button,p,h1,h2,h3,h4,h5,span,li,dt,dd,label,summary,address,option')) {
    if (el.children.length > 0) continue; // leaf text nodes only
    const text = (el.textContent ?? '').trim();
    if (!text) continue;
    // `role="img"` marks a composed illustration (the product-pack rendering),
    // which is an image as far as assistive tech and WCAG 1.4.3 are concerned.
    if (el.closest('[inert],[aria-hidden="true"],[role="img"]')) continue;

    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) continue;

    const style = getComputedStyle(el);
    if (style.visibility === 'hidden' || style.opacity === '0') continue;

    const backgrounds = effectiveBackgrounds(el);
    const size = parseFloat(style.fontSize);
    const weight = Number(style.fontWeight) || 400;
    // WCAG "large text": >=24px, or >=18.66px when bold.
    const large = size >= 24 || (size >= 18.66 && weight >= 700);
    const required = large ? 3 : 4.5;

    // Worst case across a gradient's stops.
    let value = Infinity;
    for (const bg of backgrounds) {
      value = Math.min(value, ratio(over(toRgba(style.color), bg), bg));
    }

    if (value < required) {
      failures.push({
        text: text.slice(0, 40),
        ratio: value.toFixed(2),
        required,
        color: style.color,
        size: Math.round(size),
        selector: `${el.tagName.toLowerCase()}.${(el.className || '').toString().split(/\s+/).slice(0, 2).join('.')}`,
      });
    }
  }
  return failures;
}

const paths = ROUTE_PATHS.flatMap((p) => LOCALES.map((lang) => (p ? `/${lang}/${p}` : `/${lang}`)));

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await context.newPage();

const seen = new Set();
const all = [];

for (const path of paths) {
  await page.goto(`${BASE}${path}`, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.evaluate(() => document.fonts?.ready).catch(() => {});
  const failures = await page.evaluate(auditContrast);
  for (const f of failures) {
    const key = `${f.text}|${f.color}|${f.ratio}`;
    if (seen.has(key)) continue;
    seen.add(key);
    all.push({ ...f, path });
  }
}

await browser.close();

if (all.length === 0) {
  console.log(`✓ No WCAG AA contrast failures across ${paths.length} pages.`);
} else {
  console.log(`✗ ${all.length} distinct contrast failures:\n`);
  for (const f of all) {
    console.log(`  ${f.ratio} (need ${f.required})  ${f.size}px  "${f.text}"`);
    console.log(`      ${f.color}  ${f.selector}  ${f.path}`);
  }
}
process.exit(all.length === 0 ? 0 : 1);
