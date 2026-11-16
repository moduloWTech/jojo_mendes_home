'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ExternalLink,
  Mic2,
  Music2,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Radio,
} from 'lucide-react';
import { videos as defaultVideos } from '@/content/site';
import { copy } from '@/content/copy';
import type { ArtistVideo } from '@/types/site';
import { Container } from '@/components/ui/Container';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

interface VideosSectionProps {
  items?: ArtistVideo[];
}

export function VideosSection({ items = defaultVideos }: VideosSectionProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbErrors, setThumbErrors] = useState<Record<string, boolean>>({});

  // Suporte a toque (swipe) no mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = items.length;
  const activeVideo = items[selectedIndex] ?? items[0];

  const handleSelect = useCallback(
    (index: number) => {
      if (index === selectedIndex) {
        setIsPlaying(true);
        return;
      }
      setSelectedIndex(index);
      setIsPlaying(false);
    },
    [selectedIndex]
  );

  const handlePrev = useCallback(() => {
    if (total === 0) return;
    setSelectedIndex((prev) => (prev - 1 + total) % total);
    setIsPlaying(false);
  }, [total]);

  const handleNext = useCallback(() => {
    if (total === 0) return;
    setSelectedIndex((prev) => (prev + 1) % total);
    setIsPlaying(false);
  }, [total]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 45; // pixels mínimos para swipe
    if (diff > threshold) {
      handleNext();
    } else if (diff < -threshold) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Se a lista de vídeos estiver vazia
  if (!items || items.length === 0 || !activeVideo) {
    return (
      <section
        id="videos"
        aria-labelledby="videos-heading"
        className="section-spacing bg-[#08070A] text-white"
      >
        <Container>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest text-[#EFC16B] font-semibold">
              {copy.videos.eyebrow}
            </span>
            <h2
              id="videos-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mt-2"
            >
              {copy.videos.title}
            </h2>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#0c0a14]/60 p-8 md:p-12 text-center max-w-xl mx-auto backdrop-blur-xl">
            <p className="font-display text-xl text-white">
              {copy.videos.emptyTitle}
            </p>
            <p className="text-sm text-white/60 mt-2">
              {copy.videos.emptyDescription}
            </p>
          </div>
        </Container>
      </section>
    );
  }

  const youtubeWatchUrl = `https://www.youtube.com/watch?v=${encodeURIComponent(
    activeVideo.youtubeId
  )}`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(
    activeVideo.youtubeId
  )}?autoplay=1&rel=0`;

  return (
    <section
      id="videos"
      aria-labelledby="videos-heading"
      className="relative overflow-hidden bg-gradient-to-b from-[#08070A] via-[#160a13] via-40% to-[#08070A] py-20 sm:py-24 lg:py-28 text-white select-none"
    >
      {/* =====================================================================
          LUZES ATMOSFÉRICAS DE PALCO / SHOW (ESTILO IMAGEM 01)
         ===================================================================== */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(176,28,73,0.18)_0%,transparent_70%)] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-[350px] w-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(239,193,107,0.1)_0%,transparent_70%)] blur-2xl"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <RevealOnScroll>
          {/* ===================================================================
              CABEÇALHO EDITORIAL DE PALCO (ESTILO IMAGEM 01)
             =================================================================== */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            
            {/* Pílula Flutuante Musical com Ondas Sonoras / Audio Waveform */}
            <div className="inline-flex items-center gap-2.5 rounded-full bg-[#EFC16B]/10 border border-[#EFC16B]/30 px-4 py-1.5 backdrop-blur-md mb-5 shadow-[0_0_25px_rgba(239,193,107,0.15)]">
              <span className="flex h-2 w-2 rounded-full bg-[#EFC16B] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-[#EFC16B] uppercase font-sans">
                {copy.videos.eyebrow}
              </span>
              
              {/* Equalizador de áudio animado (ondas sonoras) */}
              <div className="flex items-center gap-[3px] ml-1 pl-2.5 border-l border-white/15 h-3.5">
                <span className="w-[2.5px] bg-[#EFC16B] rounded-full animate-[pulse_1s_ease-in-out_infinite] h-2.5" />
                <span className="w-[2.5px] bg-[#EFC16B] rounded-full animate-[pulse_1.4s_ease-in-out_infinite] h-3.5" />
                <span className="w-[2.5px] bg-[#EFC16B] rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-2" />
                <span className="w-[2.5px] bg-[#EFC16B] rounded-full animate-[pulse_1.2s_ease-in-out_infinite] h-3" />
              </div>
            </div>

            {/* Título de Impacto */}
            <h2
              id="videos-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight"
            >
              Sinta a Energia do <span className="text-[#EFC16B]">Show ao Vivo</span>
            </h2>

            <p className="text-xs sm:text-sm lg:text-base text-white/60 font-sans mt-3 max-w-xl">
              Assista aos momentos mais marcantes da turnê, sinta a pressão da banda e a vibração única de Jojo Mendes no palco.
            </p>
          </div>

          {/* ===================================================================
              3D COVER FLOW CAROUSEL (ESTILO IMAGEM 02)
             =================================================================== */}
          <div
            className="relative w-full max-w-5xl mx-auto py-4 sm:py-6"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Contêiner de Perspectiva 3D */}
            <div
              className="relative h-[240px] sm:h-[340px] md:h-[400px] lg:h-[430px] w-full flex items-center justify-center"
              style={{ perspective: '1200px' }}
            >
              {items.map((video, index) => {
                // Cálculo de deslocamento circular
                const half = Math.floor(total / 2);
                const offset =
                  (((index - selectedIndex + total + half) % total) - half);

                const isActive = offset === 0;
                const isLeft = offset === -1 || (total === 2 && offset === 1 && index < selectedIndex);
                const isRight = offset === 1 || (total === 2 && offset === -1 && index > selectedIndex);
                const isHidden = Math.abs(offset) > 1 && total > 3;

                if (isHidden) return null;

                // Parâmetros 3D para Desktop vs Mobile
                let transformStyle = '';
                let zIndex = 10;
                let opacity = 0.4;
                let filter = 'blur(1px)';

                if (isActive) {
                  transformStyle = 'translateX(0%) translateZ(60px) rotateY(0deg) scale(1)';
                  zIndex = 30;
                  opacity = 1;
                  filter = 'blur(0px)';
                } else if (isLeft) {
                  transformStyle =
                    'translateX(-52%) sm:translateX(-58%) translateZ(0px) rotateY(24deg) scale(0.84)';
                  zIndex = 20;
                  opacity = 0.55;
                  filter = 'blur(0.5px)';
                } else if (isRight) {
                  transformStyle =
                    'translateX(52%) sm:translateX(58%) translateZ(0px) rotateY(-24deg) scale(0.84)';
                  zIndex = 20;
                  opacity = 0.55;
                  filter = 'blur(0.5px)';
                }

                const thumbUrl = `https://i.ytimg.com/vi/${encodeURIComponent(
                  video.youtubeId
                )}/hqdefault.jpg`;
                const isThumbFailed = thumbErrors[video.id];

                return (
                  <div
                    key={video.id}
                    onClick={() => handleSelect(index)}
                    style={{
                      transform: transformStyle,
                      zIndex,
                      opacity,
                      filter,
                      transition:
                        'transform 500ms cubic-bezier(0.25, 1, 0.5, 1), opacity 500ms ease, filter 500ms ease',
                    }}
                    className={`absolute w-[86%] sm:w-[74%] md:w-[68%] lg:w-[620px] aspect-video rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer ${
                      isActive
                        ? 'border-2 border-[#EFC16B]/60 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_40px_rgba(239,193,107,0.25)] ring-1 ring-white/20'
                        : 'border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.7)] hover:opacity-75'
                    }`}
                  >
                    {/* Quando ativo e em reprodução: exibe o iframe do YouTube */}
                    {isActive && isPlaying ? (
                      <iframe
                        key={video.youtubeId}
                        src={embedUrl}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="h-full w-full border-0 rounded-2xl sm:rounded-3xl"
                      />
                    ) : (
                      /* Capa com Thumbnail e Botão de Play Central */
                      <div className="relative h-full w-full group">
                        {!isThumbFailed ? (
                          <Image
                            src={thumbUrl}
                            alt={video.title}
                            fill
                            sizes="(max-width: 768px) 90vw, 620px"
                            onError={() =>
                              setThumbErrors((prev) => ({
                                ...prev,
                                [video.id]: true,
                              }))
                            }
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-[#1c111e] via-[#0b0811] to-[#200c17] flex items-center justify-center">
                            <Radio className="h-12 w-12 text-[#EFC16B]/40" />
                          </div>
                        )}

                        {/* Vinheta escura cinematográfica para leitura */}
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/30 group-hover:via-black/20 transition-colors"
                          aria-hidden="true"
                        />

                        {/* Badge de vídeo demonstrativo (requisito acessível e de teste) */}
                        {video.isDemo && (
                          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                            <span className="rounded-full bg-black/75 border border-[#EFC16B]/60 px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold text-[#EFC16B] backdrop-blur-md shadow-md">
                              {copy.videos.demoBadge}
                            </span>
                          </div>
                        )}

                        {/* Botão de Play Central (requisito acessível do teste) */}
                        {isActive && (
                          <div className="absolute inset-0 flex items-center justify-center z-20">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsPlaying(true);
                              }}
                              aria-label={`${copy.videos.playButtonLabel}: ${video.title}`}
                              className="group/btn relative flex h-14 w-14 sm:h-18 sm:w-18 items-center justify-center rounded-full bg-[#EFC16B] text-black shadow-[0_0_30px_rgba(239,193,107,0.5)] transition-all duration-300 hover:scale-110 hover:bg-[#FAF7F1] focus-visible:outline-none"
                            >
                              {/* Anel pulsante decorativo */}
                              <span className="absolute -inset-2 rounded-full border border-[#EFC16B]/40 animate-ping pointer-events-none" />
                              <Play
                                className="h-6 w-6 sm:h-7 sm:w-7 fill-current translate-x-0.5"
                                strokeWidth={2}
                                aria-hidden="true"
                              />
                              <span className="sr-only">
                                {copy.videos.playButtonLabel}
                              </span>
                            </button>
                          </div>
                        )}

                        {/* Barra inferior de título e legenda do vídeo */}
                        <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-5 z-10 flex items-end justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-[10px] sm:text-xs text-[#EFC16B] font-mono uppercase tracking-wider font-semibold">
                              Vídeo 0{index + 1} · Ao Vivo
                            </p>
                            <h3 className="font-display text-sm sm:text-base md:text-lg font-bold text-white truncate drop-shadow-md">
                              {video.title}
                            </h3>
                          </div>

                          {isActive && (
                            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-medium text-white/70 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shrink-0">
                              <span>Assistir ao vivo</span>
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Setas discretas para navegação lateral rápida */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Vídeo anterior"
              className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-40 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/60 border border-white/15 text-white/80 backdrop-blur-md hover:bg-black/90 hover:text-white hover:scale-105 transition-all shadow-lg focus-visible:outline-none"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Próximo vídeo"
              className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-40 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/60 border border-white/15 text-white/80 backdrop-blur-md hover:bg-black/90 hover:text-white hover:scale-105 transition-all shadow-lg focus-visible:outline-none"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          {/* ===================================================================
              FLOATING GLASS PLAYER DOCK (ESTILO IMAGEM 02)
             =================================================================== */}
          <div className="max-w-2xl mx-auto mt-6 sm:mt-8 px-2">
            <div className="relative overflow-hidden rounded-full border border-white/15 bg-[#0c0a14]/75 p-2 sm:p-2.5 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex items-center justify-between gap-2 sm:gap-4">
              
              {/* Controles de Mídia: Voltar, Play/Pause, Avançar */}
              <div className="flex items-center gap-1 sm:gap-1.5 pl-1.5 sm:pl-2 shrink-0">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Vídeo anterior"
                  className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <SkipBack className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                </button>

                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={
                    isPlaying
                      ? 'Pausar vídeo'
                      : `${copy.videos.playButtonLabel}: ${activeVideo.title}`
                  }
                  className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-[#EFC16B] text-black hover:bg-[#FAF7F1] transition-all shadow-[0_0_20px_rgba(239,193,107,0.4)] hover:scale-105 shrink-0"
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5 fill-current" />
                  ) : (
                    <Play className="h-5 w-5 fill-current translate-x-0.5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Próximo vídeo"
                  className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <SkipForward className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                </button>
              </div>

              {/* Informações da Faixa / Vídeo em Foco */}
              <div className="min-w-0 flex-1 px-1 sm:px-2 flex items-center gap-2.5 sm:gap-3">
                <div className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-lg overflow-hidden border border-white/15 bg-black/50 shrink-0">
                  <Image
                    src={`https://i.ytimg.com/vi/${encodeURIComponent(
                      activeVideo.youtubeId
                    )}/default.jpg`}
                    alt={activeVideo.title}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-[#EFC16B] font-semibold">
                      0{selectedIndex + 1}/{total}
                    </span>
                    {activeVideo.isDemo && (
                      <span className="text-[9px] text-[#EFC16B]/80 font-mono hidden sm:inline">
                        • {copy.videos.demoBadge}
                      </span>
                    )}
                  </div>
                  <p className="font-display text-xs sm:text-sm font-semibold text-white truncate">
                    {activeVideo.title}
                  </p>
                </div>
              </div>

              {/* Botão Oficial para Assistir no YouTube */}
              <div className="pr-1.5 sm:pr-2 shrink-0">
                <a
                  href={youtubeWatchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-medium text-white transition-all hover:scale-105"
                >
                  <span className="hidden sm:inline">
                    {copy.videos.watchOnYoutubeCta}
                  </span>
                  <span className="sm:hidden">YouTube</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

            </div>
          </div>

          {/* ===================================================================
              ESPECIFICAÇÕES DO SHOW AO VIVO (ESTILO IMAGEM 01)
             =================================================================== */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto mt-12 sm:mt-14 pt-8 border-t border-white/10">
            
            {/* Spec 01: Ao Vivo */}
            <div className="flex items-center gap-3.5 rounded-2xl bg-white/[0.03] border border-white/5 p-3.5 sm:p-4 backdrop-blur-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EFC16B]/10 border border-[#EFC16B]/20 text-[#EFC16B]">
                <Mic2 className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-xs sm:text-sm font-bold text-white">
                  100% Ao Vivo
                </p>
                <p className="text-[11px] text-white/50 font-sans">
                  Sem playback, entrega total da cantora
                </p>
              </div>
            </div>

            {/* Spec 02: Banda Completa */}
            <div className="flex items-center gap-3.5 rounded-2xl bg-white/[0.03] border border-white/5 p-3.5 sm:p-4 backdrop-blur-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EFC16B]/10 border border-[#EFC16B]/20 text-[#EFC16B]">
                <Music2 className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-xs sm:text-sm font-bold text-white">
                  Banda Completa
                </p>
                <p className="text-[11px] text-white/50 font-sans">
                  Sanfona, metais, percussão e coro
                </p>
              </div>
            </div>

            {/* Spec 03: Pressão Sonora */}
            <div className="flex items-center gap-3.5 rounded-2xl bg-white/[0.03] border border-white/5 p-3.5 sm:p-4 backdrop-blur-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EFC16B]/10 border border-[#EFC16B]/20 text-[#EFC16B]">
                <Volume2 className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-xs sm:text-sm font-bold text-white">
                  Pressão Sonora
                </p>
                <p className="text-[11px] text-white/50 font-sans">
                  Estrutura técnica para grandes arenas
                </p>
              </div>
            </div>

          </div>

        </RevealOnScroll>
      </Container>
    </section>
  );
}
