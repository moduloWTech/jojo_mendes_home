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
  // A separação dos elementos acompanha o scroll enquanto a segunda dobra sobe
  const progress = Math.min(Math.max(scrollProgress, 0), 1);
  // Transição com aceleração gradual para afastar os elementos
  const splitProgress = Math.pow(progress, 1.15);

  // Deslocamento horizontal no mobile
  const leftShiftPct = splitProgress * 120;
  const rightShiftPct = splitProgress * 120;

  // Deslocamento dos botões (um para esquerda e outro para direita) em viewport width
  const btnShiftVw = splitProgress * 125;

  // Os elementos ficam 100% visíveis enquanto se deslocam e a 2ª dobra passa por cima
  const artworkOpacity = progress >= 1 ? 0 : 1;
  const btnOpacity = progress >= 1 ? 0 : 1;

  return (
    <div
      data-testid="hero-mobile"
      className="relative z-10 flex h-[100svh] max-h-[100svh] w-full flex-col items-center justify-between overflow-hidden px-4 pt-[72px] pb-[max(20px,calc(env(safe-area-inset-bottom)+14px))] xl:hidden"
    >
      {/* Bloco central com separação horizontal em scroll */}
      <div
        className={cn(
          'relative my-auto w-full max-w-[370px] sm:max-w-[430px] max-h-[calc(100svh-228px)] aspect-[1199/1144] select-none',
          isRevealed ? 'animate-hero-stage' : 'opacity-0'
        )}
      >
        {/* Camada Esquerda: Cantora apoiada + Letras EITA (desloca para a ESQUERDA no scroll) */}
        <div
          style={{
            transform: `translate3d(-${leftShiftPct}%, 0, 0)`,
            opacity: artworkOpacity,
          }}
          className="pointer-events-none absolute inset-0 z-20 will-change-transform"
        >
          {/* Foto solo da Jojo dentro das letras EITA */}
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
              sizes="(max-width: 767px) 70vw, 320px"
              className="object-cover object-center"
            />
            {isRevealed && (
              <div className="animate-hero-shine pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#FFF3C4]/30 to-transparent" />
            )}
          </div>

          {/* Recorte da Jojo apoiada no E e moldura do EITA */}
          <Image
            src="/media/jojo/hero-split-jojo-eita.png"
            alt="Jojo Mendes — Eita"
            fill
            priority
            sizes="(max-width: 767px) 92vw, 430px"
            className="pointer-events-none relative z-20 object-contain"
          />
        </div>

        {/* Camada Direita: Palavra CANTIGA! em ouro + Frase (desloca para a DIREITA no scroll) */}
        <div
          style={{
            transform: `translate3d(${rightShiftPct}%, 0, 0)`,
            opacity: artworkOpacity,
          }}
          className="pointer-events-none absolute inset-0 z-10 will-change-transform"
        >
          <Image
            src="/media/jojo/hero-split-cantiga.png"
            alt="Cantiga!"
            fill
            priority
            sizes="(max-width: 767px) 92vw, 430px"
            className="pointer-events-none object-contain"
          />
        </div>

        <p className="sr-only">
          {copy.hero.desktopTaglineLine1} {copy.hero.desktopTaglineLine2}
        </p>
      </div>

      {/* Bloco inferior: Os 2 CTAs empilhados se separando no scroll */}
      <div className="relative z-30 flex w-full max-w-[350px] sm:max-w-[380px] flex-col gap-2.5">
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
              'group inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-pill border border-[#1A1A22]/75 bg-white/65 px-6 text-[16px] font-semibold text-[#111115] backdrop-blur-sm transition-all duration-150 ease-out active:scale-[0.98]',
              isRevealed ? 'animate-hero-cta-2' : 'opacity-0'
            )}
          >
            <PlayCircle
              className="h-4 w-4 shrink-0 text-[#111115]"
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
