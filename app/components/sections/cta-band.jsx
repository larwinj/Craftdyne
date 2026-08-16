import { useTranslation } from 'react-i18next';
import { MessageCircle, Send } from 'lucide-react';

import { localePath, whatsappHref } from '../../lib/links.js';
import { Button } from '../ui/button.jsx';
import { Container } from '../ui/container.jsx';

export function CtaBand({ lang, title, description, primary, secondary }) {
  const { t } = useTranslation(['home', 'common']);

  return (
    <section className="from-brand-700 to-brand-900 bg-gradient-to-br py-14 text-white sm:py-18">
      <Container size="narrow" className="text-center">
        <h2 className="text-fluid-3xl text-balance text-white">{title ?? t('cta.title')}</h2>
        <p className="text-fluid-lg mx-auto mt-4 max-w-xl text-pretty text-white/90">
          {description ?? t('cta.description')}
        </p>

        <div className="xs:flex-row xs:flex-wrap xs:items-center mt-8 flex flex-col items-stretch justify-center gap-3">
          <Button to={localePath(lang, 'contact')} variant="white" size="lg">
            <Send className="size-5" aria-hidden="true" />
            {primary ?? t('cta.primary')}
          </Button>
          <Button
            href={whatsappHref(t('common:whatsappMessage'))}
            size="lg"
            className="border-2 border-white/40 bg-transparent hover:bg-white/10"
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            {secondary ?? t('cta.secondary')}
          </Button>
        </div>
      </Container>
    </section>
  );
}
