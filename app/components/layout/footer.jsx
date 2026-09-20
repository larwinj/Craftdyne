import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';

import { COMPANY, CONTACT, SOCIAL } from '../../config/contact.js';
import { FOOTER_LEGAL_NAV, MAIN_NAV } from '../../config/nav.js';
import { Container } from '../ui/container.jsx';
import { FacebookIcon, InstagramIcon, LinkedInIcon, XIcon } from '../ui/social-icons.jsx';
import { localePath, mailtoHref, telHref, whatsappHref } from '../../lib/links.js';
import { BrandMark } from './brand-mark.jsx';
import { VisitorCounter } from '../ui/visitor-counter.jsx';

const SOCIAL_ICONS = { linkedin: LinkedInIcon, instagram: InstagramIcon, facebook: FacebookIcon, x: XIcon };

export function Footer({ lang }) {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  // Hide any social link whose URL the client has not supplied yet, rather than
  // shipping a dead icon.
  const socials = SOCIAL.filter((s) => s.href);

  return (
    <footer className="bg-navy-800 text-white">
      <Container size="wide" className="py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="inline-block rounded-2xl bg-white/95 p-3.5 shadow-lg ring-1 ring-slate-200/60 backdrop-blur-sm">
              <BrandMark lang={lang} tone="dark" />
            </div>
            <p className="text-fluid-sm mt-5 max-w-md text-white/70">{t('footer.about')}</p>

            {socials.length > 0 ? (
              <div className="mt-6">
                <p className="font-display text-sm font-bold text-white/90">{t('footer.followUs')}</p>
                <ul className="mt-3 flex items-center gap-2">
                  {socials.map((social) => {
                    const Icon = SOCIAL_ICONS[social.key];
                    if (!Icon) return null;
                    return (
                      <li key={social.key}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-emerald-600"
                        >
                          <Icon className="size-5" aria-hidden="true" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}

            <div className="mt-6">
              <VisitorCounter />
            </div>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="font-display text-sm font-bold tracking-[0.12em] text-white uppercase">
              {t('footer.explore')}
            </h2>
            <ul className="mt-4 flex flex-col gap-1">
              <li>
                <FooterLink to={localePath(lang)}>{t('nav.home')}</FooterLink>
              </li>
              {MAIN_NAV.map((item) => (
                <li key={item.key}>
                  <FooterLink to={localePath(lang, item.path)}>{t(item.labelKey)}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="font-display text-sm font-bold tracking-[0.12em] text-white uppercase">
              {t('footer.getInTouch')}
            </h2>
            <ul className="mt-4 flex flex-col gap-1">
              <li>
                <FooterContact href={mailtoHref} icon={Mail}>
                  {CONTACT.email}
                </FooterContact>
              </li>
              <li>
                <FooterContact href={telHref} icon={Phone}>
                  {CONTACT.phoneDisplay}
                </FooterContact>
              </li>
              <li>
                <FooterContact href={whatsappHref(t('whatsappMessage'))} icon={MessageCircle} external>
                  {t('actions.whatsapp')}
                </FooterContact>
              </li>
              <li className="text-fluid-sm flex items-start gap-3 px-3 py-2.5 text-white/70">
                <MapPin className="text-brand-300 mt-0.5 size-5 shrink-0" aria-hidden="true" />
                <div className="not-italic">
                  <address className="not-italic">
                    {CONTACT.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  {CONTACT.mapsUrl && (
                    <a
                      href={CONTACT.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-300 hover:text-brand-200 mt-2 inline-flex items-center gap-1 text-xs font-semibold underline underline-offset-2 transition-colors"
                    >
                      View on Google Maps →
                    </a>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-xs text-white/70">{t('disclaimer.short')}</p>
          <div className="mt-5 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-fluid-sm text-white/75">
                © {year} {COMPANY.legalName}. {t('footer.rights')}
              </p>
              <p className="text-xs text-white/60">
                Website Developed by{' '}
                <a
                  href="https://passkilabs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-emerald-400 underline underline-offset-2 transition-colors hover:text-emerald-300"
                >
                  Passkilabs.com
                </a>
              </p>
            </div>
            <ul className="flex flex-wrap items-center gap-x-1">
              {FOOTER_LEGAL_NAV.map((item) => (
                <li key={item.key}>
                  <Link
                    to={localePath(lang, item.path)}
                    className="text-fluid-sm inline-flex min-h-11 items-center rounded px-2 text-white/75 transition-colors hover:text-white"
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className="text-fluid-sm inline-flex min-h-11 items-center rounded px-3 text-white/70 transition-colors hover:text-white"
    >
      {children}
    </Link>
  );
}

function FooterContact({ href, icon: Icon, external, children }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="text-fluid-sm flex min-h-11 items-center gap-3 rounded px-3 text-white/70 transition-colors hover:text-white"
    >
      <Icon className="text-brand-300 size-5 shrink-0" aria-hidden="true" />
      <span className="min-w-0 break-words">{children}</span>
    </a>
  );
}
