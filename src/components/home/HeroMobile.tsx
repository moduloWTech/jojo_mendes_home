'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, ArrowRight, PlayCircle } from 'lucide-react';
import { copy, destinations } from '@/content/copy';
import { cn } from '@/lib/utils';

interface HeroMobileProps {
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

export function HeroMobile({
  isRevealed = true,
  scrollProgress = 0,
}: HeroMobileProps) {
  // A separação dos botões acompanha o scroll
  const progress = Math.min(Math.max(scrollProgress, 0), 1);
  const splitProgress = Math.pow(progress, 1.1);

  // Deslocamento dos botões (um para esquerda e outro para direita) em viewport width
  const btnShiftVw = splitProgress * 120;

  // Dissolve suavemente quando os botões saem da tela
  const btnOpacity = Math.max(1 - Math.max((progress - 0.75) / 0.25, 0), 0);

  return (
    <div
      data-testid="hero-mobile"
      className="relative z-10 flex h-[100svh] max-h-[100svh] w-full flex-col items-center justify-between overflow-hidden px-4 pt-[72px] pb-[max(20px,calc(env(safe-area-inset-bottom)+14px))] xl:hidden"
    >
      {/* Bloco inferior com os CTAs na parte de baixo da dobra */}
      <div className="relative z-30 mt-auto mb-4 sm:mb-6 flex w-full max-w-[350px] sm:max-w-[380px] flex-col gap-3">
        <p className="sr-only">
          {copy.hero.desktopTaglineLine1} {copy.hero.desktopTaglineLine2}
        </p>
        {/* Botão 1: Desloca para a ESQUERDA no scroll */}
        <div
          style={{
            transform: `translate3d(-${btnShiftVw}vw, 0, 0)`,
            opacity: btnOpacity,
          }}
          className="w-full will-change-transform"
        >
          <Link
            href={destinations.booking}
            className={cn(
              'group relative inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 overflow-hidden rounded-pill bg-gradient-to-b from-[#FAE084] via-[#EBB338] to-[#CE8814] px-6 text-[16px] font-bold text-[#111115] shadow-[0_8px_20px_rgba(206,136,20,0.35)] transition-all duration-150 ease-out active:scale-[0.98]',
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
              className="relative z-10 h-4 w-4 shrink-0 text-[#111115]"
              strokeWidth={2}
              aria-hidden="true"
            />
            <span className="relative z-10">{copy.hero.primaryCta}</span>
            <ArrowRight
              className="relative z-10 h-4 w-4 shrink-0 text-[#111115]"
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
          className="w-full will-change-transform"
        >
          <Link
            href={destinations.schedule}
            className={cn(
              'group inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-pill border border-white/30 bg-black/45 px-6 text-[16px] font-semibold text-[#FAF7F1] backdrop-blur-md transition-all duration-150 ease-out hover:border-white hover:bg-white hover:text-[#111115] active:scale-[0.98]',
              isRevealed ? 'animate-hero-cta-2' : 'opacity-0'
            )}
          >
            <PlayCircle
              className="h-4 w-4 shrink-0 text-current"
              strokeWidth={2}
              aria-hidden="true"
            />
            <span>{copy.hero.secondaryCta}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
