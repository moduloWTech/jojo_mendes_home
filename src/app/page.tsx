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
import { prisma } from '@/lib/prisma';
import {
  shows as defaultShows,
  gallery as defaultGallery,
  videos as defaultVideos,
} from '@/content/site';
import type { Show, GalleryImage, ArtistVideo } from '@/types/site';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let showsData: Show[] = defaultShows;
  let galleryData: GalleryImage[] = defaultGallery;
  let videosData: ArtistVideo[] = defaultVideos;

  try {
    const dbShows = await prisma.show.findMany({
      orderBy: [{ date: 'asc' }, { time: 'asc' }],
    });
    // O site reflete exatamente o que está no banco de dados (inclusive se estiver vazio)
    showsData = dbShows.map((s) => ({
      id: s.id,
      date: s.date,
      city: s.city,
      state: s.state,
      venue: s.venue,
      time: s.time ?? undefined,
      detailsUrl: s.detailsUrl ?? undefined,
      status: s.status,
    }));
  } catch {
    // Fallback apenas em caso de falha de conexão com o banco
  }

  try {
    const dbPhotos = await prisma.galleryImage.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      take: 8,
    });
    // O site reflete exatamente o que está no banco (inclusive se estiver vazio)
    galleryData = dbPhotos.map((p) => ({
      id: p.id,
      src: p.src,
      alt: p.alt,
      width: p.width,
      height: p.height,
    }));
  } catch {
    // Fallback apenas em caso de falha de conexão com o banco
  }

  try {
    const dbVideos = await prisma.video.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
    // O site reflete exatamente o que está no banco (inclusive se estiver vazio)
    videosData = dbVideos.map((v) => ({
      id: v.id,
      youtubeId: v.youtubeId,
      title: v.title,
      isDemo: v.isDemo,
    }));
  } catch {
    // Fallback apenas em caso de falha de conexão com o banco
  }

  return (
    <>
      <Header />
      <main id="conteudo-principal" className="flex-1">
        {/* Dobra 1 — Hero cinematográfica */}
        <Hero />

        {/* Dobras subsequentes que sobem sobre a Hero cobrindo-a sem espaçamento em branco */}
        <div className="relative z-20 bg-bg shadow-[0_-28px_60px_rgba(10,10,14,0.45)]">
          {/* Dobra 2 — Agenda de Shows */}
          <AgendaSection items={showsData} />
          {/* Dobra 3 — História / A Artista */}
          <HistoriaSection />
          {/* Dobra 4 — Vídeos */}
          <VideosSection items={videosData} />
          {/* Dobra 5 — Galeria */}
          <GaleriaSection items={galleryData} />
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
