import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const PORT = 4175;
const BASE = `http://localhost:${PORT}`;
const BUILD_DIR = path.resolve('build/client');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  let cleanUrl = req.url.split('?')[0];
  let filePath = path.join(BUILD_DIR, cleanUrl);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath)) {
    filePath = path.join(BUILD_DIR, '404.html');
  }

  if (fs.existsSync(filePath)) {
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

await new Promise((resolve) => server.listen(PORT, resolve));

try {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
  });
  const failures = [];

  function check(name, ok, detail = '') {
    console.log(`${ok ? '✓' : '✗'} ${name}${detail ? ` — ${detail}` : ''}`);
    if (!ok) failures.push(name);
  }

  // Test Desktop Products Page
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.goto(`${BASE}/en/products`, { waitUntil: 'load' });
    await page.waitForTimeout(500);

    const heading = await page.getByRole('heading', { name: /Green chemistry inputs, built for real fields/i }).first();
    check('Products page heading is visible', await heading.isVisible());

    // Check Products1 image in the hero section
    const products1Img = page.locator('img[src="/images/products/products1.jpg"]');
    check('Products1 image exists', (await products1Img.count()) > 0);
    check('Products1 image is visible on desktop', await products1Img.first().isVisible());

    // Verify two-column layout on desktop: heading and image have different horizontal positions
    const headingBox = await heading.boundingBox();
    const imgBox = await products1Img.first().boundingBox();
    check('Desktop 2-column layout: image is beside text', imgBox.x > headingBox.x + 100);

    // Check Myco Siga and Myco Delta images on product cards
    const deltaCardImg = page.locator('img[src="/images/products/myco-delta.jpg"]');
    const sigaCardImg = page.locator('img[src="/images/products/myco-siga.jpg"]');
    check('Myco Delta image exists on product listing', (await deltaCardImg.count()) > 0);
    check('Myco Siga image exists on product listing', (await sigaCardImg.count()) > 0);
    check('Myco Delta image is visible', await deltaCardImg.first().isVisible());
    check('Myco Siga image is visible', await sigaCardImg.first().isVisible());

    const productsBody = await page.locator('main').innerText();
    check('Myco Delta has specific kicker', productsBody.includes('Targeted Banana Fusarium Wilt Treatment'));
    check('Myco Siga has specific kicker', productsBody.includes('Targeted Banana Yellow Sigatoka Defense'));

    await page.close();
  }

  // Test Mobile Products Page
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
    await page.goto(`${BASE}/en/products`, { waitUntil: 'load' });
    await page.waitForTimeout(500);

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    check('Mobile: no horizontal overflow', scrollWidth <= clientWidth);

    const products1Img = page.locator('img[src="/images/products/products1.jpg"]').first();
    check('Mobile: Products1 image is visible', await products1Img.isVisible());

    await page.close();
  }

  // Test Reviews Page (English)
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.goto(`${BASE}/en/reviews`, { waitUntil: 'load' });
    await page.waitForTimeout(500);

    const bodyText = await page.locator('main').innerText();
    check('EN reviews contains Mr. T. Selvam', bodyText.includes('Mr. T. Selvam'));
    check('EN reviews contains Mr. Ramesh', bodyText.includes('Mr. Ramesh'));
    check('EN reviews contains Mr. Varadarajan', bodyText.includes('Mr. Varadarajan'));
    check('EN reviews contains Mr. T. Naidu', bodyText.includes('Mr. T. Naidu'));
    check('EN reviews contains Mr. T. R. Thyaharajan', bodyText.includes('Mr. T. R. Thyaharajan'));
    check('EN reviews contains Farm Manager', bodyText.includes('Farm Manager'));

    check('EN reviews contains EcoAgta EZ3+ tagline', bodyText.includes('🌿 EcoAgta EZ3+'));
    check('EN reviews contains Guava', bodyText.includes('Guava'));

    await page.close();
  }

  // Test Reviews Page (Tamil)
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.goto(`${BASE}/ta/reviews`, { waitUntil: 'load' });
    await page.waitForTimeout(500);

    const bodyText = await page.locator('main').innerText();
    check('TA reviews contains திரு. T. செல்வம்', bodyText.includes('T. செல்வம்'));
    check('TA reviews contains திரு. ரமேஷ்', bodyText.includes('ரமேஷ்'));
    check('TA reviews contains திரு. வரதராசன்', bodyText.includes('வரதராசன்'));
    check('TA reviews contains கொய்யா', bodyText.includes('கொய்யா'));
    check('TA reviews contains சாந்தம்பாடி, நத்தம்', bodyText.includes('சாந்தம்பாடி, நத்தம்'));
    check('TA reviews contains மம்சாபுரம், சிவகாசி', bodyText.includes('மம்சாபுரம், சிவகாசி'));
    check('TA reviews contains செல்லக்குட்டியூர்', bodyText.includes('செல்லக்குட்டியூர்'));

    await page.close();
  }

  // Test Reviews Page (Hindi)
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.goto(`${BASE}/hi/reviews`, { waitUntil: 'load' });
    await page.waitForTimeout(500);

    const bodyText = await page.locator('main').innerText();
    check('HI reviews contains श्री टी. सेल्वम', bodyText.includes('टी. सेल्वम'));
    check('HI reviews contains श्री रमेश', bodyText.includes('रमेश'));
    check('HI reviews contains श्री वरदराजन', bodyText.includes('वरदराजन'));
    check('HI reviews contains अमरूद', bodyText.includes('अमरूद'));
    check('HI reviews contains संथांबड़ी, नत्थम', bodyText.includes('संथांबड़ी, नत्थम'));
    check('HI reviews contains ममसापुरम, शिवकाशी', bodyText.includes('ममसापुरम, शिवकाशी'));

    await page.close();
  }

  // Test Product Detail Pages
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.goto(`${BASE}/en/products/ecoagta-myco-delta`, { waitUntil: 'load' });
    const deltaImg = page.locator('img[src="/images/products/myco-delta.jpg"]');
    check('Myco Delta page has packaging image', (await deltaImg.count()) > 0);

    await page.goto(`${BASE}/en/products/ecoagta-myco-siga`, { waitUntil: 'load' });
    const sigaImg = page.locator('img[src="/images/products/myco-siga.jpg"]');
    check('Myco Siga page has packaging image', (await sigaImg.count()) > 0);

    await page.close();
  }

  await browser.close();

  if (failures.length === 0) {
    console.log('\n🎉 ALL VALIDATION CRITERIA PASSED!');
  } else {
    console.error(`\n❌ Failures: ${failures.join(', ')}`);
    process.exit(1);
  }
} finally {
  server.close();
}

