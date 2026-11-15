'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import {
  bookingFormSchema,
  type BookingFormValues,
} from '@/lib/validation/booking';
import { copy } from '@/content/copy';
import { Button } from '@/components/ui/Button';
import { BookingFormFields } from '@/components/booking/BookingFormFields';

type SubmissionState = 'idle' | 'submitting' | 'success' | 'demo' | 'error';

export function BookingForm() {
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>('idle');

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

    try {
      const response = await fetch('/api/contratacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const payload = (await response.json().catch(() => null)) as {
        code?: string;
      } | null;

      if (response.ok) {
        setSubmissionState('success');
        reset();
        return;
      }

      if (response.status === 503 && payload?.code === 'NOT_CONFIGURED') {
        setSubmissionState('demo');
        return;
      }

      setSubmissionState('error');
    } catch {
      setSubmissionState('error');
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
              className="flex items-start gap-3 rounded-md border border-status-warning/60 bg-status-warning/10 p-4 text-text"
            >
              <Info
                className="h-5 w-5 shrink-0 text-status-warning mt-0.5"
                aria-hidden="true"
              />
              <p className="type-body-sm">{copy.bookingPage.demoModeMessage}</p>
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
              className="flex items-start gap-3 rounded-md border border-status-success/60 bg-status-success/10 p-4 text-text"
            >
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
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={submissionState === 'submitting'}
          loadingText={copy.bookingPage.submitting}
        >
          {copy.bookingPage.submit}
        </Button>
      </form>
    </div>
  );
}

