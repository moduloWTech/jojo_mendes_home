'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, ArrowRight, PlayCircle } from 'lucide-react';
import { heroMedia } from '@/content/site';
import { copy, destinations } from '@/content/copy';

interface HeroDesktopProps {
  shouldShowVideo: boolean;
  videoSrc: string | null;
  onVideoError: () => void;
}

export function HeroDesktop({
  shouldShowVideo,
  videoSrc,
  onVideoError,
}: HeroDesktopProps) {
  return (
    <div
      data-testid="hero-desktop"
      className="relative z-10 hidden h-[100svh] max-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#EEF0F4] pt-[76px] pb-3 xl:flex"
    >
      {/* Container proporcional à arte recortada (1199x1144), dimensionado pela altura útil da dobra para caber 100% na tela */}
      <div className="relative mx-auto h-[calc(100svh-90px)] max-h-[860px] w-auto max-w-[94vw] aspect-[1199/1144] select-none">
        {/* Camada 0: Vídeo jojo_init_site.mp4 rodando exatamente dentro das letras EITA */}
        <div
          className="pointer-events-none absolute left-[28.6%] top-[21.9%] z-0 h-[37.7%] w-[67.2%] overflow-hidden bg-ink-950"
          aria-hidden="true"
        >
          {shouldShowVideo && videoSrc ? (
            <video
              key={`desktop-eita-${videoSrc}`}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={heroMedia.posterDesktop}
              onError={onVideoError}
              className="h-full w-full object-cover object-center contrast-105 saturate-105"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={heroMedia.posterDesktop}
              alt=""
              fill
              sizes="760px"
              className="object-cover object-center"
            />
          )}
        </div>

        {/* Camada 1: Arte principal em fundo claro (#EEF0F4) com letras EITA vazadas, mão da Jojo sobre o E, CANTIGA! e subtítulo original */}
        <Image
          src="/media/jojo/hero-desktop-frame.png"
          alt="Jojo Mendes — Eita Cantiga!"
          fill
          priority
          sizes="(min-width: 1280px) 85vh, 100vw"
          className="pointer-events-none relative z-10 object-contain"
        />

        {/* Texto semântico para leitores de tela (o subtítulo visual já integra a arte com sombra original) */}
        <p className="sr-only">
          {copy.hero.desktopTaglineLine1} {copy.hero.desktopTaglineLine2}
        </p>

        {/* Camada 2: Botões interativos posicionados na base direita com alto contraste sobre o fundo claro */}
        <div className="absolute left-[29.0%] right-[13.5%] bottom-[2.2%] z-20 flex items-center justify-center gap-3 2xl:gap-4">
          <Link
            href={destinations.booking}
            className="group inline-flex h-[44px] 2xl:h-[52px] flex-1 items-center justify-center gap-2.5 rounded-pill bg-gradient-to-b from-[#FAE084] via-[#EBB338] to-[#CE8814] px-5 2xl:px-7 text-[15px] 2xl:text-[17px] font-bold text-[#111115] shadow-[0_8px_20px_rgba(206,136,20,0.32)] transition-all duration-150 ease-out hover:brightness-105 hover:-translate-y-0.5 active:scale-[0.99]"
          >
            <CalendarDays
              className="h-4 w-4 2xl:h-5 2xl:w-5 shrink-0 text-[#111115]"
              strokeWidth={2}
              aria-hidden="true"
            />
            <span className="whitespace-nowrap">{copy.hero.primaryCta}</span>
            <ArrowRight
              className="h-4 w-4 2xl:h-5 2xl:w-5 shrink-0 text-[#111115] transition-transform duration-150 group-hover:translate-x-1"
              strokeWidth={2}
              aria-hidden="true"
            />
          </Link>

          <Link
            href={destinations.schedule}
            className="group inline-flex h-[44px] 2xl:h-[52px] flex-1 items-center justify-center gap-2.5 rounded-pill border border-[#1A1A22]/75 bg-white/55 px-5 2xl:px-7 text-[15px] 2xl:text-[17px] font-semibold text-[#111115] backdrop-blur-sm transition-all duration-150 ease-out hover:border-[#111115] hover:bg-[#111115] hover:text-[#FAF7F1] active:scale-[0.99]"
          >
            <PlayCircle
              className="h-4 w-4 2xl:h-5 2xl:w-5 shrink-0 text-current transition-transform duration-150 group-hover:scale-105"
              strokeWidth={2}
              aria-hidden="true"
            />
            <span className="whitespace-nowrap">{copy.hero.secondaryCta}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
