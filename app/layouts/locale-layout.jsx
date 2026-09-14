import { useEffect, useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { Outlet, useParams } from 'react-router';

import { Footer } from '../components/layout/footer.jsx';
import { Header } from '../components/layout/header.jsx';
import { MobileActionBar, WhatsAppFab } from '../components/layout/mobile-action-bar.jsx';
import { LOCALES } from '../config/site.js';
import { getI18n, loadLocale } from '../i18n/index.js';

export default function LocaleLayout() {
  const { lang } = useParams();
  const [, setTick] = useState(0);

  if (!LOCALES.includes(lang)) {
    throw new Response('Not Found', { status: 404 });
  }

  useEffect(() => {
    let active = true;
    loadLocale(lang).then(() => {
      if (active) setTick((n) => n + 1);
    });
    return () => {
      active = false;
    };
  }, [lang]);

  const i18nInstance = getI18n(lang);

  return (
    <I18nextProvider i18n={i18nInstance} key={lang}>
      <Shell lang={lang} />
    </I18nextProvider>
  );
}

function Shell({ lang }) {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <a
        href="#main"
        className="focus:bg-navy-700 focus:font-display sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:inline-flex focus:min-h-11 focus:items-center focus:rounded-full focus:px-5 focus:font-semibold focus:text-white"
      >
        {t('actions.skipToContent')}
      </a>

      <Header lang={lang} />

      <main id="main" tabIndex={-1} className="flex-1 pb-20 md:pb-0">
        <Outlet context={{ lang }} />
      </main>

      <Footer lang={lang} />

      <MobileActionBar lang={lang} />
      <WhatsAppFab />
    </div>
  );
}
