'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, PlayCircle, ChevronDown } from 'lucide-react';
import { copy, destinations } from '@/content/copy';

interface HeroDesktopProps {
  shouldShowVideo?: boolean;
  videoSrc?: string | null;
  onVideoError?: () => void;
  isRevealed?: boolean;
  scrollProgress?: number;
}

export function HeroDesktop({
  scrollProgress = 0,
}: HeroDesktopProps) {
  const progress = Math.min(Math.max(scrollProgress, 0), 1);
  const opacity = Math.max(1 - progress * 1.5, 0);
  const translateY = progress * 40;

  return (
    <div
      data-testid="hero-desktop"
      style={{
        opacity,
        transform: `translate3d(0, -${translateY}px, 0)`,
      }}
      className="relative z-10 hidden h-[100svh] max-h-[100svh] w-full flex-col items-center justify-between overflow-hidden px-8 pt-[96px] pb-8 xl:flex will-change-transform"
    >
      {/* Espaçador superior invisível */}
      <div className="h-6 w-full" aria-hidden="true" />

      {/* BLOCO CENTRAL: LOGO + BALÃO + CTAs */}
      <div className="flex w-full max-w-[480px] flex-col items-center text-center my-auto">
        {/* 1. Logotipo Oficial da Jojo Mendes */}
        <div className="relative w-[380px] 2xl:w-[440px] aspect-[866/288] mb-6 drop-shadow-[0_12px_35px_rgba(234,179,8,0.35)] transition-transform duration-300 hover:scale-[1.02]">
          <Image
            src="/media/jojo/logo-oficial.png"
            alt="Jojo Mendes — Eita Cantiga!"
            fill
            priority
            sizes="480px"
            className="object-contain"
          />
        </div>

        {/* 2. O Balão (Pill Badge) */}
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-black/70 px-6 py-2.5 text-sm font-semibold tracking-wide text-gold-light backdrop-blur-md shadow-2xl shadow-black/70 mb-8">
          <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
          <span>{copy.hero.pillBadge}</span>
        </div>

        {/* 3. Os CTAs (Botões em Cápsula / Pill) */}
        <div className="flex w-full max-w-[360px] flex-col gap-3.5">
          {/* Botão 1: Agendar Show */}
          <Link
            href={destinations.booking}
            className="group relative inline-flex min-h-[52px] w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#d97706] via-[#f59e0b] to-[#b45309] px-8 text-[17px] font-bold text-[#09090b] shadow-[0_10px_30px_rgba(245,158,11,0.4)] transition-all duration-200 ease-out hover:scale-[1.02] hover:brightness-105 hover:shadow-[0_14px_38px_rgba(245,158,11,0.55)] active:scale-[0.98]"
          >
            <CalendarDays
              className="h-5 w-5 text-[#09090b]"
              strokeWidth={2.2}
              aria-hidden="true"
            />
            <span>{copy.hero.primaryCta}</span>
          </Link>

          {/* Botão 2: Ver agenda */}
          <Link
            href={destinations.schedule}
            className="group inline-flex min-h-[52px] w-full items-center justify-center gap-3 rounded-full border border-white/20 bg-white/10 px-8 text-[17px] font-semibold text-white backdrop-blur-md transition-all duration-200 ease-out hover:bg-white/18 hover:border-white/30 active:scale-[0.98]"
          >
            <PlayCircle
              className="h-5 w-5 text-white/90"
              strokeWidth={2}
              aria-hidden="true"
            />
            <span>{copy.hero.secondaryCta}</span>
          </Link>
        </div>
      </div>

      {/* Indicador de Scroll no rodapé */}
      <div className="flex flex-col items-center gap-1.5 text-zinc-400/80 animate-bounce cursor-pointer">
        <span className="text-[12px] uppercase tracking-widest text-zinc-400 font-medium">
          {copy.hero.scrollText}
        </span>
        <ChevronDown className="h-4 w-4 text-zinc-400" />
      </div>
    </div>
  );
}
