import { describe, it, expect } from 'vitest';
import {
  formatWhatsAppBookingMessage,
  createBookingWhatsAppUrl,
} from '@/lib/booking/formatWhatsAppMessage';
import type { BookingFormValues } from '@/lib/validation/booking';

describe('Fluxo de Mensagem para WhatsApp Comercial de Jojo Mendes', () => {
  const sampleData: BookingFormValues = {
    contractorName: 'Prefeitura Municipal de Caxias',
    whatsapp: '+55 (98) 99123-4567',
    city: 'Caxias',
    state: 'MA',
    eventDate: '2026-06-24',
    venue: 'Praça da Matriz',
    eventTime: '22:00',
    estimatedAudience: '5000',
    additionalInfo: 'Show no palco principal do São João com rider completo.',
    consent: true,
    websiteHoneypot: '',
  };

  it('formata os dados do contratante em mensagem elegante e estruturada', () => {
    const message = formatWhatsAppBookingMessage(sampleData);

    expect(message).toContain('✨ *Nova solicitação de show — Jojo Mendes*');
    expect(message).toContain('👤 *Responsável:* Prefeitura Municipal de Caxias');
    expect(message).toContain('📱 *WhatsApp:* +55 (98) 99123-4567');
    expect(message).toContain('📍 *Cidade/UF:* Caxias - MA');
    expect(message).toContain('📅 *Data pretendida:* 24/06/2026');
    expect(message).toContain('🎪 *Local:* Praça da Matriz');
    expect(message).toContain('⏰ *Horário:* 22:00');
    expect(message).toContain('👥 *Público estimado:* 5000 pessoas');
    expect(message).toContain(
      '📝 *Informações adicionais:* Show no palco principal do São João com rider completo.'
    );
    expect(message).toContain('_Enviado pelo formulário de contratação do site oficial_');
  });

  it('gera URL wa.me apontando diretamente para o número comercial 5598984510178', () => {
    const url = createBookingWhatsAppUrl(sampleData);

    expect(url).toMatch(/^https:\/\/wa\.me\/5598984510178\?text=/);
    expect(url).toContain(encodeURIComponent('Prefeitura Municipal de Caxias'));
    expect(url).toContain(encodeURIComponent('24/06/2026'));
  });
});

