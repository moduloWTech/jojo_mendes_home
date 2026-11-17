'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, PlayCircle, ChevronDown } from 'lucide-react';
import { copy, destinations } from '@/content/copy';

interface HeroMobileProps {
  isRevealed?: boolean;
  scrollProgress?: number;
}

export function HeroMobile({
  isRevealed = true,
  scrollProgress = 0,
}: HeroMobileProps) {
  const progress = Math.min(Math.max(scrollProgress, 0), 1);
  const opacity = Math.max(1 - progress * 1.6, 0);
  const translateY = progress * 35;

  return (
    <div
      data-testid="hero-mobile"
      style={{
        opacity,
        transform: `translate3d(0, -${translateY}px, 0)`,
      }}
      className="relative z-10 flex h-[100svh] max-h-[100svh] w-full flex-col items-center justify-between overflow-hidden px-5 pt-[88px] pb-6 xl:hidden will-change-transform"
    >
      {/* Espaçador superior para equilíbrio de centro */}
      <div className="h-4 w-full" aria-hidden="true" />

      {/* BLOCO CENTRAL: LOGO + BALÃO + CTAs */}
      <div className="flex w-full max-w-[340px] sm:max-w-[380px] flex-col items-center text-center my-auto">
        {/* 1. Logotipo Oficial da Jojo Mendes */}
        <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[866/288] mb-5 sm:mb-6 drop-shadow-[0_10px_30px_rgba(234,179,8,0.35)]">
          <Image
            src="/media/jojo/logo-oficial.png"
            alt="Jojo Mendes — Eita Cantiga!"
            fill
            priority
            sizes="(max-width: 640px) 280px, 320px"
            className="object-contain"
          />
        </div>

        {/* 2. O Balão (Pill Badge) */}
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-black/65 px-4 sm:px-5 py-2 text-xs sm:text-[13px] font-semibold tracking-wide text-gold-light backdrop-blur-md shadow-xl shadow-black/60 mb-7 sm:mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
          <span>{copy.hero.pillBadge}</span>
        </div>

        {/* 3. Os CTAs (Botões em Cápsula / Pill) */}
        <div className="flex w-full flex-col gap-3">
          {/* Botão 1: Agendar Show */}
          <Link
            href={destinations.booking}
            className="group relative inline-flex min-h-[50px] w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#d97706] via-[#f59e0b] to-[#b45309] px-6 text-[16px] font-bold text-[#09090b] shadow-[0_8px_25px_rgba(245,158,11,0.35)] transition-all duration-200 active:scale-[0.98] hover:brightness-105"
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
            className="group inline-flex min-h-[50px] w-full items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-6 text-[16px] font-semibold text-white backdrop-blur-md transition-all duration-200 hover:bg-white/15 active:scale-[0.98]"
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
      <div className="flex flex-col items-center gap-1 text-zinc-400/80 animate-bounce">
        <span className="text-[11px] uppercase tracking-widest text-zinc-400 font-medium">
          {copy.hero.scrollText}
        </span>
        <ChevronDown className="h-4 w-4 text-zinc-400" />
      </div>
    </div>
  );
}
