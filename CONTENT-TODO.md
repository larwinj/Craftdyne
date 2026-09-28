# Content & assets still needed from CraftDyne

Everything below is scaffolded with a working placeholder, so the site builds, deploys
and looks finished today. These are the items that should be resolved before the
public launch.

Each entry names the file to change, so nothing requires hunting through the codebase.

---

## 1. Blocking for launch

### Web3Forms access key — the contact form does not deliver without it

The enquiry form posts to [Web3Forms](https://web3forms.com) (free, no server needed).
Until a key is set, the form shows a clear message telling visitors to use WhatsApp,
phone or email instead — it never fails silently.

1. Sign up at web3forms.com using **customercare@craftdyne.net**.
2. Copy the access key.
3. `cp .env.example .env` and set `VITE_WEB3FORMS_KEY=your-key-here`.
4. Add the same variable in the Netlify/Vercel dashboard under environment variables.

### Visitor counter database — the footer badge stays hidden without it

1. Create a free Redis database at [console.upstash.com](https://console.upstash.com).
2. From its **REST API** section copy the URL and token.
3. Add `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in the Netlify/Vercel
   dashboard under environment variables (and optionally in `.env` for local testing).

### Registered address, CIN and GST

Currently the footer and legal pages show only "Dindigul, Tamil Nadu, India".

- **File:** `app/config/contact.js` → `CONTACT.addressLines`
- Indian company websites are normally expected to display the registered office and CIN.

### Product claim sign-off

The site deliberately uses the hedged wording from **page 2 of the brochure**
("Helps control and deter whiteflies", "Helps prevent sooty mold fungus") rather than
the absolute forms that appear on the label and on LinkedIn ("fully control",
"ZERO harm"). No efficacy figures, trial data or certifications have been invented.

Please have someone at CraftDyne confirm the wording is what they want to publish.
If there is documented trial data or a certification you want shown, send the
documents and it can be added.

- **Files:** `app/i18n/locales/*/products.json`, `app/i18n/locales/*/home.json`

### Native review of Tamil and Hindi copy

All three locales are fully translated, but the Tamil and Hindi were not written by
native speakers. Agricultural terminology in particular should be checked by someone
who works with farmers in each language — a term that is technically correct can still
be the wrong word in the field.

- **Files:** `app/i18n/locales/ta/*.json`, `app/i18n/locales/hi/*.json`
- Product names (`EcoAgta`, `EZ3+`) are intentionally left untranslated everywhere.

While reviewing, please also watch for **very long single words in headings**. The
Tamil home-page headline contains `விவசாயத்திற்கான`, which is wider than a 320–360px
screen at heading size, so the browser has to break it mid-word. The layout handles
this correctly rather than overflowing, but a shorter word would read better. This is
a copy fix, not a code fix — the same applies to any Hindi heading of similar length.

---

## 2. Brand assets

### Official logo files

The CraftDyne roundel and the EcoAgta ginkgo leaf are currently redrawn as inline SVG.
They match the brand closely and scale perfectly, but they are approximations.

- Send the **original SVG or high-resolution transparent PNG** for both marks.
- **Files:** `app/components/layout/brand-mark.jsx` (CraftDyne),
  `app/components/ui/product-bottle.jsx` → `EcoAgtaLeaf` (EcoAgta)
- After replacing, run `npm run assets` to regenerate favicons, PWA icons and the
  social share image from the new artwork.

### Product photography

The supplied EZ3+ bottle photograph is shot against a hard black vignette that cannot
sit on a white page. The site currently renders a clean vector representation of the
pack instead.

- Send a **re-shot or background-removed** bottle image (white or transparent background).
- **File:** `app/components/ui/product-bottle.jsx`, and set `image` in `app/data/products.js`.

### Crop photography

The four crop tiles use tinted placeholder panels. Suggested shot list:

| Crop group | Suggested subject |
| ---------- | ----------------- |
| Vegetable  | Tomato or chilli field, close enough to read leaf health |
| Fruit      | Mango or guava on the tree |
| Plantation | Coconut palm canopy, ideally showing whitefly context |
| Field      | Cotton or groundnut at mid-season |

Images must be **licensed for commercial use**. Landscape, minimum 1200px wide.

- **Files:** `app/data/crops.js` (`image` field), used by `app/components/sections/crop-applications.jsx`
  and `app/routes/applications.jsx`.

---

## 3. Smaller items

### Instagram and Facebook URLs

The brochure shows both icons but not the handles. Both links are **hidden entirely**
until a URL is supplied, so nothing is broken in the meantime.

- **File:** `app/config/contact.js` → `SOCIAL`

### Product label typos

The printed label contains several spelling errors. The website uses corrected
spellings throughout. Worth fixing on the next print run:

| On the label | Should be |
| ------------ | --------- |
| `ZEXO harm 16 Air. Water and Soil.` | `ZERO harm to Air, Water and Soil.` |
| `Non Esxic` | `Non-toxic` |
| `Non-polsonous` | `Non-poisonous` |
| `Readily Blodegradable` | `Readily Biodegradable` |
| `Proaetive: Nalbrally` | `Proactive, Naturally` |
| `Dindugal, Tamiinadu` | `Dindigul, Tamil Nadu` |
| `Immunity and Vield` | `Immunity and Yield` |
| `Systemic Profection` | `Systemic Protection` |
| `CraftDyne Com` | `www.craftdyne.net` |

### Legal review

The privacy policy and terms are written to be accurate to how the site actually
behaves (no tracking cookies, one third-party form processor, enquiry data used only
to reply). They have **not** been reviewed by a lawyer.

- **Files:** `app/i18n/locales/*/pages.json` → `legal.*`
- Update the date in `app/config/site.js` → `LEGAL_LAST_UPDATED` whenever either changes.

### Business hours

The contact page says "Call our team during business hours" without stating them.

- **File:** `app/i18n/locales/*/contact.json` → `channels.phone.description`
