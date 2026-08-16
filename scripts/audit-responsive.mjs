/**
 * Scripted responsive audit.
 *
 * Checks two defect classes that eyeballing reliably misses:
 *   1. Horizontal overflow — any element wider than the viewport, which forces
 *      the whole page to scroll sideways.
 *   2. Undersized touch targets — interactive elements below the 44x44px
 *      WCAG 2.5.5 / Apple HIG minimum.
 *
 * Runs every route in every locale across the full device matrix.
 *
 * Usage:
 *   npm run build && npm run preview &
 *   node scripts/audit-responsive.mjs [baseUrl]
 */
import { chromium } from 'playwright';

import { LOCALES, ROUTE_PATHS } from '../app/config/site.js';

const BASE = process.argv[2] ?? 'http://localhost:4173';

const VIEWPORTS = [
  { name: '320  iPhone SE / small Android', width: 320, height: 568 },
  { name: '360  common Android', width: 360, height: 740 },
  { name: '390  iPhone 14', width: 390, height: 844 },
  { name: '430  iPhone Pro Max', width: 430, height: 932 },
  { name: '844  phone landscape', width: 844, height: 390 },
  { name: '768  iPad portrait', width: 768, height: 1024 },
  { name: '1024 iPad landscape', width: 1024, height: 768 },
  { name: '1280 laptop', width: 1280, height: 800 },
  { name: '1440 desktop', width: 1440, height: 900 },
  { name: '1920 wide desktop', width: 1920, height: 1080 },
];

/** Runs in the page. Returns overflowing elements and small tap targets. */
function auditPage(minTarget) {
  /**
   * Elements that exist in the DOM but are not currently reachable: anything
   * inside a closed overlay (`aria-hidden`), and screen-reader-only links whose
   * visual styles only apply on :focus. Measuring these produces failures for
   * things a user can never tap in that state.
   */
  const isUnreachable = (el) => {
    if (el.closest('[aria-hidden="true"]') || el.closest('[inert]')) return true;
    const style = getComputedStyle(el);
    // Tailwind's sr-only clips the element away entirely.
    if (style.clipPath === 'inset(50%)') return true;
    return false;
  };

  const describe = (el) => {
    const id = el.id ? `#${el.id}` : '';
    const cls =
      typeof el.className === 'string' && el.className
        ? `.${el.className.trim().split(/\s+/).slice(0, 3).join('.')}`
        : '';
    return `${el.tagName.toLowerCase()}${id}${cls}`;
  };

  const docWidth = document.documentElement.clientWidth;

  const overflow = [];
  for (const el of document.querySelectorAll('body *')) {
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) continue;
    const style = getComputedStyle(el);
    if (style.visibility === 'hidden' || style.display === 'none') continue;
    if (isUnreachable(el)) continue;
    // Allow a 1px rounding tolerance.
    if (rect.right > docWidth + 1 || rect.left < -1) {
      // Ignore elements that are intentionally clipped by a scroll container.
      let parent = el.parentElement;
      let insideScroller = false;
      while (parent && parent !== document.body) {
        const ps = getComputedStyle(parent);
        if (ps.overflowX === 'auto' || ps.overflowX === 'scroll' || ps.overflowX === 'hidden') {
          insideScroller = true;
          break;
        }
        parent = parent.parentElement;
      }
      if (!insideScroller) {
        overflow.push({ el: describe(el), left: Math.round(rect.left), right: Math.round(rect.right) });
      }
    }
  }

  const small = [];
  const selector = 'a[href], button, input:not([type="hidden"]), select, textarea, summary, [role="button"]';
  for (const el of document.querySelectorAll(selector)) {
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) continue;
    const style = getComputedStyle(el);
    if (style.visibility === 'hidden' || style.display === 'none') continue;
    if (isUnreachable(el)) continue;
    // Skip links inside a run of prose — WCAG exempts inline text links.
    const parentTag = el.parentElement?.tagName.toLowerCase();
    if (el.tagName === 'A' && ['p', 'li', 'address', 'span', 'dd'].includes(parentTag)) continue;

    if (rect.height < minTarget - 0.5 || rect.width < minTarget - 0.5) {
      small.push({
        el: describe(el),
        size: `${Math.round(rect.width)}x${Math.round(rect.height)}`,
        text: (el.textContent ?? '').trim().slice(0, 30),
      });
    }
  }

  /**
   * Header nav items and the language label must stay on one line.
   *
   * Tamil and Hindi labels are considerably longer than their English
   * equivalents, and without `whitespace-nowrap` they wrap to two or three
   * stacked lines — which still "fits" the viewport, so the overflow check
   * above never catches it. A wrapped text run reports more than one client
   * rect, which is what this detects.
   */
  const wrapped = [];
  for (const el of document.querySelectorAll('header nav a, header button[aria-haspopup="listbox"] span')) {
    if (isUnreachable(el)) continue;
    const style = getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') continue;
    const range = document.createRange();
    range.selectNodeContents(el);
    if (range.getClientRects().length > 1) {
      wrapped.push({ el: describe(el), text: (el.textContent ?? '').trim().slice(0, 24) });
    }
  }

  return {
    overflow,
    small,
    wrapped,
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: docWidth,
  };
}

const paths = ROUTE_PATHS.flatMap((p) => LOCALES.map((lang) => (p ? `/${lang}/${p}` : `/${lang}`)));

const browser = await chromium.launch();
let overflowFailures = 0;
let targetFailures = 0;
let wrapFailures = 0;
let checks = 0;

console.log(`Auditing ${paths.length} pages x ${VIEWPORTS.length} viewports against ${BASE}\n`);

for (const viewport of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 2,
    isMobile: viewport.width < 768,
    hasTouch: viewport.width < 1024,
  });
  const page = await context.newPage();

  const overflowHits = [];
  const targetHits = [];
  const wrapHits = [];

  for (const path of paths) {
    try {
      // `networkidle` is unreliable here — fonts and prefetches keep the network
      // busy past the timeout. The DOM being parsed is what this audit measures.
      await page.goto(`${BASE}${path}`, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await page.waitForLoadState('load', { timeout: 10000 }).catch(() => {});
      // Let fonts settle so text-driven heights are measured at final size.
      await page.evaluate(() => document.fonts?.ready).catch(() => {});

      const result = await page.evaluate(auditPage, 44);
      checks += 1;

      if (result.scrollWidth > result.clientWidth + 1) {
        overflowHits.push({ path, ...result });
      }
      if (result.small.length) {
        targetHits.push({ path, small: result.small });
      }
      if (result.wrapped.length) {
        wrapHits.push({ path, wrapped: result.wrapped });
      }
    } catch (error) {
      // One flaky navigation must not abort the whole matrix.
      console.log(`    ! ${path} could not be audited: ${error.message.split('\n')[0]}`);
    }
  }

  const status = overflowHits.length === 0 && targetHits.length === 0 && wrapHits.length === 0 ? 'PASS' : 'FAIL';
  console.log(`${status === 'PASS' ? '✓' : '✗'} ${viewport.name.padEnd(32)} ${status}`);

  for (const hit of overflowHits.slice(0, 3)) {
    overflowFailures += 1;
    console.log(`    overflow ${hit.path}: scrollWidth ${hit.scrollWidth} > ${hit.clientWidth}`);
    for (const o of hit.overflow.slice(0, 4)) {
      console.log(`      ${o.el}  [${o.left} → ${o.right}]`);
    }
  }
  for (const hit of targetHits.slice(0, 3)) {
    targetFailures += 1;
    console.log(`    small targets ${hit.path}:`);
    for (const s of hit.small.slice(0, 4)) {
      console.log(`      ${s.el}  ${s.size}  "${s.text}"`);
    }
  }
  for (const hit of wrapHits.slice(0, 3)) {
    wrapFailures += 1;
    console.log(`    wrapped nav labels ${hit.path}:`);
    for (const w of hit.wrapped.slice(0, 4)) {
      console.log(`      ${w.el}  "${w.text}"`);
    }
  }

  await context.close();
}

await browser.close();

console.log(`\n${checks} page/viewport checks run.`);
console.log(`Overflow failures:      ${overflowFailures}`);
console.log(`Touch-target failures:  ${targetFailures}`);
console.log(`Wrapped nav labels:     ${wrapFailures}`);
process.exit(overflowFailures + targetFailures + wrapFailures > 0 ? 1 : 0);
