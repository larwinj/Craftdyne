/**
 * Runtime smoke test against the production build.
 *
 * Prerendered HTML can look perfect while hydration is quietly broken, so this
 * drives a real browser and fails on console errors, hydration mismatches, or
 * interactive elements that do not work.
 *
 * Usage:
 *   npm run build && npm run preview &
 *   node scripts/smoke-test.mjs [baseUrl]
 */
import { chromium } from 'playwright';

const BASE = process.argv[2] ?? 'http://localhost:4173';

const browser = await chromium.launch();
const failures = [];

function check(name, ok, detail = '') {
  console.log(`${ok ? '✓' : '✗'} ${name}${detail ? ` — ${detail}` : ''}`);
  if (!ok) failures.push(name);
}

async function newPage() {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const page = await context.newPage();
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(err.message));
  return { context, page, errors };
}

// ---------------------------------------------------------------------------
// 1. Every locale hydrates cleanly
// ---------------------------------------------------------------------------
for (const lang of ['en', 'ta', 'hi']) {
  const { context, page, errors } = await newPage();
  await page.goto(`${BASE}/${lang}`, { waitUntil: 'load' });
  // Wait for hydration: the mobile menu button only responds once React is live.
  await page.waitForTimeout(1200);

  const htmlLang = await page.getAttribute('html', 'lang');
  check(`${lang}: <html lang> is "${lang}"`, htmlLang === lang, htmlLang ?? 'missing');
  check(`${lang}: no console errors`, errors.length === 0, errors.slice(0, 2).join(' | '));
  await context.close();
}

// ---------------------------------------------------------------------------
// 2. Mobile drawer opens, traps focus and closes on Escape
// ---------------------------------------------------------------------------
{
  const { context, page, errors } = await newPage();
  await page.goto(`${BASE}/en`, { waitUntil: 'load' });
  await page.waitForTimeout(1200);

  await page.getByRole('button', { name: /open menu/i }).click();
  const dialog = page.getByRole('dialog');
  check('drawer opens', await dialog.isVisible());

  const focusInside = await page.evaluate(() => !!document.activeElement?.closest('[role="dialog"]'));
  check('drawer receives focus', focusInside);

  await page.keyboard.press('Escape');
  await page.waitForTimeout(600);
  // Asserted on real state rather than `isVisible()`: the panel closes by
  // translating off-screen, and Playwright still counts a translated element as
  // visible. What actually matters is that it is off-screen, inert and no
  // longer holding focus.
  const closed = await page.evaluate(() => {
    const panel = document.querySelector('[role="dialog"]');
    const wrapper = panel?.parentElement;
    return {
      offScreen: panel.getBoundingClientRect().left >= window.innerWidth,
      inert: wrapper.hasAttribute('inert'),
      focusReleased: !document.activeElement?.closest('[role="dialog"]'),
    };
  });
  check('drawer closes on Escape', closed.offScreen && closed.inert && closed.focusReleased, JSON.stringify(closed));
  check('drawer: no console errors', errors.length === 0, errors.slice(0, 2).join(' | '));
  await context.close();
}

// ---------------------------------------------------------------------------
// 3. Language switch lands on the same page in the new locale
// ---------------------------------------------------------------------------
{
  const { context, page } = await newPage();
  await page.goto(`${BASE}/en/products/ecoagta-ez3-plus`, { waitUntil: 'load' });
  await page.waitForTimeout(1200);

  await page
    .getByRole('button', { name: /change language/i })
    .first()
    .click();
  await page.getByRole('option', { name: /தமிழ/ }).click();
  await page.waitForURL('**/ta/products/ecoagta-ez3-plus', { timeout: 10000 });
  await page.waitForTimeout(800);

  check('language switch preserves the page', page.url().endsWith('/ta/products/ecoagta-ez3-plus'));
  // Checked against the body, not the <h1>: the product name "EcoAgta EZ3+" is
  // deliberately left untranslated in every locale.
  check('switched page renders Tamil', /[஀-௿]{4,}/.test(await page.locator('main').innerText()));
  check('switched page <html lang> updates', (await page.getAttribute('html', 'lang')) === 'ta');
  await context.close();
}

// ---------------------------------------------------------------------------
// 4. Contact form validates before submitting
// ---------------------------------------------------------------------------
{
  const { context, page } = await newPage();
  await page.goto(`${BASE}/en/contact`, { waitUntil: 'load' });
  await page.waitForTimeout(1200);

  await page.getByRole('button', { name: /send enquiry/i }).click();
  await page.waitForTimeout(500);
  const alerts = await page.getByRole('alert').count();
  check('empty form shows validation errors', alerts > 0, `${alerts} messages`);
  await context.close();
}

// ---------------------------------------------------------------------------
// 5. FAQ accordion works without JavaScript (native <details>)
// ---------------------------------------------------------------------------
{
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(`${BASE}/en/products/ecoagta-ez3-plus`, { waitUntil: 'load' });

  const heading = await page.locator('h1').first().innerText();
  check('page renders with JS disabled', heading.includes('EZ3+'), heading);

  const summary = page.locator('summary').first();
  await summary.click();
  await page.waitForTimeout(200);
  const open = await page
    .locator('details')
    .first()
    .evaluate((el) => el.open);
  check('FAQ accordion works without JS', open);
  await context.close();
}

// ---------------------------------------------------------------------------
// 6. Unknown URLs 404 rather than silently rendering something
// ---------------------------------------------------------------------------
{
  const { context, page } = await newPage();
  await page.goto(`${BASE}/en/does-not-exist`, { waitUntil: 'load' });
  await page.waitForTimeout(1000);
  const body = await page.locator('body').innerText();
  check('unknown path shows 404', body.includes('404') || /could not find/i.test(body));
  await context.close();
}

await browser.close();

console.log(
  `\n${failures.length === 0 ? 'All smoke tests passed.' : `${failures.length} failed: ${failures.join(', ')}`}`,
);
process.exit(failures.length === 0 ? 0 : 1);
