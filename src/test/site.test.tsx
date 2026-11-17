import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Hero } from '@/components/home/Hero';
import { AgendaSection } from '@/components/home/AgendaSection';
import { VideosSection } from '@/components/home/VideosSection';
import { GaleriaSection } from '@/components/home/GaleriaSection';
import { MusicosSection } from '@/components/home/MusicosSection';
import { ContratacaoCTASection } from '@/components/home/ContratacaoCTASection';
import { ImprensaSection } from '@/components/home/ImprensaSection';
import { BookingForm } from '@/components/booking/BookingForm';
import { copy, destinations } from '@/content/copy';

describe('Jojo Mendes — Critérios de Aceite da Home e Contratação', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('Hero exibe somente logotipo + dois CTAs (Agendar show e Ver agenda) apontando para /contratacao e /#agenda', () => {
    render(<Hero />);

    const mobileHero = screen.getByTestId('hero-mobile');
    const desktopHero = screen.getByTestId('hero-desktop');

    for (const container of [mobileHero, desktopHero]) {
      const links = within(container).getAllByRole('link');
      expect(links).toHaveLength(2);
      expect(links[0]).toHaveTextContent(copy.hero.primaryCta);
      expect(links[0]).toHaveAttribute('href', '/contratacao');
      expect(links[1]).toHaveTextContent(copy.hero.secondaryCta);
      expect(links[1]).toHaveAttribute('href', '/#agenda');
    }
  });

  it('Agenda sem shows exibe estado vazio honesto sem datas falsas', () => {
    render(<AgendaSection items={[]} />);

    expect(screen.getByText(copy.schedule.emptyTitle)).toBeInTheDocument();
    expect(
      screen.getByText(copy.schedule.emptyDescription)
    ).toBeInTheDocument();
  });

  it('Vídeos rotulam vídeos demonstrativos e montam iframe somente após clique', async () => {
    const user = userEvent.setup();
    render(
      <VideosSection
        items={[
          {
            id: 'demo-test',
            youtubeId: 'QaEwVp334kA',
            title: 'Vídeo de Demonstração',
            isDemo: true,
          },
        ]}
      />
    );

    expect(
      screen.getAllByText(copy.videos.demoBadge).length
    ).toBeGreaterThan(0);
    expect(document.querySelector('iframe')).not.toBeInTheDocument();

    const playButtons = screen.getAllByRole('button', {
      name: new RegExp(copy.videos.playButtonLabel, 'i'),
    });
    await user.click(playButtons[0]!);

    const iframe = document.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
    expect(iframe?.getAttribute('src')).toContain('youtube-nocookie.com/embed/');
  });

  it('Avança o vídeo ativo ao clicar na seta Próximo vídeo', async () => {
    const user = userEvent.setup();
    render(<VideosSection />);
    const nextButtons = screen.getAllByRole('button', { name: /próximo vídeo/i });
    await user.click(nextButtons[0]!);
    expect(screen.getByText(/02\/06/)).toBeInTheDocument();
  });

  it('Galeria possui nomes acessíveis "Abrir foto [n] da galeria" e abre Lightbox ao clicar', async () => {
    const user = userEvent.setup();
    render(<GaleriaSection />);

    const firstPhotoBtn = screen.getByRole('button', {
      name: copy.gallery.openPhotoLabel(1),
    });
    expect(firstPhotoBtn).toBeInTheDocument();

    await user.click(firstPhotoBtn);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(
      within(dialog).getByRole('button', {
        name: copy.gallery.closeGalleryLabel,
      })
    ).toBeInTheDocument();
  });

  it('Formação musical e Imprensa exibem mensagens honestas de atualização quando vazias', () => {
    render(
      <>
        <MusicosSection items={[]} />
        <ImprensaSection items={[]} />
      </>
    );

    expect(screen.getByText(copy.musicians.emptyMessage)).toBeInTheDocument();
    expect(screen.getByText(copy.press.emptyMessage)).toBeInTheDocument();
  });

  it('Mapa de Palco exibe trio cênico (Guitarrista, Jojo Mendes, Tecladista)', () => {
    render(<MusicosSection />);

    expect(screen.getByText(copy.musicians.stageMapDiagramTitle)).toBeInTheDocument();
    expect(screen.getByText('Guitarrista')).toBeInTheDocument();
    expect(screen.getByText('Jojo Mendes')).toBeInTheDocument();
    expect(screen.getByText('Tecladista')).toBeInTheDocument();
    expect(screen.getByText(copy.musicians.audienceLabel)).toBeInTheDocument();
  });

  it('Contratação CTA exibe chamada comercial e link para /contratacao', () => {
    render(<ContratacaoCTASection />);

    expect(screen.getByText(copy.bookingBanner.eyebrow)).toBeInTheDocument();
    expect(screen.getByText(copy.bookingBanner.title)).toBeInTheDocument();
    const ctaLink = screen.getByRole('link', {
      name: new RegExp(copy.bookingBanner.cta, 'i'),
    });
    expect(ctaLink).toHaveAttribute('href', destinations.booking);
  });

  it('ImprensaSection exibe cartões de materiais de divulgação e caixa de release para cópia', () => {
    render(<ImprensaSection />);

    expect(screen.getByText(copy.press.title)).toBeInTheDocument();
    expect(screen.getByText(copy.press.releaseTitle)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: copy.press.copyReleaseCta })).toBeInTheDocument();
    expect(screen.getByText('Logotipo Oficial Dourado')).toBeInTheDocument();
  });

  it('Formulário de contratação valida campos obrigatórios e exibe aviso de modo demonstração quando API retorna 503 NOT_CONFIGURED', async () => {
    const user = userEvent.setup();
    vi.spyOn(global, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ code: 'NOT_CONFIGURED' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    render(<BookingForm />);

    const submitBtn = screen.getByRole('button', {
      name: copy.bookingPage.submit,
    });
    await user.click(submitBtn);

    expect(
      await screen.findByText(copy.bookingPage.fields.contractorName.error)
    ).toBeInTheDocument();

    // Preencher dados válidos
    await user.type(
      screen.getByLabelText(/Nome do responsável/i),
      'Produtora Exemplo'
    );
    await user.type(
      screen.getByLabelText(/WhatsApp para contato/i),
      '+55 (11) 98888-7777'
    );
    await user.type(screen.getByLabelText(/Cidade do evento/i), 'São Paulo');
    await user.selectOptions(screen.getByLabelText(/Estado/i), 'SP');
    await user.type(screen.getByLabelText(/Data pretendida/i), '2027-12-20');
    await user.type(
      screen.getByLabelText(/Local do evento/i),
      'Espaço das Américas'
    );
    await user.click(
      screen.getByRole('checkbox', { name: /Li a Política de privacidade/i })
    );

    await user.click(submitBtn);

    expect(
      await screen.findByText(copy.bookingPage.demoModeMessage)
    ).toBeInTheDocument();
  });
});

