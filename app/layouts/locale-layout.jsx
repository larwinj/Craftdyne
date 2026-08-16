import { I18nextProvider, useTranslation } from 'react-i18next';
import { Outlet, useParams } from 'react-router';

import { Footer } from '../components/layout/footer.jsx';
import { Header } from '../components/layout/header.jsx';
import { MobileActionBar, WhatsAppFab } from '../components/layout/mobile-action-bar.jsx';
import { LOCALES } from '../config/site.js';
import { getI18n } from '../i18n/index.js';

export default function LocaleLayout() {
  const { lang } = useParams();

  // Anything that is not a supported locale is a genuine 404. Falling back to
  // English instead would let /prodcuts quietly render the home page and get
  // indexed as a duplicate.
  if (!LOCALES.includes(lang)) {
    throw new Response('Not Found', { status: 404 });
  }

  return (
    <I18nextProvider i18n={getI18n(lang)}>
      <Shell lang={lang} />
    </I18nextProvider>
  );
}

function Shell({ lang }) {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[100dvh] flex-col">
      {/*
        Every visual style is scoped to :focus. Applying padding unconditionally
        alongside `sr-only` overrides its `padding: 0`, which inflates the
        supposedly-hidden link into a ~40x24 invisible box sitting over the
        top-left of the page where it can swallow taps.
      */}
      <a
        href="#main"
        className="focus:bg-navy-700 focus:font-display sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:inline-flex focus:min-h-11 focus:items-center focus:rounded-full focus:px-5 focus:font-semibold focus:text-white"
      >
        {t('actions.skipToContent')}
      </a>

      <Header lang={lang} />

      {/* The bottom padding clears the fixed mobile action bar so the last
          element on every page stays reachable. */}
      <main id="main" tabIndex={-1} className="flex-1 pb-20 md:pb-0">
        <Outlet context={{ lang }} />
      </main>

      <Footer lang={lang} />

      <MobileActionBar lang={lang} />
      <WhatsAppFab />
    </div>
  );
}
