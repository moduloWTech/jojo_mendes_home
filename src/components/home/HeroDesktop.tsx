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
}: HeroDesktopProps) {
  return (
    <div
      data-testid="hero-desktop"
      className="relative z-10 hidden h-[100svh] max-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#ECEEF2] pt-[76px] pb-3 xl:flex"
    >
      {/* Camada 0 (Full-Screen): Vídeo jojo_init_site.mp4 rodando exclusivamente no background com filtro cinza-claro */}
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

        {/* Véu atmosférico cinza-claro sobre o vídeo de fundo para alto contraste */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(246,247,250,0.52)_0%,rgba(234,236,241,0.80)_62%,rgba(218,222,230,0.93)_100%)]" />
      </div>

      {/* Container central proporcional à arte recortada (1199x1144), cabendo 100% dentro da primeira dobra */}
      <div className="relative z-10 mx-auto h-[calc(100svh-90px)] max-h-[860px] w-auto max-w-[94vw] aspect-[1199/1144] select-none">
        {/* Camada 1: Foto enviada posicionada dentro das letras EITA (sem vídeo dentro das letras) */}
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
        </div>

        {/* Camada 2: Arte principal com Jojo Mendes apoiada sobre o E, vãos de EITA sólidos e CANTIGA! em ouro */}
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

        {/* Camada 3: Botões interativos na base direita */}
        <div className="absolute left-[29.0%] right-[13.5%] bottom-[2.2%] z-30 flex items-center justify-center gap-3 2xl:gap-4">
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
