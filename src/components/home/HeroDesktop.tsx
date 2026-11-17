'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, ArrowRight, PlayCircle } from 'lucide-react';
import { heroMedia } from '@/content/site';
import { copy, destinations } from '@/content/copy';
import { cn } from '@/lib/utils';

interface HeroDesktopProps {
  shouldShowVideo: boolean;
  videoSrc: string | null;
  onVideoError: () => void;
  isRevealed?: boolean;
  scrollProgress?: number;
}

const EITA_MASK_STYLE: React.CSSProperties = {
  WebkitMaskImage: "url('/media/jojo/hero-desktop-eita-mask.png')",
  maskImage: "url('/media/jojo/hero-desktop-eita-mask.png')",
  WebkitMaskSize: '100% 100%',
  maskSize: '100% 100%',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
  maskPosition: 'center',
};

export function HeroDesktop({
  shouldShowVideo,
  videoSrc,
  onVideoError,
  isRevealed = true,
  scrollProgress = 0,
}: HeroDesktopProps) {
  // Apenas os botões se separam no scroll (arte permanece 100% estática)
  const progress = Math.min(Math.max(scrollProgress, 0), 1);
  const splitProgress = Math.pow(progress, 1.1);

  // Deslocamento dos botões (um para esquerda e outro para direita) em viewport width
  const btnShiftVw = splitProgress * 65;

  // Dissolve suavemente quando os botões atingem as margens da tela
  const btnOpacity = Math.max(1 - Math.max((progress - 0.75) / 0.25, 0), 0);

  return (
    <div
      data-testid="hero-desktop"
      className="relative z-10 hidden h-[100svh] max-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#ECEEF2] pt-[76px] pb-3 xl:flex"
    >
      {/* Camada 0 (Full-Screen): Vídeo jojo_init_site.mp4 no background com filtro suave */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        {shouldShowVideo && videoSrc ? (
          <video
            key={`desktop-bg-${videoSrc}`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={heroMedia.posterDesktop}
            onError={onVideoError}
            onTimeUpdate={(e) => {
              if (e.currentTarget.currentTime >= 7) {
                e.currentTarget.currentTime = 0;
                void e.currentTarget.play();
              }
            }}
            className="h-full w-full object-cover object-center grayscale contrast-110 opacity-[0.24] scale-[1.02]"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={heroMedia.posterDesktop}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center grayscale opacity-20"
          />
        )}

        {/* Véu atmosférico cinza-claro sobre o vídeo de fundo */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(246,247,250,0.52)_0%,rgba(234,236,241,0.80)_62%,rgba(218,222,230,0.93)_100%)]" />

        {/* Aura dourada sutil de palco */}
        <div
          className={cn(
            'absolute left-[28%] top-[18%] h-[420px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(239,193,107,0.24)_0%,rgba(239,193,107,0)_70%)] blur-2xl',
            isRevealed ? 'animate-hero-spotlight' : 'opacity-0'
          )}
        />
      </div>

      {/* Container central: arte de Jojo Mendes com EITA CANTIGA! intacta e estática */}
      <div
        className={cn(
          'relative z-10 mx-auto h-[calc(100svh-90px)] max-h-[860px] w-auto max-w-[94vw] aspect-[1199/1144] select-none',
          isRevealed ? 'animate-hero-stage' : 'opacity-0'
        )}
      >
        {/* Camada 1: Foto interna nas letras EITA + feixe único de brilho que passa sobre as letras */}
        <div
          style={EITA_MASK_STYLE}
          className="pointer-events-none absolute left-[28.6%] top-[21.85%] z-10 h-[37.85%] w-[67.7%] overflow-hidden bg-[#181416]"
          aria-hidden="true"
        >
          <Image
            src="/media/jojo/hero-desktop-eita-solo-v3.jpg"
            alt=""
            fill
            priority
            sizes="760px"
            className="object-cover object-center"
          />

          {/* Feixe único de brilho que cruza as letras EITA */}
          {isRevealed && (
            <div className="animate-hero-shine pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#FFF3C4]/30 to-transparent" />
          )}
        </div>

        {/* Camada 2: Arte principal com Jojo Mendes apoiada sobre o E e CANTIGA! em ouro (estática) */}
        <Image
          src="/media/jojo/hero-desktop-frame-v2.png"
          alt="Jojo Mendes — Eita Cantiga!"
          fill
          priority
          sizes="(min-width: 1280px) 85vh, 100vw"
          className="pointer-events-none relative z-20 object-contain"
        />

        {/* Texto semântico para leitores de tela */}
        <p className="sr-only">
          {copy.hero.desktopTaglineLine1} {copy.hero.desktopTaglineLine2}
        </p>

        {/* Camada 3: SOMENTE os botões se separam no scroll (um para a esquerda, outro para a direita) */}
        <div className="absolute left-[29.0%] right-[13.5%] bottom-[2.2%] z-30 flex items-center justify-center gap-3 2xl:gap-4 pointer-events-auto">
          {/* Botão 1: Desloca para a ESQUERDA no scroll */}
          <div
            style={{
              transform: `translate3d(-${btnShiftVw}vw, 0, 0)`,
              opacity: btnOpacity,
            }}
            className="flex-1 will-change-transform"
          >
            <Link
              href={destinations.booking}
              className={cn(
                'group relative inline-flex h-[44px] 2xl:h-[52px] w-full items-center justify-center gap-2.5 overflow-hidden rounded-pill bg-gradient-to-b from-[#FAE084] via-[#EBB338] to-[#CE8814] px-5 2xl:px-7 text-[15px] 2xl:text-[17px] font-bold text-[#111115] shadow-[0_8px_24px_rgba(206,136,20,0.38)] transition-all duration-200 ease-out hover:brightness-105 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(235,179,56,0.5)] active:scale-[0.98]',
                isRevealed ? 'animate-hero-cta-1' : 'opacity-0'
              )}
            >
              {isRevealed && (
                <span
                  aria-hidden="true"
                  className="animate-hero-shine pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/55 to-transparent"
                />
              )}
              <CalendarDays
                className="relative z-10 h-4 w-4 2xl:h-5 2xl:w-5 shrink-0 text-[#111115]"
                strokeWidth={2}
                aria-hidden="true"
              />
              <span className="relative z-10 whitespace-nowrap">
                {copy.hero.primaryCta}
              </span>
              <ArrowRight
                className="relative z-10 h-4 w-4 2xl:h-5 2xl:w-5 shrink-0 text-[#111115] transition-transform duration-200 group-hover:translate-x-1"
                strokeWidth={2}
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* Botão 2: Desloca para a DIREITA no scroll */}
          <div
            style={{
              transform: `translate3d(${btnShiftVw}vw, 0, 0)`,
              opacity: btnOpacity,
            }}
            className="flex-1 will-change-transform"
          >
            <Link
              href={destinations.schedule}
              className={cn(
                'group inline-flex h-[44px] 2xl:h-[52px] w-full items-center justify-center gap-2.5 rounded-pill border border-[#1A1A22]/75 bg-white/60 px-5 2xl:px-7 text-[15px] 2xl:text-[17px] font-semibold text-[#111115] backdrop-blur-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#111115] hover:bg-[#111115] hover:text-[#FAF7F1] active:scale-[0.98]',
                isRevealed ? 'animate-hero-cta-2' : 'opacity-0'
              )}
            >
              <PlayCircle
                className="h-4 w-4 2xl:h-5 2xl:w-5 shrink-0 text-current transition-transform duration-200 group-hover:scale-105"
                strokeWidth={2}
                aria-hidden="true"
              />
              <span className="whitespace-nowrap">{copy.hero.secondaryCta}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
