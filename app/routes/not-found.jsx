import { I18nextProvider, useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import { Footer } from '../components/layout/footer.jsx';
import { Header } from '../components/layout/header.jsx';
import { Button } from '../components/ui/button.jsx';
import { Container } from '../components/ui/container.jsx';
import { DEFAULT_LOCALE, LOCALES } from '../config/site.js';
import { getI18n } from '../i18n/index.js';
import { localePath } from '../lib/links.js';

/**
 * Catch-all 404.
 *
 * This route sits outside the locale layout — an unmatched URL may have no
 * valid locale segment at all — so it brings its own i18n provider and chrome,
 * and recovers the locale from the path where one is present.
 */
export default function NotFound() {
  const { pathname } = useLocation();
  const first = pathname.split('/')[1];
  const lang = LOCALES.includes(first) ? first : DEFAULT_LOCALE;

  return (
    <I18nextProvider i18n={getI18n(lang)}>
      <NotFoundContent lang={lang} />
    </I18nextProvider>
  );
}

function NotFoundContent({ lang }) {
  const { t } = useTranslation(['pages', 'common']);

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header lang={lang} />

      <main className="flex flex-1 items-center py-16 pb-24 sm:py-24 md:pb-16">
        <Container size="narrow" className="text-center">
          <p className="font-display text-brand-500 text-6xl font-extrabold sm:text-7xl">404</p>
          <h1 className="text-fluid-3xl mt-4 text-balance">{t('notFound.title')}</h1>
          <p className="text-fluid-lg mx-auto mt-4 max-w-md text-slate-600">{t('notFound.description')}</p>

          <div className="xs:flex-row xs:flex-wrap xs:items-center mt-8 flex flex-col items-stretch justify-center gap-3">
            <Button to={localePath(lang)} size="lg">
              {t('notFound.cta')}
            </Button>
            <Button to={localePath(lang, 'products')} variant="outline" size="lg">
              {t('notFound.productsCta')}
            </Button>
          </div>
        </Container>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
