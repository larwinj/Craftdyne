/**
 * Generate the favicon, PWA icons, Apple touch icon and Open Graph share image
 * from the client's real brand colours.
 *
 * Run with `npm run assets` any time `public/brand/craftdyne-logo.png` changes.
 *
 * Source: `public/brand/craftdyne-logo.png` — the official CraftDyne lockup
 * (roundel + wordmark + tagline), supplied by the client.
 *
 * IMPORTANT — why this does not simply crop the client's PNG:
 *
 * The roundel in the source file is not a solid circle. Verified by direct
 * pixel inspection across two separate exports of the file: the region between
 * the green cap and the navy cap — including at the circle's own left/right
 * edges, away from the wordmark — is genuinely blank (transparent in one
 * export, flat white in the other), not circle colour continuing behind the
 * text. The true design is two caps with a real gap where "CraftDyne" sits;
 * the closed-circle look only reads correctly with the wordmark present. A
 * small icon has no room for that text, so cropping and stacking the caps
 * produces a squashed oval, not a circle (this was tried — see git history).
 *
 * Instead, `sampleGradientColors()` reads the real green and navy gradient
 * stops straight from the client's file, and `iconSvg()` draws a true circle
 * using those exact colours. This is faithful to the client's actual palette
 * everywhere the mark appears small — favicon, PWA icons, header — while the
 * client's real PNG is used untouched for the Open Graph share card, where a
 * fixed-language raster mark is normal (see below).
 *
 * The tagline is NOT baked into any of these — every generated asset is icon
 * colour only. The tagline text stays live HTML everywhere in the app, because
 * it is translated per locale (see app/i18n/locales/*\/common.json); baking
 * English text into a raster asset would freeze it in English on the Tamil and
 * Hindi pages too.
 *
 * TODO(client): `public/brand/ecoagta-logo.png` has not been supplied yet, so
 * the EcoAgta ginkgo mark is still a hand-drawn placeholder in
 * app/components/ui/product-bottle.jsx.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');
const brandDir = join(publicDir, 'brand');

const NAVY = '#12308c';

async function render(input, outPath, { width, height } = {}) {
  await mkdir(dirname(outPath), { recursive: true });
  let pipeline = sharp(input);
  if (width) pipeline = pipeline.resize(width, height ?? width, { fit: 'contain' });
  await pipeline.png({ compressionLevel: 9 }).toFile(outPath);
  console.log(`  ✓ ${outPath.replace(root + '/', '')}`);
}

/**
 * Read the real green and navy gradient stops out of the client's PNG.
 *
 * A same-colour row scan on its own is not reliable here: a handful of stray
 * anti-aliased edge pixels elsewhere in the image (e.g. on the dark wordmark
 * or tagline text) can weakly pass a loose colour threshold and get treated as
 * part of the roundel, corrupting the sampled gradient. So this groups matching
 * rows into contiguous bands first and takes only the tallest band per colour —
 * that is reliably the real cap, since nothing else in the artwork is anywhere
 * near ~100px of continuous green or navy.
 */
async function sampleGradientColors(sourcePath) {
  const { data, info } = await sharp(sourcePath).ensureAlpha().flatten({ background: '#ffffff' }).raw().toBuffer({
    resolveWithObject: true,
  });
  const { width, height, channels } = info;
  const at = (x, y) => {
    const i = (y * width + x) * channels;
    return [data[i], data[i + 1], data[i + 2]];
  };
  const isBackground = ([r, g, b]) => (r > 245 && g > 245 && b > 245) || (r < 20 && g < 20 && b < 20);
  const isGreen = ([r, g, b]) => g > r + 15 && g > b + 15 && g > 80;
  const isNavy = ([r, g, b]) => b > r + 10 && b > g + 10 && b > 60 && g < 150;

  function tallestBand(matcher) {
    const rowHas = [];
    for (let y = 0; y < height; y += 1) {
      let has = false;
      for (let x = 0; x < width; x += 2) {
        const c = at(x, y);
        if (isBackground(c)) continue;
        if (matcher(c)) {
          has = true;
          break;
        }
      }
      rowHas.push(has);
    }
    const bands = [];
    let start = null;
    let emptyRun = 0;
    const GAP_TOLERANCE = 3;
    for (let y = 0; y < height; y += 1) {
      if (rowHas[y]) {
        if (start === null) start = y;
        emptyRun = 0;
      } else if (start !== null) {
        emptyRun += 1;
        if (emptyRun > GAP_TOLERANCE) {
          bands.push([start, y - emptyRun]);
          start = null;
          emptyRun = 0;
        }
      }
    }
    if (start !== null) bands.push([start, height - 1]);
    bands.sort((a, b) => b[1] - b[0] - (a[1] - a[0]));
    return bands[0];
  }

  function gradientStops([y0, y1], matcher) {
    const colsAt = (y) => {
      const cols = [];
      for (let x = 0; x < width; x += 1) if (matcher(at(x, y))) cols.push(x);
      return cols;
    };
    const topCols = colsAt(y0 + 2);
    const bottomCols = colsAt(y1 - 2);
    const topColor = at(topCols[Math.floor(topCols.length / 2)], y0 + 2);
    const bottomColor = at(bottomCols[Math.floor(bottomCols.length / 2)], y1 - 2);
    return [topColor, bottomColor];
  }

  const greenBand = tallestBand(isGreen);
  const navyBand = tallestBand(isNavy);
  if (!greenBand || greenBand[1] - greenBand[0] < 30 || !navyBand || navyBand[1] - navyBand[0] < 30) {
    throw new Error(
      `sampleGradientColors: could not locate a green/navy roundel of a plausible size in ${sourcePath}. ` +
        'Inspect the file — the colour thresholds in this function may need adjusting for a differently lit export.',
    );
  }

  const [greenTopColor, greenBottomColor] = gradientStops(greenBand, isGreen);
  const [navyTopColor, navyBottomColor] = gradientStops(navyBand, isNavy);
  const toHex = ([r, g, b]) =>
    `#${[r, g, b]
      .map((v) =>
        Math.max(0, Math.min(255, Math.round(v)))
          .toString(16)
          .padStart(2, '0'),
      )
      .join('')}`;

  return {
    greenTop: toHex(greenTopColor),
    greenBottom: toHex(greenBottomColor),
    navyTop: toHex(navyTopColor),
    navyBottom: toHex(navyBottomColor),
  };
}

/**
 * The CraftDyne roundel, drawn as a true circle using colours sampled from the
 * client's real artwork. See the file header for why this is not a crop.
 */
function iconSvg(colors, { size = 512 } = {}) {
  const r = size / 2;
  const c = size / 2;
  // The top path's arc endpoints must sit exactly on the circle (c-r, c) and
  // (c+r, c) — anything inset from that leaves the arc smaller than the navy
  // circle underneath, showing as a thin navy rim around the green half.
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="top" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${colors.greenTop}"/><stop offset="100%" stop-color="${colors.greenBottom}"/>
    </linearGradient>
    <linearGradient id="bottom" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${colors.navyTop}"/><stop offset="100%" stop-color="${colors.navyBottom}"/>
    </linearGradient>
    <radialGradient id="gloss" cx="35%" cy="20%" r="70%">
      <stop offset="0%" stop-color="#fff" stop-opacity="0.45"/><stop offset="55%" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="disc"><circle cx="${c}" cy="${c}" r="${r}"/></clipPath>
  </defs>
  <g clip-path="url(#disc)">
    <circle cx="${c}" cy="${c}" r="${r}" fill="url(#bottom)"/>
    <path d="M${c - r} ${c} A${r} ${r} 0 0 1 ${c + r} ${c} Z" fill="url(#top)"/>
    <circle cx="${c}" cy="${c}" r="${r}" fill="url(#gloss)"/>
  </g>
</svg>`;
}

/**
 * 1200x630 Open Graph share card, used for WhatsApp, LinkedIn and Facebook
 * previews. Fixed to English by design: social-preview cards are conventionally
 * a single language regardless of which locale of the page was shared, the same
 * way a favicon or an app-store listing icon is — unlike the tagline shown
 * live on the page, which stays localized.
 */
function ogSvg(colors) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f1f8f2"/><stop offset="100%" stop-color="#ffffff"/>
    </linearGradient>
    <linearGradient id="t" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${colors.greenTop}"/><stop offset="100%" stop-color="${colors.greenBottom}"/>
    </linearGradient>
    <linearGradient id="b" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${colors.navyTop}"/><stop offset="100%" stop-color="${colors.navyBottom}"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1080" cy="90" r="260" fill="${colors.greenBottom}" opacity="0.07"/>
  <circle cx="120" cy="580" r="200" fill="#a8d08d" opacity="0.16"/>

  <g transform="translate(88 96)">
    <circle cx="44" cy="44" r="43" fill="url(#b)"/>
    <path d="M1 44a43 43 0 0 1 86 0Z" fill="url(#t)"/>
  </g>
  <text x="196" y="152" font-family="Helvetica, Arial, sans-serif" font-size="44" font-weight="700" fill="${NAVY}" letter-spacing="4">CraftDyne</text>
  <text x="196" y="186" font-family="Helvetica, Arial, sans-serif" font-size="20" font-weight="600" fill="${colors.greenBottom}">Green &amp; Efficient Molecules at Work</text>

  <text x="88" y="326" font-family="Helvetica, Arial, sans-serif" font-size="66" font-weight="700" fill="${NAVY}">Green Chemistry for</text>
  <text x="88" y="404" font-family="Helvetica, Arial, sans-serif" font-size="66" font-weight="700" fill="${colors.greenBottom}">Sustainable Agriculture</text>

  <rect x="88" y="452" width="640" height="72" rx="36" fill="${colors.greenBottom}"/>
  <text x="124" y="498" font-family="Helvetica, Arial, sans-serif" font-size="28" font-weight="700" fill="#ffffff">Just one spray · up to 6 months of protection</text>

  <text x="88" y="580" font-family="Helvetica, Arial, sans-serif" font-size="24" fill="#475569">EcoAgta EZ3+ · Triple Acting Organic Farm Input</text>
</svg>`;
}

/**
 * Trimmed, display-ready crops of the client's real logo file — used directly
 * (as an <img>, not redrawn) anywhere the background is light enough for the
 * artwork's navy text to read. There are two variants because the header uses
 * the full lockup (icon + wordmark + tagline) while tighter spots such as the
 * mobile drawer use just the icon + wordmark, to match how `BrandMark`'s
 * existing `showTagline` prop already behaves.
 *
 * Not used on dark backgrounds (the site footer): the wordmark and tagline in
 * the source file are rendered in navy, which is illegible on the navy footer.
 * `BrandMark` falls back to the colour-sampled vector icon + live white text
 * there instead — see app/components/layout/brand-mark.jsx.
 */
async function extractDisplayCrops(sourcePath) {
  const meta = await sharp(sourcePath).metadata();
  const full = await sharp(sourcePath).trim({ background: '#ffffff', threshold: 10 }).toBuffer();
  await writeFile(join(brandDir, 'craftdyne-logo-full.png'), full);
  const fullMeta = await sharp(full).metadata();
  console.log(`  ✓ public/brand/craftdyne-logo-full.png (${fullMeta.width}x${fullMeta.height})`);

  // Crop above the tagline row before trimming, so the icon+wordmark variant
  // does not carry a large empty margin where the tagline used to be. Cutting
  // at 80% of the source height clears the tagline in both exports of this
  // file seen so far; if a future export has a very differently proportioned
  // tagline, this ratio may need adjusting.
  const withoutTagline = await sharp(sourcePath)
    .extract({ left: 0, top: 0, width: meta.width, height: Math.round(meta.height * 0.82) })
    .toBuffer();
  const iconWordmark = await sharp(withoutTagline).trim({ background: '#ffffff', threshold: 10 }).toBuffer();
  await writeFile(join(brandDir, 'craftdyne-logo-icon-wordmark.png'), iconWordmark);
  const iwMeta = await sharp(iconWordmark).metadata();
  console.log(`  ✓ public/brand/craftdyne-logo-icon-wordmark.png (${iwMeta.width}x${iwMeta.height})`);
}

async function main() {
  const logoPath = join(brandDir, 'craftdyne-logo.png');
  console.log(`Sampling brand colours from ${logoPath.replace(root + '/', '')}…`);
  const colors = await sampleGradientColors(logoPath);
  console.log('  green:', colors.greenTop, '→', colors.greenBottom);
  console.log('  navy: ', colors.navyTop, '→', colors.navyBottom);

  // The master vector icon — also the source `app/components/layout/brand-mark.jsx`
  // and `app/components/ui/product-bottle.jsx` should stay in sync with. Kept as
  // SVG (not PNG) because it is drawn geometry, not a photo — vector stays crisp
  // at every size and needs no separate @2x/@3x variants.
  const svg = iconSvg(colors, { size: 512 });
  await mkdir(brandDir, { recursive: true });
  await writeFile(join(brandDir, 'craftdyne-icon.svg'), svg);
  console.log('  ✓ public/brand/craftdyne-icon.svg');

  await extractDisplayCrops(logoPath);

  await render(Buffer.from(svg), join(publicDir, 'favicon-32.png'), { width: 32 });
  await render(Buffer.from(svg), join(publicDir, 'favicon-16.png'), { width: 16 });
  await render(Buffer.from(iconSvg(colors, { size: 192 })), join(publicDir, 'icons/icon-192.png'));
  await render(Buffer.from(iconSvg(colors, { size: 512 })), join(publicDir, 'icons/icon-512.png'));

  // Maskable needs ~20% safe padding on an opaque backdrop — Android's mask can
  // crop into transparent corners otherwise.
  const maskablePad = Math.round(512 * 0.2);
  const maskableInner = 512 - maskablePad * 2;
  await mkdir(join(publicDir, 'icons'), { recursive: true });
  await sharp({ create: { width: 512, height: 512, channels: 4, background: '#ffffff' } })
    .composite([
      {
        input: await sharp(Buffer.from(iconSvg(colors, { size: maskableInner })))
          .png()
          .toBuffer(),
        left: maskablePad,
        top: maskablePad,
      },
    ])
    .png({ compressionLevel: 9 })
    .toFile(join(publicDir, 'icons/icon-maskable-512.png'));
  console.log('  ✓ public/icons/icon-maskable-512.png');

  // iOS home-screen icon: opaque background, iOS composites transparent PNGs on
  // black otherwise.
  const applePad = Math.round(180 * 0.12);
  const appleInner = 180 - applePad * 2;
  await sharp({ create: { width: 180, height: 180, channels: 4, background: '#ffffff' } })
    .composite([
      {
        input: await sharp(Buffer.from(iconSvg(colors, { size: appleInner })))
          .png()
          .toBuffer(),
        left: applePad,
        top: applePad,
      },
    ])
    .png({ compressionLevel: 9 })
    .toFile(join(publicDir, 'apple-touch-icon.png'));
  console.log('  ✓ public/apple-touch-icon.png');

  await render(Buffer.from(ogSvg(colors)), join(publicDir, 'og/craftdyne-og.png'));

  console.log('Done.');
}

await main();
