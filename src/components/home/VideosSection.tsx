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
  X,
} from 'lucide-react';
import { videos as defaultVideos } from '@/content/site';
import { copy } from '@/content/copy';
import type { ArtistVideo } from '@/types/site';
import { Container } from '@/components/ui/Container';

interface VideosSectionProps {
  items?: ArtistVideo[];
}

const FALLBACK_COVERS = [
  '/media/jojo/foto-palco-noite.jpeg',
  '/media/jojo/foto-show-mesa.jpeg',
  '/media/jojo/foto-ensaio-violao.jpeg',
  '/media/jojo/foto-show-sorrindo.jpeg',
  '/media/jojo/foto-ensaio-cantando.jpeg',
];

export function VideosSection({ items = defaultVideos }: VideosSectionProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbErrors, setThumbErrors] = useState<Record<string, boolean>>({});

  const touchStartX = useRef<number | null>(null);

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

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? null;
    if (endX === null) return;
    const diff = touchStartX.current - endX;
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  // Estado vazio se não houver vídeos
  if (!items || items.length === 0 || !activeVideo) {
    return (
      <section
        id="videos"
        aria-labelledby="videos-heading"
        className="section-spacing bg-[#070509] text-white"
      >
        <Container>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest text-[#EFC16B] font-semibold">
              {copy.videos.eyebrow}
            </span>
            <h2
              id="videos-heading"
              className="text-3xl sm:text-4xl font-display font-bold text-white mt-2"
            >
              {copy.videos.title}
            </h2>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#0e0a16]/60 p-8 text-center max-w-xl mx-auto backdrop-blur-xl">
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
      className="relative min-h-[100svh] w-full overflow-hidden bg-gradient-to-b from-[#1a0815] via-[#0d0714] to-[#08070A] pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24 text-white flex flex-col justify-center scroll-mt-20"
    >
      {/* =====================================================================
          ATMOSFERA DE PALCO & ESTÚDIO (ILUMINAÇÃO DEGRADÊ VINHO/ROXO)
         ===================================================================== */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(186,24,68,0.22)_0%,rgba(65,18,80,0.15)_45%,transparent_75%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(239,193,107,0.08)_0%,transparent_70%)] blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative z-10 w-full max-w-6xl mx-auto px-3 sm:px-6">
        
        {/* ===================================================================
            CABEÇALHO EDITORIAL ESTILO SPOTIFY / JBL
           =================================================================== */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          
          {/* Badge Live Session com Equalizador Ativo */}
          <div className="inline-flex items-center gap-2.5 rounded-full bg-white/[0.06] border border-white/10 px-4 py-1.5 backdrop-blur-xl mb-3 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
            <span className="flex h-2 w-2 rounded-full bg-[#1DB954] animate-pulse" />
            <span className="text-[11px] font-semibold tracking-wider text-white/90 uppercase font-sans">
              Jojo Mendes · Canal Oficial YouTube
            </span>

            {/* Equalizador de áudio animado */}
            <div className="flex items-center gap-[2.5px] ml-1 pl-2 border-l border-white/15 h-3">
              <span className="w-[2px] bg-[#1DB954] rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-2" />
              <span className="w-[2px] bg-[#1DB954] rounded-full animate-[pulse_1.2s_ease-in-out_infinite] h-3.5" />
              <span className="w-[2px] bg-[#1DB954] rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-1.5" />
              <span className="w-[2px] bg-[#1DB954] rounded-full animate-[pulse_1.0s_ease-in-out_infinite] h-3" />
            </div>
          </div>

          {/* Título de Palco */}
          <h2
            id="videos-heading"
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight"
          >
            Sinta a Pressão do <span className="text-[#EFC16B]">Show ao Vivo</span>
          </h2>

          <p className="text-xs sm:text-sm text-white/60 font-sans mt-2 max-w-lg">
            Use as setas para trocar de vídeo ou clique no card central para dar o play.
          </p>
        </div>

        {/* ===================================================================
            3D COVER FLOW REAL COM NAVEGAÇÃO LATERAL POR SETAS
           =================================================================== */}
        <div className="relative w-full max-w-5xl mx-auto flex items-center justify-between gap-1 sm:gap-4 my-2">
          
          {/* Seta Esquerda Flutuante (posicionada fora do contexto 3D para clique imediato) */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Vídeo anterior"
            className="z-50 flex h-11 w-11 sm:h-13 sm:w-13 shrink-0 items-center justify-center rounded-full bg-black/85 border border-[#EFC16B]/60 text-[#EFC16B] hover:bg-[#EFC16B] hover:text-black hover:scale-110 active:scale-95 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.9)] focus-visible:outline-none cursor-pointer"
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={2.5} />
          </button>

          {/* Contêiner de Perspectiva 3D */}
          <div
            className="relative flex-1 h-[320px] sm:h-[370px] md:h-[410px] overflow-visible"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{ perspective: '1100px' }}
          >
            {items.map((video, index) => {
              const half = Math.floor(total / 2);
              let offset = (((index - selectedIndex + total + half) % total) - half);

              if (total === 2 && offset === 1 && index < selectedIndex) {
                offset = -1;
              }

              const isActive = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;
              const isFarLeft = offset < -1;
              const isFarRight = offset > 1;

              let transform = 'translate(-50%, -50%) translateZ(80px) rotateY(0deg) scale(1)';
              let zIndex = 30;
              let opacity = 1;
              let filter = 'blur(0px)';

              if (isActive) {
                transform = 'translate(-50%, -50%) translateZ(90px) rotateY(0deg) scale(1)';
                zIndex = 30;
                opacity = 1;
                filter = 'blur(0px)';
              } else if (isLeft) {
                transform =
                  'translate(-125%, -50%) translateZ(0px) rotateY(26deg) scale(0.85)';
                zIndex = 20;
                opacity = 0.7;
                filter = 'blur(0.5px)';
              } else if (isRight) {
                transform =
                  'translate(25%, -50%) translateZ(0px) rotateY(-26deg) scale(0.85)';
                zIndex = 20;
                opacity = 0.7;
                filter = 'blur(0.5px)';
              } else if (isFarLeft) {
                transform =
                  'translate(-180%, -50%) translateZ(-90px) rotateY(38deg) scale(0.72)';
                zIndex = 10;
                opacity = 0.35;
                filter = 'blur(1px)';
              } else if (isFarRight) {
                transform =
                  'translate(80%, -50%) translateZ(-90px) rotateY(-38deg) scale(0.72)';
                zIndex = 10;
                opacity = 0.35;
                filter = 'blur(1px)';
              }

              const thumbUrl = `https://i.ytimg.com/vi/${encodeURIComponent(
                video.youtubeId
              )}/hqdefault.jpg`;
              const isThumbFailed = thumbErrors[video.id];
              const coverImage = isThumbFailed
                ? (FALLBACK_COVERS[index % FALLBACK_COVERS.length] ?? '/media/jojo/foto-palco-noite.jpeg')
                : thumbUrl;

              const handleCardClick = (e: React.MouseEvent) => {
                e.stopPropagation();
                if (isActive) {
                  setIsPlaying(true);
                } else if (isLeft || isFarLeft) {
                  handlePrev();
                } else if (isRight || isFarRight) {
                  handleNext();
                } else {
                  handleSelect(index);
                }
              };

              return (
                <div
                  key={video.id}
                  style={{
                    transform,
                    zIndex,
                    opacity,
                    filter,
                    transition:
                      'transform 500ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms ease, filter 500ms ease',
                  }}
                  className={`absolute top-1/2 left-1/2 w-[220px] sm:w-[260px] md:w-[290px] h-[280px] sm:h-[330px] md:h-[360px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] ${
                    isActive
                      ? 'border-2 border-[#EFC16B] shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(239,193,107,0.35)] ring-1 ring-white/30'
                      : 'border border-white/15 hover:opacity-100 hover:border-white/40'
                  }`}
                >
                  {/* Se ativo e em reprodução: exibe o iframe do YouTube */}
                  {isActive && isPlaying ? (
                    <div className="relative h-full w-full bg-black">
                      <iframe
                        key={video.youtubeId}
                        src={embedUrl}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="h-full w-full border-0"
                      />
                      {/* Botão para fechar a reprodução e voltar para a capa */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPlaying(false);
                        }}
                        aria-label="Fechar vídeo"
                        className="absolute top-2 right-2 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-black/80 border border-white/20 text-white hover:bg-black transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    /* Botão de clique cobrindo todo o card */
                    <button
                      type="button"
                      onClick={handleCardClick}
                      aria-label={
                        isActive
                          ? `${copy.videos.playButtonLabel}: ${video.title}`
                          : `Ver vídeo ${index + 1}: ${video.title}`
                      }
                      className="relative h-full w-full group text-left cursor-pointer focus-visible:outline-none"
                    >
                      <Image
                        src={coverImage}
                        alt={video.title}
                        fill
                        sizes="(max-width: 640px) 240px, 300px"
                        onError={() =>
                          setThumbErrors((prev) => ({
                            ...prev,
                            [video.id]: true,
                          }))
                        }
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        priority={isActive}
                      />

                      {/* Gradiente escuro para legibilidade */}
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/20"
                        aria-hidden="true"
                      />

                      {/* Badge de vídeo demonstrativo quando aplicável */}
                      {video.isDemo && (
                        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                          <span className="rounded-full bg-black/80 border border-[#EFC16B]/60 px-2.5 py-1 text-[9px] sm:text-[10px] font-semibold text-[#EFC16B] backdrop-blur-md shadow-md">
                            {copy.videos.demoBadge}
                          </span>
                        </div>
                      )}

                      {/* Botão de Play Central */}
                      {isActive && (
                        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                          <span className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#EFC16B] text-black shadow-[0_0_25px_rgba(239,193,107,0.4)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#FAF7F1]">
                            <Play
                              className="h-6 w-6 sm:h-7 sm:w-7 fill-current translate-x-0.5"
                              strokeWidth={2}
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                      )}

                      {/* Informações da Capa do Álbum */}
                      <div className="absolute bottom-0 inset-x-0 p-4 z-10 text-center">
                        <p className="text-[10px] text-[#EFC16B] font-mono uppercase tracking-wider font-semibold">
                          Jojo Mendes · Faixa 0{index + 1}
                        </p>
                        <h3 className="font-display text-sm sm:text-base font-bold text-white truncate drop-shadow-md mt-0.5">
                          {video.title}
                        </h3>
                        <p className="text-[10px] text-white/50 font-sans mt-0.5">
                          {isActive ? 'Clique para assistir' : 'Clique para selecionar'}
                        </p>
                      </div>
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Seta Direita Flutuante */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Próximo vídeo"
            className="z-50 flex h-11 w-11 sm:h-13 sm:w-13 shrink-0 items-center justify-center rounded-full bg-black/85 border border-[#EFC16B]/60 text-[#EFC16B] hover:bg-[#EFC16B] hover:text-black hover:scale-110 active:scale-95 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.9)] focus-visible:outline-none cursor-pointer"
          >
            <ChevronRight className="h-6 w-6" strokeWidth={2.5} />
          </button>
        </div>

        {/* Indicadores de bolinhas clicáveis para escolher diretamente o vídeo */}
        <div className="flex items-center justify-center gap-2 mt-4 mb-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSelect(i)}
              aria-label={`Ir para o vídeo ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === selectedIndex
                  ? 'w-7 bg-[#EFC16B]'
                  : 'w-2 bg-white/25 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* ===================================================================
            FLOATING GLASS DOCK DO PLAYER
           =================================================================== */}
        <div className="max-w-2xl mx-auto mt-4 sm:mt-6 px-2">
          <div className="relative overflow-hidden rounded-full border border-white/15 bg-white/[0.06] p-2 sm:p-2.5 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.7)] flex items-center justify-between gap-2 sm:gap-4">
            
            {/* Controles de Reprodução: Voltar, Play/Pause central, Avançar */}
            <div className="flex items-center gap-1 sm:gap-1.5 pl-1 shrink-0">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Vídeo anterior"
                className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
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
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-[#EFC16B] text-black hover:bg-[#FAF7F1] transition-all shadow-[0_0_20px_rgba(239,193,107,0.4)] hover:scale-105 shrink-0 cursor-pointer"
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
                className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <SkipForward className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
              </button>
            </div>

            {/* Informações da Faixa / Miniatura e Título em foco */}
            <div className="min-w-0 flex-1 px-1 sm:px-2 flex items-center gap-2.5 sm:gap-3">
              <div className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-lg overflow-hidden border border-white/20 bg-black/50 shrink-0">
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
                    0{selectedIndex + 1}/0{total}
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
            ESPECIFICAÇÕES TÉCNICAS DE PALCO
           =================================================================== */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 max-w-xl mx-auto mt-10 sm:mt-12 pt-6 border-t border-white/10 text-center">
          
          <div className="flex flex-col items-center gap-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#EFC16B]">
              <Mic2 className="h-4 w-4" />
            </div>
            <p className="font-display text-xs font-bold text-white mt-0.5">
              100% Ao Vivo
            </p>
            <p className="text-[10px] text-white/45 font-sans">
              Sem playback
            </p>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#EFC16B]">
              <Music2 className="h-4 w-4" />
            </div>
            <p className="font-display text-xs font-bold text-white mt-0.5">
              Banda Completa
            </p>
            <p className="text-[10px] text-white/45 font-sans">
              Metais & Sanfona
            </p>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#EFC16B]">
              <Volume2 className="h-4 w-4" />
            </div>
            <p className="font-display text-xs font-bold text-white mt-0.5">
              Pressão Sonora
            </p>
            <p className="text-[10px] text-white/45 font-sans">
              Som de Arena
            </p>
          </div>

        </div>

      </Container>
    </section>
  );
}
