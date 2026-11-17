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
  // A separação dos botões acompanha o scroll
  const progress = Math.min(Math.max(scrollProgress, 0), 1);
  // Transição com aceleração gradual para afastar os botões
  const splitProgress = Math.pow(progress, 1.1);

  // Deslocamento dos botões (um para esquerda e outro para direita) em viewport width
  const btnShiftVw = splitProgress * 65;

  // Dissolve suavemente quando os botões atingem as bordas da tela
  const btnOpacity = Math.max(1 - Math.max((progress - 0.75) / 0.25, 0), 0);

  return (
    <div
      data-testid="hero-desktop"
      className="relative z-10 hidden h-[100svh] max-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#0B0B0E] pt-[76px] pb-3 xl:flex"
    >
      {/* Camada 0 (Full-Screen): Vídeo de background com máscara preta transparente */}
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
            className="h-full w-full object-cover object-center opacity-85 scale-[1.02]"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={heroMedia.posterDesktop}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center opacity-50"
          />
        )}

        {/* Máscara preta translúcida calibrada: centro bem visível e base com contraste para os CTAs */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50" />

        {/* Aura dourada sutil de palco */}
        <div
          className={cn(
            'absolute left-[28%] top-[18%] h-[420px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(239,193,107,0.18)_0%,rgba(239,193,107,0)_70%)] blur-2xl',
            isRevealed ? 'animate-hero-spotlight' : 'opacity-0'
          )}
        />
      </div>

      {/* Container inferior dos CTAs (parte de baixo da dobra) */}
      <div
        className={cn(
          'relative z-20 mx-auto flex h-full w-full max-w-[580px] flex-col items-center justify-end pb-12 2xl:pb-16 px-4 select-none',
          isRevealed ? 'animate-hero-stage' : 'opacity-0'
        )}
      >
        {/* Texto semântico para leitores de tela */}
        <p className="sr-only">
          {copy.hero.desktopTaglineLine1} {copy.hero.desktopTaglineLine2}
        </p>

        {/* Camada dos Botões: se separam no scroll (Agendar para a esquerda, Ver agenda para a direita) */}
        <div className="flex w-full items-center justify-center gap-3.5 2xl:gap-5 pointer-events-auto">
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
                'group relative inline-flex h-[48px] 2xl:h-[56px] w-full items-center justify-center gap-2.5 overflow-hidden rounded-pill bg-gradient-to-b from-[#FAE084] via-[#EBB338] to-[#CE8814] px-6 2xl:px-8 text-[16px] 2xl:text-[18px] font-bold text-[#111115] shadow-[0_8px_24px_rgba(206,136,20,0.38)] transition-all duration-200 ease-out hover:brightness-105 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(235,179,56,0.5)] active:scale-[0.98]',
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
                'group inline-flex h-[48px] 2xl:h-[56px] w-full items-center justify-center gap-2.5 rounded-pill border border-white/30 bg-black/45 px-6 2xl:px-8 text-[16px] 2xl:text-[18px] font-semibold text-[#FAF7F1] backdrop-blur-md transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-[#111115] active:scale-[0.98]',
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
