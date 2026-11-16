import React from 'react';
import { Header } from '@/components/navigation/Header';
import { Hero } from '@/components/home/Hero';
import { HistoriaSection } from '@/components/home/HistoriaSection';
import { AgendaSection } from '@/components/home/AgendaSection';
import { VideosSection } from '@/components/home/VideosSection';
import { GaleriaSection } from '@/components/home/GaleriaSection';
import { MusicosSection } from '@/components/home/MusicosSection';
import { ContratacaoCTASection } from '@/components/home/ContratacaoCTASection';
import { ImprensaSection } from '@/components/home/ImprensaSection';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="conteudo-principal" className="flex-1">
        {/* Dobra 1 — Hero cinematográfica */}
        <Hero />

        {/* Dobras subsequentes que sobem sobre a Hero cobrindo-a sem espaçamento em branco */}
        <div className="relative z-20 bg-bg shadow-[0_-28px_60px_rgba(10,10,14,0.45)]">
          {/* Dobra 2 — História */}
          <HistoriaSection />
          {/* Dobra 3 — Agenda */}
          <AgendaSection />
          {/* Dobra 4 — Vídeos */}
          <VideosSection />
          {/* Dobra 5 — Galeria */}
          <GaleriaSection />
          {/* Dobra 6 — Formação musical */}
          <MusicosSection />
          {/* Dobra 7 — Chamada comercial */}
          <ContratacaoCTASection />
          {/* Dobra 8 — Material de divulgação */}
          <ImprensaSection />
        </div>
      </main>
      {/* Dobra 9 — Footer */}
      <Footer />
    </>
  );
}

