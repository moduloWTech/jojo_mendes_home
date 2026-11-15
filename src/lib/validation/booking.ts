import { z } from 'zod';
import { copy } from '@/content/copy';
import { brazilianStates } from '@/content/site';

const validStateCodes = new Set<string>(brazilianStates.map((s) => s.value));

export const bookingFormSchema = z.object({
  contractorName: z
    .string()
    .trim()
    .min(2, { message: copy.bookingPage.fields.contractorName.error })
    .max(120, { message: copy.bookingPage.fields.contractorName.error }),
  whatsapp: z
    .string()
    .trim()
    .refine(
      (val) => {
        const digits = val.replace(/\D/g, '');
        return digits.length >= 10 && digits.length <= 15;
      },
      { message: copy.bookingPage.fields.whatsapp.error }
    ),
  city: z
    .string()
    .trim()
    .min(2, { message: copy.bookingPage.fields.city.error })
    .max(100, { message: copy.bookingPage.fields.city.error }),
  state: z
    .string()
    .trim()
    .refine((val) => validStateCodes.has(val), {
      message: copy.bookingPage.fields.state.error,
    }),
  eventDate: z
    .string()
    .trim()
    .refine(
      (val) => {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(val)) return false;
        const parsed = new Date(`${val}T00:00:00`);
        if (Number.isNaN(parsed.getTime())) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return parsed >= today;
      },
      { message: copy.bookingPage.fields.eventDate.error }
    ),
  venue: z
    .string()
    .trim()
    .min(2, { message: copy.bookingPage.fields.venue.error })
    .max(160, { message: copy.bookingPage.fields.venue.error }),
  eventTime: z
    .string()
    .trim()
    .optional()
    .or(z.literal(''))
    .refine(
      (val) => {
        if (!val) return true;
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(val);
      },
      { message: copy.bookingPage.fields.eventTime.error }
    ),
  estimatedAudience: z
    .string()
    .trim()
    .optional()
    .or(z.literal(''))
    .refine(
      (val) => {
        if (!val) return true;
        const num = Number(val);
        return Number.isInteger(num) && num > 0 && num <= 1000000;
      },
      { message: copy.bookingPage.fields.estimatedAudience.error }
    ),
  additionalInfo: z
    .string()
    .trim()
    .max(2000, { message: copy.bookingPage.fields.additionalInfo.error })
    .optional()
    .or(z.literal('')),
  consent: z.boolean().refine((val) => val === true, {
    message: copy.bookingPage.fields.consent.error,
  }),
  websiteHoneypot: z.string().optional().or(z.literal('')),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;

