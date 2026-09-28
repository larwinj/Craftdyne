# CraftDyne — corporate website

Multilingual marketing site for **CraftDyne Private Limited** (Dindigul, Tamil Nadu),
covering the company, its Green Chemistry approach and the **EcoAgta EZ3+** farm input.

Built mobile-first: most visitors arrive on a mid-range Android from a WhatsApp or
LinkedIn link, so the phone layout is the primary design and desktop is the adaptation.

---

## Quick start

```bash
npm install
cp .env.example .env      # then add your Web3Forms key — see CONTENT-TODO.md
npm run dev               # http://localhost:5173
```

| Script | What it does |
| ------ | ------------ |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Static build → `build/client`, then generates sitemap + robots and verifies prerendering |
| `npm run preview` | Serve the production build locally on :4173 |
| `npm run lint` | ESLint |
| `npm run format` | Prettier (includes Tailwind class sorting) |
| `npm run assets` | Regenerate favicons, PWA icons and the social share image from source SVG |
| `npm run audit:responsive` | Headless check for horizontal overflow and undersized touch targets across the full device matrix |
| `npm run audit:contrast` | Headless WCAG AA contrast check across every page and locale |
| `npm run test:smoke` | Headless runtime checks: hydration, drawer focus trap, language switching, form validation, no-JS fallback, 404 |

The three headless scripts expect `npm run preview` to be running.

---

## Stack

| Concern | Choice |
| ------- | ------ |
| Framework | React 19 + React Router v8 (framework mode) |
| Build | Vite 8 |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens — there is no `tailwind.config.js`) |
| i18n | i18next + react-i18next, locale-prefixed URLs |
| Forms | react-hook-form + zod, delivered by Web3Forms |
| Icons | lucide-react (social marks are inlined — lucide v1 dropped brand icons) |
| Fonts | Self-hosted via fontsource, per-script `unicode-range` |
| Testing | Playwright — responsive, contrast and smoke audits |

### Why React Router framework mode

Every route is **prerendered to static HTML at build time** (`ssr: false` + `prerender`
in `react-router.config.js`). This matters because WhatsApp and LinkedIn do not execute
JavaScript when generating link previews — a plain SPA would share as a blank card.
It also means the site works before hydration on a slow connection.

The build emits **31 HTML pages** (10 routes × 3 locales, plus the root gateway).
`npm run build` fails loudly if prerendering ever silently degrades to an empty shell —
that failure mode is easy to miss, because the build still "succeeds" and every file is
still written.

### How translations are loaded — and why it looks the way it does

A visitor downloads **one** language, not three. The full corpus is ~38KB gzipped;
one locale is ~11–14KB. Three details make that work, and each is load-bearing:

1. **`app/i18n/index.js` loads locales through a non-eager `import.meta.glob`**, so Vite
   emits one chunk per locale file.
2. **`app/i18n/resources.server.js` eagerly loads all locales and is imported only from
   `app/entry.server.jsx`.** Prerendering renders all 31 URLs in one Node process and
   must be synchronous, so the server needs everything up front. Keeping it in a
   server-entry-only module is what keeps it out of the browser bundle.
   *Do not move that eager glob into the shared i18n module, even behind an
   `import.meta.env.SSR` guard* — Vite hoists a glob's imports to the top of the module
   and the bundler keeps them, which silently ships all three languages to every visitor.
3. **`app/entry.client.jsx` awaits the URL's locale before hydrating.** The visitor is
   looking at prerendered HTML throughout, so this costs no perceived load time.

Consequently **changing language performs a full page load**, not a client-side
navigation — the browser only holds one locale. This is also the more correct behaviour:
it guarantees `<html lang>`, the font stack and the meta tags all match the new language.

Initial route: **~145KB gzipped**, of which ~84KB is the React + React Router floor.

---

## Project structure

```
app/
├── root.jsx                 document shell, <html lang> per locale
├── routes.js                route table
├── routes/                  one file per page
├── layouts/locale-layout.jsx  header/footer/i18n provider, validates :lang
├── components/
│   ├── layout/              header, drawer, language switcher, footer, mobile action bar
│   ├── sections/            page sections (hero, pillars, contact form, …)
│   └── ui/                  primitives (Button, Container, Section, Accordion, …)
├── config/                  site.js, contact.js, nav.js — language-neutral constants
├── data/                    products, crops, pillars — structure only, never prose
├── i18n/locales/{en,ta,hi}/ all user-visible text
├── lib/                     seo.js, links.js, cn.js
└── app.css                  design tokens + base styles
```

**The rule that keeps three locales maintainable:** structure lives in `app/data/` and
`app/config/` (slugs, icons, ordering — never translated); every user-visible string
lives in `app/i18n/locales/`. There is no hardcoded English in JSX.

---

## Editing content

### Changing text

Find the key in `app/i18n/locales/en/` and change it, then make the matching change in
`ta/` and `hi/`. Namespaces: `common`, `home`, `products`, `pages`, `contact`.

A missing key in `ta` or `hi` falls back to English rather than showing a raw key, so a
partially translated locale still reads as a finished page.

### Adding a page

1. Add the path to `ROUTE_PATHS` in `app/config/site.js` — this wires it into the route
   table, the prerender list **and** the sitemap in one step.
2. Add a route entry in `app/routes.js`.
3. Create `app/routes/your-page.jsx`, exporting a `meta` function built with `buildMeta()`.
4. Add copy under each locale, and a nav entry in `app/config/nav.js` if it belongs in the menu.

### Adding a language

1. Add the code to `LOCALES` and `LOCALE_LABELS` in `app/config/site.js`.
2. Create `app/i18n/locales/<code>/` with the five namespace files.
3. If the language uses a non-Latin script, add its font in `app/app.css` with the
   correct `unicode-range` — see the existing Tamil and Devanagari `@font-face` blocks.

### Changing contact details

`app/config/contact.js` is the single source. Phone, WhatsApp and email links across the
whole site derive from it via `app/lib/links.js`.

---

## Design system

Tokens live in `app/app.css` under `@theme`. Colours are sampled from the CraftDyne and
EcoAgta logos so the site and the printed brochure read as one brand.

- `brand-*` — CraftDyne green (primary actions)
- `navy-*` — CraftDyne blue (headings)
- `eco-green` / `eco-blue` — EcoAgta wordmark
- `leaf`, `mist`, `sand` — section washes

Type is a fluid `clamp()` scale (`text-fluid-sm` → `text-fluid-4xl`) so sizes glide
between breakpoints instead of snapping.

### Mobile conventions

These are load-bearing — changing them will break the mobile experience:

- **Every interactive element is ≥44×44px** (`min-h-11`). The `audit:responsive` script
  enforces this.
- **`xs` breakpoint = 380px**, added for narrow Androids. Tailwind's own scale starts at
  640px, which is far too late for this audience.
- **Fixed elements use `pb-safe`** so they clear the iPhone home indicator.
- **Full-height sections use `dvh`, not `vh`**, so layout does not jump as mobile browser
  chrome hides and reveals.
- **Form inputs are ≥16px** — below that, iOS Safari zooms the page on focus.
- **Hover styles must be safe on touch.** Anything revealed on hover must also be visible
  without it.
- **Overlays inside the header must be portalled to `document.body`.** The header
  carries `backdrop-filter: blur()`, and a non-`none` backdrop-filter makes an element a
  containing block for its `position: fixed` descendants. A fixed overlay rendered inside
  the header anchors to the header's 72px box instead of the viewport. The language
  switcher does this correctly — copy that pattern for any new header popover.
- **Header nav labels use `whitespace-nowrap`.** Tamil and Hindi nav labels are far
  longer than English and wrapped to two and three stacked lines without it. The nav type
  is sized down accordingly, and `audit:responsive` fails the build if any nav label wraps.
- The **bottom action bar** (phones) and the **WhatsApp FAB** (tablet/desktop) are
  mutually exclusive by design; they would otherwise fight for the same corner.

---

## Deployment

The build is fully static — `build/client` can be served by anything. Config for both
Netlify (`netlify.toml`) and Vercel (`vercel.json`) is included, covering SPA fallback,
security headers, a Content-Security-Policy that allows only the Web3Forms endpoint, and
immutable caching for fingerprinted assets.

| Setting | Value |
| ------- | ----- |
| Build command | `npm run build` |
| Publish directory | `build/client` |
| Node version | 22 |
| Environment variables | `VITE_WEB3FORMS_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` |

`/` 302-redirects to `/en` at the host. A client-side language gateway is also
prerendered as a fallback for hosts without redirect rules.

### Website visitor counter

The footer badge shows the number of unique visitors, served by `/api/visitors` on the
site's own origin (so the CSP stays `'self'`). The logic lives in `server/visitors.js`;
`netlify/functions/visitors.mjs` and `api/visitors.js` are thin adapters for each host,
and `vite dev`/`vite preview` serve the same handler (in-memory unless Upstash is set).

- Each browser gets a random anonymous ID; the count is the number of distinct IDs in a
  Redis set, recorded by one atomic script — concurrent visitors can't lose updates, and
  reloads, tabs or retries can't inflate it.
- Crawlers and automated browsers (including the audits below) read but aren't counted.
- An IP can add at most 60 new visitors per hour, blunting scripted inflation.
- If the counter is unreachable or unconfigured, the badge is hidden — it never shows an
  invented number.

Setup: create a free Redis database at [Upstash](https://console.upstash.com) and set
`UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in the Netlify/Vercel dashboard
(on Vercel, the Upstash marketplace integration's `KV_REST_API_*` variables also work).

### Pointing craftdyne.net at it

The domain currently runs a GoDaddy "Launching Soon" page. Once the site is deployed,
update the DNS records at GoDaddy to the host's targets — the deploy platform will show
the exact values. Keep the GoDaddy site up until DNS has propagated.

---

## Verification

```bash
npm run build            # includes a prerender-content assertion
npm run preview &        # required by the three headless checks below
npm run audit:responsive # 30 pages × 10 viewports, all three locales
npm run audit:contrast   # WCAG AA across all 30 pages
npm run test:smoke       # hydration, drawer, language switch, form, no-JS, 404
```

All three currently pass clean: **0 overflow failures, 0 touch-target failures across
300 page/viewport checks; 0 WCAG AA contrast failures; all smoke tests passing.**

These catch defect classes that reading the code does not:

- **Responsive** — any element wider than the viewport, and any tap target under 44px.
  Run in all three languages, because Tamil and Devanagari strings are longer and taller
  than their English equivalents; that combination at 320px is where layouts break first.
  It found three real bugs that only appeared in Tamil.
- **Contrast** — resolves colours through a canvas rather than parsing computed styles,
  because Tailwind v4 emits `oklab()`/`oklch()` and a naive parse gives nonsense ratios.
  Gradient backgrounds are evaluated against every colour stop. It caught a heading
  rendering navy-on-navy (invisible) and a CTA rendering white-on-white.
- **Smoke** — prerendered HTML can look perfect while hydration is silently broken, so
  this drives a real browser and fails on console errors.

Still worth doing by hand before launch:

- Submit the contact form and confirm it arrives at customercare@craftdyne.net
- Tap the WhatsApp, call and email links on a **real** iPhone and Android
- Add to Home Screen on both platforms and confirm it launches standalone
- Lighthouse mobile, throttled
- Validate the share preview with the LinkedIn Post Inspector and by sending the link in WhatsApp

---

## Outstanding

See **[CONTENT-TODO.md](./CONTENT-TODO.md)** for everything still needed from the client —
Web3Forms key, logo files, product photography, social URLs, registered address, and
native review of the Tamil and Hindi copy.
