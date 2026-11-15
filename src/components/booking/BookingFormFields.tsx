'use client';

import React from 'react';
import Link from 'next/link';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { BookingFormValues } from '@/lib/validation/booking';
import { copy, destinations } from '@/content/copy';
import { brazilianStates } from '@/content/site';
import { cn } from '@/lib/utils';

interface BookingFormFieldsProps {
  register: UseFormRegister<BookingFormValues>;
  errors: FieldErrors<BookingFormValues>;
  disabled?: boolean;
}

const inputBaseClass =
  'min-h-[52px] xl:min-h-[56px] w-full rounded-md border bg-ink-900 px-4 xl:px-[18px] text-[16px] leading-[24px] text-text placeholder:text-text-muted/55 transition-colors focus-visible:outline-2 focus-visible:outline-focus disabled:opacity-50';

function FieldError({
  id,
  message,
}: {
  id: string;
  message?: string;
}) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-[13px] leading-[18px] text-danger">
      {message}
    </p>
  );
}

export function BookingFormFields({
  register,
  errors,
  disabled = false,
}: BookingFormFieldsProps) {
  const f = copy.bookingPage.fields;

  return (
    <div className="space-y-5 xl:space-y-6">
      {/* Honeypot oculto para proteção contra bots */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="websiteHoneypot">Website</label>
        <input
          id="websiteHoneypot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('websiteHoneypot')}
        />
      </div>

      {/* Par 1: Nome do responsável (1) e WhatsApp para contato (2) */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2 xl:gap-6">
        <div>
          <label
            htmlFor="contractorName"
            className="type-label text-text mb-2 block"
          >
            {f.contractorName.label} <span className="text-primary">*</span>
          </label>
          <input
            id="contractorName"
            type="text"
            autoComplete="name"
            disabled={disabled}
            placeholder={f.contractorName.placeholder}
            aria-invalid={Boolean(errors.contractorName) || undefined}
            aria-describedby={
              errors.contractorName ? 'contractorName-error' : undefined
            }
            className={cn(
              inputBaseClass,
              errors.contractorName ? 'border-danger' : 'border-border'
            )}
            {...register('contractorName')}
          />
          <FieldError
            id="contractorName-error"
            message={errors.contractorName?.message}
          />
        </div>

        <div>
          <label
            htmlFor="whatsapp"
            className="type-label text-text mb-2 block"
          >
            {f.whatsapp.label} <span className="text-primary">*</span>
          </label>
          <input
            id="whatsapp"
            type="tel"
            autoComplete="tel"
            disabled={disabled}
            placeholder={f.whatsapp.placeholder}
            aria-invalid={Boolean(errors.whatsapp) || undefined}
            aria-describedby={errors.whatsapp ? 'whatsapp-error' : undefined}
            className={cn(
              inputBaseClass,
              errors.whatsapp ? 'border-danger' : 'border-border'
            )}
            {...register('whatsapp')}
          />
          <FieldError id="whatsapp-error" message={errors.whatsapp?.message} />
        </div>
      </div>

      {/* Par 2: Cidade do evento (3) e Estado (4) */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2 xl:gap-6">
        <div>
          <label htmlFor="city" className="type-label text-text mb-2 block">
            {f.city.label} <span className="text-primary">*</span>
          </label>
          <input
            id="city"
            type="text"
            autoComplete="address-level2"
            disabled={disabled}
            placeholder={f.city.placeholder}
            aria-invalid={Boolean(errors.city) || undefined}
            aria-describedby={errors.city ? 'city-error' : undefined}
            className={cn(
              inputBaseClass,
              errors.city ? 'border-danger' : 'border-border'
            )}
            {...register('city')}
          />
          <FieldError id="city-error" message={errors.city?.message} />
        </div>

        <div>
          <label htmlFor="state" className="type-label text-text mb-2 block">
            {f.state.label} <span className="text-primary">*</span>
          </label>
          <select
            id="state"
            disabled={disabled}
            defaultValue=""
            aria-invalid={Boolean(errors.state) || undefined}
            aria-describedby={errors.state ? 'state-error' : undefined}
            className={cn(
              inputBaseClass,
              errors.state ? 'border-danger' : 'border-border'
            )}
            {...register('state')}
          >
            <option value="" disabled>
              {f.state.placeholder}
            </option>
            {brazilianStates.map((uf) => (
              <option key={uf.value} value={uf.value}>
                {uf.label}
              </option>
            ))}
          </select>
          <FieldError id="state-error" message={errors.state?.message} />
        </div>
      </div>

      {/* Par 3: Data pretendida (5) e Local do evento (6) */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2 xl:gap-6">
        <div>
          <label
            htmlFor="eventDate"
            className="type-label text-text mb-2 block"
          >
            {f.eventDate.label} <span className="text-primary">*</span>
          </label>
          <input
            id="eventDate"
            type="date"
            disabled={disabled}
            aria-invalid={Boolean(errors.eventDate) || undefined}
            aria-describedby={errors.eventDate ? 'eventDate-error' : undefined}
            className={cn(
              inputBaseClass,
              '[color-scheme:dark]',
              errors.eventDate ? 'border-danger' : 'border-border'
            )}
            {...register('eventDate')}
          />
          <FieldError
            id="eventDate-error"
            message={errors.eventDate?.message}
          />
        </div>

        <div>
          <label htmlFor="venue" className="type-label text-text mb-2 block">
            {f.venue.label} <span className="text-primary">*</span>
          </label>
          <input
            id="venue"
            type="text"
            disabled={disabled}
            placeholder={f.venue.placeholder}
            aria-invalid={Boolean(errors.venue) || undefined}
            aria-describedby={errors.venue ? 'venue-error' : undefined}
            className={cn(
              inputBaseClass,
              errors.venue ? 'border-danger' : 'border-border'
            )}
            {...register('venue')}
          />
          <FieldError id="venue-error" message={errors.venue?.message} />
        </div>
      </div>

      {/* Par 4: Horário pretendido (7 - opcional) e Público estimado (8 - opcional) */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2 xl:gap-6">
        <div>
          <label
            htmlFor="eventTime"
            className="type-label text-text mb-2 block"
          >
            {f.eventTime.label}
          </label>
          <input
            id="eventTime"
            type="time"
            disabled={disabled}
            aria-invalid={Boolean(errors.eventTime) || undefined}
            aria-describedby={errors.eventTime ? 'eventTime-error' : undefined}
            className={cn(
              inputBaseClass,
              '[color-scheme:dark]',
              errors.eventTime ? 'border-danger' : 'border-border'
            )}
            {...register('eventTime')}
          />
          <FieldError
            id="eventTime-error"
            message={errors.eventTime?.message}
          />
        </div>

        <div>
          <label
            htmlFor="estimatedAudience"
            className="type-label text-text mb-2 block"
          >
            {f.estimatedAudience.label}
          </label>
          <input
            id="estimatedAudience"
            type="number"
            min={1}
            inputMode="numeric"
            disabled={disabled}
            placeholder={f.estimatedAudience.placeholder}
            aria-invalid={Boolean(errors.estimatedAudience) || undefined}
            aria-describedby={
              errors.estimatedAudience ? 'estimatedAudience-error' : undefined
            }
            className={cn(
              inputBaseClass,
              errors.estimatedAudience ? 'border-danger' : 'border-border'
            )}
            {...register('estimatedAudience')}
          />
          <FieldError
            id="estimatedAudience-error"
            message={errors.estimatedAudience?.message}
          />
        </div>
      </div>

      {/* Campo 9: Informações adicionais (opcional) */}
      <div>
        <label
          htmlFor="additionalInfo"
          className="type-label text-text mb-2 block"
        >
          {f.additionalInfo.label}
        </label>
        <textarea
          id="additionalInfo"
          rows={5}
          disabled={disabled}
          placeholder={f.additionalInfo.placeholder}
          aria-invalid={Boolean(errors.additionalInfo) || undefined}
          aria-describedby={
            errors.additionalInfo ? 'additionalInfo-error' : undefined
          }
          className={cn(
            'min-h-[132px] xl:min-h-[144px] w-full rounded-md border bg-ink-900 p-4 xl:px-[18px] text-[16px] leading-[24px] text-text placeholder:text-text-muted/55 transition-colors focus-visible:outline-2 focus-visible:outline-focus disabled:opacity-50',
            errors.additionalInfo ? 'border-danger' : 'border-border'
          )}
          {...register('additionalInfo')}
        />
        <FieldError
          id="additionalInfo-error"
          message={errors.additionalInfo?.message}
        />
      </div>

      {/* Consentimento obrigatório */}
      <div className="pt-1">
        <div className="flex items-start gap-3">
          <input
            id="consent"
            type="checkbox"
            disabled={disabled}
            aria-invalid={Boolean(errors.consent) || undefined}
            aria-describedby={errors.consent ? 'consent-error' : undefined}
            className="mt-1 h-5 w-5 shrink-0 rounded-sm border border-border bg-ink-900 accent-primary"
            {...register('consent')}
          />
          <label htmlFor="consent" className="type-body-sm text-text-muted">
            {copy.bookingPage.consentPrefix}
            <Link
              href={destinations.privacy}
              className="text-primary font-semibold hover:text-primary-hover underline underline-offset-4"
            >
              {copy.bookingPage.consentLinkText}
            </Link>
            {copy.bookingPage.consentSuffix}{' '}
            <span className="text-primary">*</span>
          </label>
        </div>
        <FieldError id="consent-error" message={errors.consent?.message} />
      </div>
    </div>
  );
}

