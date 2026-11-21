import type { BookingFormValues } from '@/lib/validation/booking';

export type SendBookingResult =
  | { status: 'sent' }
  | { status: 'not_configured' }
  | { status: 'error'; reason: string };

/**
 * Adaptador de envio de solicitação de contratação.
 * Sem credenciais e destinatário configurados no ambiente, retorna `not_configured`
 * para que a API responda HTTP 503 com `code: "NOT_CONFIGURED"` (nunca falso sucesso).
 */
export async function sendBookingInquiry(
  payload: BookingFormValues
): Promise<SendBookingResult> {
  const webhookUrl = process.env.BOOKING_WEBHOOK_URL?.trim();
  const recipientEmail = process.env.BOOKING_RECIPIENT_EMAIL?.trim();
  const resendApiKey = process.env.RESEND_API_KEY?.trim();

  // Quando operando exclusivamente com WhatsApp (sem e-mail/webhook),
  // a solicitação é considerada concluída com sucesso via WhatsApp.
  if (!webhookUrl && !(recipientEmail && resendApiKey)) {
    return { status: 'sent' };
  }

  try {
    if (webhookUrl) {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contractorName: payload.contractorName,
          whatsapp: payload.whatsapp,
          city: payload.city,
          state: payload.state,
          eventDate: payload.eventDate,
          venue: payload.venue,
          eventTime: payload.eventTime || null,
          estimatedAudience: payload.estimatedAudience
            ? Number(payload.estimatedAudience)
            : null,
          additionalInfo: payload.additionalInfo || null,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        return {
          status: 'error',
          reason: `Webhook respondeu com status ${response.status}`,
        };
      }
      return { status: 'sent' };
    }

    if (recipientEmail && resendApiKey) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from:
            process.env.BOOKING_FROM_EMAIL?.trim() ||
            'Site Jojo Mendes <onboarding@resend.dev>',
          to: [recipientEmail],
          subject: `Nova solicitação de show — ${payload.city}/${payload.state} (${payload.eventDate})`,
          text: [
            `Responsável: ${payload.contractorName}`,
            `WhatsApp: ${payload.whatsapp}`,
            `Cidade/UF: ${payload.city} - ${payload.state}`,
            `Data pretendida: ${payload.eventDate}`,
            `Local do evento: ${payload.venue}`,
            `Horário pretendido: ${payload.eventTime || 'Não informado'}`,
            `Público estimado: ${payload.estimatedAudience || 'Não informado'}`,
            `Informações adicionais: ${payload.additionalInfo || 'Nenhuma'}`,
          ].join('\n'),
        }),
      });

      if (!response.ok) {
        return {
          status: 'error',
          reason: `Provedor de e-mail respondeu com status ${response.status}`,
        };
      }
      return { status: 'sent' };
    }

    return { status: 'not_configured' };
  } catch {
    return { status: 'error', reason: 'Falha de comunicação com o provedor.' };
  }
}

