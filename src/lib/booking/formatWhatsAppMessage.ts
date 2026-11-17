import type { BookingFormValues } from '@/lib/validation/booking';
import { commercialContact } from '@/content/site';

/**
 * Formata os dados preenchidos no formulário de contratação
 * em uma mensagem estruturada e elegante para o WhatsApp.
 */
export function formatWhatsAppBookingMessage(data: BookingFormValues): string {
  // Formata data ISO YYYY-MM-DD para DD/MM/YYYY se aplicável
  let formattedDate = data.eventDate;
  if (/^\d{4}-\d{2}-\d{2}$/.test(data.eventDate)) {
    const [year, month, day] = data.eventDate.split('-');
    formattedDate = `${day}/${month}/${year}`;
  }

  const lines: string[] = [
    '✨ *Nova solicitação de show — Jojo Mendes*',
    '',
    `👤 *Responsável:* ${data.contractorName}`,
    `📱 *WhatsApp:* ${data.whatsapp}`,
    `📍 *Cidade/UF:* ${data.city} - ${data.state}`,
    `📅 *Data pretendida:* ${formattedDate}`,
    `🎪 *Local:* ${data.venue}`,
  ];

  if (data.eventTime?.trim()) {
    lines.push(`⏰ *Horário:* ${data.eventTime.trim()}`);
  }

  if (data.estimatedAudience?.trim()) {
    lines.push(`👥 *Público estimado:* ${data.estimatedAudience.trim()} pessoas`);
  }

  if (data.additionalInfo?.trim()) {
    lines.push(`📝 *Informações adicionais:* ${data.additionalInfo.trim()}`);
  }

  lines.push('');
  lines.push('_Enviado pelo formulário de contratação do site oficial_');

  return lines.join('\n');
}

/**
 * Constrói o link oficial wa.me pronto para envio.
 */
export function createBookingWhatsAppUrl(data: BookingFormValues): string {
  const message = formatWhatsAppBookingMessage(data);
  const rawNumber = commercialContact.whatsappRawNumber.replace(/\D/g, '');
  return `https://wa.me/${rawNumber}?text=${encodeURIComponent(message)}`;
}

