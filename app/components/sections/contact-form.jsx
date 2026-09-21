import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { AlertCircle, CheckCircle2, Send } from 'lucide-react';
import { z } from 'zod';

import { COMPANY, CONTACT } from '../../config/contact.js';
import { cn } from '../../lib/cn.js';
import { localePath } from '../../lib/links.js';
import { Button } from '../ui/button.jsx';

const ENQUIRY_TYPES = ['farmer', 'dealer', 'distributor', 'export', 'other'];

/**
 * Web3Forms access key. Set VITE_WEB3FORMS_KEY in `.env`.
 * Read at module scope so the missing-config state is decided once.
 */
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

function buildSchema(t) {
  return z.object({
    name: z.string().trim().min(2, t('form.errors.name')),
    email: z.email(t('form.errors.email')),
    // Deliberately permissive: this audience writes numbers many different ways
    // (+91, 0-prefixed, spaced, hyphenated) and a strict pattern rejects real people.
    phone: z
      .string()
      .trim()
      .min(7, t('form.errors.phone'))
      .regex(/^[+\d][\d\s\-()]{6,}$/, t('form.errors.phone')),
    location: z.string().trim().optional(),
    enquiryType: z.enum(ENQUIRY_TYPES),
    crop: z.string().trim().optional(),
    message: z.string().trim().min(10, t('form.errors.message')),
    // Honeypot: bots fill every field, humans never see this one.
    website: z.string().max(0).optional(),
  });
}

export function ContactForm({ lang }) {
  const { t } = useTranslation(['contact', 'common']);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(buildSchema(t)),
    defaultValues: { enquiryType: 'farmer' },
  });

  async function onSubmit(values) {
    if (values.website) return; // honeypot tripped — silently drop

    setStatus('submitting');

    // 1. Try Web3Forms API if access key is present
    if (ACCESS_KEY) {
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: ACCESS_KEY,
            subject: `Website enquiry — ${values.enquiryType} — ${values.name}`,
            from_name: `${COMPANY.shortName} website`,
            name: values.name,
            email: values.email,
            phone: values.phone,
            location: values.location || '—',
            enquiry_type: values.enquiryType,
            crop: values.crop || '—',
            message: values.message,
            language: lang,
          }),
        });

        const result = await response.json();
        if (response.ok && result.success) {
          setStatus('success');
          reset();
          return;
        }
      } catch (err) {
        console.warn('Web3Forms submit error, using mailto fallback:', err);
      }
    }

    // 2. Direct mailto fallback targeting specified email (raone2805@gmail.com / customercare@craftdyne.net)
    try {
      const targetEmail = CONTACT.enquiryEmail || CONTACT.email;
      const subject = encodeURIComponent(`Website enquiry — ${values.enquiryType} — ${values.name}`);
      const bodyLines = [
        `Website Enquiry Details`,
        `----------------------`,
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        `Phone: ${values.phone}`,
        `Location: ${values.location || 'N/A'}`,
        `Enquiry Type: ${values.enquiryType}`,
        `Crop / Application: ${values.crop || 'N/A'}`,
        ``,
        `Message:`,
        `${values.message}`,
      ].join('\n');

      const mailtoUrl = `mailto:${targetEmail}?subject=${subject}&body=${encodeURIComponent(bodyLines)}`;
      window.location.href = mailtoUrl;

      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="border-brand-200 bg-brand-50 rounded-2xl border p-8 text-center">
        <CheckCircle2 className="text-brand-600 mx-auto size-12" aria-hidden="true" />
        <h3 className="text-fluid-xl mt-4">{t('form.success.title')}</h3>
        <p className="mx-auto mt-3 max-w-md text-slate-600">{t('form.success.body')}</p>
        <Button as="button" type="button" variant="outline" className="mt-6" onClick={() => setStatus('idle')}>
          {t('form.success.again')}
        </Button>
      </div>
    );
  }

  const submitting = status === 'submitting';

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      {/* Honeypot — hidden from people, offered to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label={t('form.fields.name.label')} error={errors.name} required>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder={t('form.fields.name.placeholder')}
            className={inputClass(errors.name)}
            {...register('name')}
          />
        </Field>

        <Field id="email" label={t('form.fields.email.label')} error={errors.email} required>
          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={t('form.fields.email.placeholder')}
            className={inputClass(errors.email)}
            {...register('email')}
          />
        </Field>

        <Field id="phone" label={t('form.fields.phone.label')} error={errors.phone} required>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={t('form.fields.phone.placeholder')}
            className={inputClass(errors.phone)}
            {...register('phone')}
          />
        </Field>

        <Field id="location" label={t('form.fields.location.label')} error={errors.location}>
          <input
            id="location"
            type="text"
            autoComplete="address-level2"
            placeholder={t('form.fields.location.placeholder')}
            className={inputClass(errors.location)}
            {...register('location')}
          />
        </Field>

        <Field id="enquiryType" label={t('form.fields.enquiryType.label')} error={errors.enquiryType}>
          <select id="enquiryType" className={inputClass(errors.enquiryType)} {...register('enquiryType')}>
            {ENQUIRY_TYPES.map((type) => (
              <option key={type} value={type}>
                {t(`form.enquiryTypes.${type}`)}
              </option>
            ))}
          </select>
        </Field>

        <Field id="crop" label={t('form.fields.crop.label')} error={errors.crop}>
          <input
            id="crop"
            type="text"
            placeholder={t('form.fields.crop.placeholder')}
            className={inputClass(errors.crop)}
            {...register('crop')}
          />
        </Field>
      </div>

      <Field id="message" label={t('form.fields.message.label')} error={errors.message} required>
        <textarea
          id="message"
          rows={5}
          placeholder={t('form.fields.message.placeholder')}
          className={cn(inputClass(errors.message), 'min-h-32 resize-y')}
          {...register('message')}
        />
      </Field>

      {status === 'error' ? (
        <p role="alert" className="text-fluid-sm flex items-start gap-2.5 rounded-lg bg-red-50 p-4 text-red-800">
          <AlertCircle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <span>{t('form.errors.submit')}</span>
        </p>
      ) : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button as="button" type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
          <Send className="size-5" aria-hidden="true" />
          {submitting ? t('form.submitting') : t('form.submit')}
        </Button>
        <p className="text-xs text-slate-500">
          {t('form.privacyNote')}{' '}
          <Link to={localePath(lang, 'privacy')} className="hover:text-brand-700 underline">
            {t('common:footer.privacy')}
          </Link>
        </p>
      </div>
    </form>
  );
}

function Field({ id, label, error, required, children }) {
  const { t } = useTranslation('common');
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-display text-fluid-sm text-navy-700 font-semibold">
        {label}
        {required ? (
          <span className="text-brand-700 ml-1" aria-label={t('labels.required')}>
            *
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-fluid-sm text-red-700">
          {error.message}
        </p>
      ) : null}
    </div>
  );
}

function inputClass(error) {
  return cn(
    // min-h-12 keeps every control a comfortable touch target; the 16px base
    // font size is what stops iOS Safari zooming the page on focus.
    'min-h-12 w-full rounded-lg border bg-white px-4 py-2.5 text-navy-800',
    'placeholder:text-slate-400',
    'focus-visible:outline-3 focus-visible:outline-offset-1 focus-visible:outline-brand-700',
    error ? 'border-red-400' : 'border-slate-300',
  );
}
