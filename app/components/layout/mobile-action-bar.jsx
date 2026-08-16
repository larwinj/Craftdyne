import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { MessageCircle, Phone, Send } from 'lucide-react';

import { localePath, telHref, whatsappHref } from '../../lib/links.js';

/**
 * Thumb-reachable action bar, phones only.
 *
 * This is the single biggest "feels like an app" affordance on the site: the
 * three things a visitor actually wants to do are always one tap away, at the
 * bottom of the screen where the thumb already is, instead of requiring a
 * scroll back up to the header.
 *
 * It sits above `env(safe-area-inset-bottom)` so it clears the iPhone home
 * indicator, and the WhatsApp FAB is deliberately NOT rendered on phones — the
 * two would stack and fight for the same corner.
 */
export function MobileActionBar({ lang }) {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur md:hidden print:hidden">
      <div className="pb-safe grid grid-cols-3 gap-1 px-2 pt-1.5">
        <Link
          to={localePath(lang, 'contact')}
          className="text-navy-700 flex min-h-14 min-w-0 flex-col items-center justify-center gap-0.5 rounded-lg px-1 transition-colors active:bg-slate-100"
        >
          <Send className="size-5" aria-hidden="true" />
          <span className="font-display w-full truncate text-center text-xs font-semibold">
            {t('actions.enquireShort')}
          </span>
        </Link>

        <a
          href={whatsappHref(t('whatsappMessage'))}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-14 min-w-0 flex-col items-center justify-center gap-0.5 rounded-lg px-1 text-[#128C4A] transition-colors active:bg-slate-100"
        >
          <MessageCircle className="size-5" aria-hidden="true" />
          <span className="font-display w-full truncate text-center text-xs font-semibold">
            {t('actions.whatsapp')}
          </span>
        </a>

        <a
          href={telHref}
          className="text-navy-700 flex min-h-14 min-w-0 flex-col items-center justify-center gap-0.5 rounded-lg px-1 transition-colors active:bg-slate-100"
        >
          <Phone className="size-5" aria-hidden="true" />
          <span className="font-display w-full truncate text-center text-xs font-semibold">{t('actions.call')}</span>
        </a>
      </div>
    </div>
  );
}

/**
 * Floating WhatsApp button for tablet and desktop, where there is no action bar.
 */
export function WhatsAppFab() {
  const { t } = useTranslation();

  return (
    <a
      href={whatsappHref(t('whatsappMessage'))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('actions.chatOnWhatsapp')}
      className="shadow-lift ease-out-soft fixed right-5 bottom-5 z-30 hidden size-14 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform duration-200 hover:scale-105 md:flex print:hidden"
    >
      <MessageCircle className="size-7" aria-hidden="true" />
    </a>
  );
}
