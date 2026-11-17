'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, AlertCircle, Info, MessageCircle } from 'lucide-react';
import {
  bookingFormSchema,
  type BookingFormValues,
} from '@/lib/validation/booking';
import { createBookingWhatsAppUrl } from '@/lib/booking/formatWhatsAppMessage';
import { copy } from '@/content/copy';
import { Button } from '@/components/ui/Button';
import { BookingFormFields } from '@/components/booking/BookingFormFields';

type SubmissionState = 'idle' | 'submitting' | 'success' | 'demo' | 'error';

export function BookingForm() {
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>('idle');
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted, isValid },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      contractorName: '',
      whatsapp: '',
      city: '',
      state: '',
      eventDate: '',
      venue: '',
      eventTime: '',
      estimatedAudience: '',
      additionalInfo: '',
      consent: false,
      websiteHoneypot: '',
    },
  });

  const onSubmit = async (data: BookingFormValues) => {
    setSubmissionState('submitting');

    const generatedUrl = createBookingWhatsAppUrl(data);
    setWhatsappUrl(generatedUrl);

    // Abre o WhatsApp diretamente com a mensagem preenchida
    if (typeof window !== 'undefined' && typeof window.open === 'function') {
      try {
        window.open(generatedUrl, '_blank', 'noopener,noreferrer');
      } catch {
        // Silencioso se pop-up for restrito pelo navegador
      }
    }

    try {
      const response = await fetch('/api/contratacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const payload = (await response.json().catch(() => null)) as {
        code?: string;
      } | null;

      if (response.status === 503 && payload?.code === 'NOT_CONFIGURED') {
        setSubmissionState('demo');
        return;
      }

      if (response.ok) {
        setSubmissionState('success');
        reset();
        return;
      }

      // Mesmo que a API retorne aviso, o WhatsApp foi gerado
      setSubmissionState('success');
    } catch {
      setSubmissionState('success');
    }
  };

  const hasValidationErrors =
    isSubmitted && !isValid && Object.keys(errors).length > 0;

  return (
    <div className="w-full max-w-form rounded-lg border border-border-subtle bg-surface p-5 md:p-7 xl:p-9 shadow-card">
      <p className="type-caption text-text-muted mb-6">
        {copy.bookingPage.requiredLegend}
      </p>

      <form
        onSubmit={handleSubmit(onSubmit, () => setSubmissionState('idle'))}
        noValidate
        className="space-y-6"
      >
        <BookingFormFields
          register={register}
          errors={errors}
          disabled={submissionState === 'submitting'}
        />

        {/* Avisos de validação, modo demo, sucesso ou erro */}
        <div aria-live="polite" className="space-y-3">
          {hasValidationErrors && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-md border border-danger/60 bg-danger/10 p-4 text-text"
            >
              <AlertCircle
                className="h-5 w-5 shrink-0 text-danger mt-0.5"
                aria-hidden="true"
              />
              <p className="type-body-sm">
                {copy.bookingPage.validationErrorMessage}
              </p>
            </div>
          )}

          {submissionState === 'demo' && (
            <div
              role="status"
              className="flex flex-col gap-3 rounded-md border border-status-warning/60 bg-status-warning/10 p-4 text-text"
            >
              <div className="flex items-start gap-3">
                <Info
                  className="h-5 w-5 shrink-0 text-status-warning mt-0.5"
                  aria-hidden="true"
                />
                <p className="type-body-sm">{copy.bookingPage.demoModeMessage}</p>
              </div>
              {whatsappUrl && (
                <div className="pl-8 pt-1">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-black transition-all hover:brightness-110 shadow-md"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Prosseguir no WhatsApp</span>
                  </a>
                </div>
              )}
            </div>
          )}

          {submissionState === 'error' && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-md border border-danger/60 bg-danger/10 p-4 text-text"
            >
              <AlertCircle
                className="h-5 w-5 shrink-0 text-danger mt-0.5"
                aria-hidden="true"
              />
              <p className="type-body-sm">{copy.bookingPage.errorMessage}</p>
            </div>
          )}

          {submissionState === 'success' && (
            <div
              role="status"
              className="flex flex-col gap-3 rounded-md border border-status-success/60 bg-status-success/10 p-4 text-text"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2
                  className="h-5 w-5 shrink-0 text-status-success mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <p className="type-label text-text">
                    {copy.bookingPage.successTitle}
                  </p>
                  <p className="type-body-sm text-text-muted mt-0.5">
                    {copy.bookingPage.successDescription}
                  </p>
                </div>
              </div>
              {whatsappUrl && (
                <div className="pl-8 pt-1">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-black transition-all hover:brightness-110 shadow-md"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Abrir no WhatsApp</span>
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={submissionState === 'submitting'}
          loadingText={copy.bookingPage.submitting}
          className="flex items-center justify-center gap-2"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          <span>{copy.bookingPage.submit}</span>
        </Button>
      </form>
    </div>
  );
}

