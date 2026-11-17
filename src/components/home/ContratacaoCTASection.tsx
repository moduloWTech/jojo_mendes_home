import React from 'react';
import Link from 'next/link';
import { copy, destinations } from '@/content/copy';
import { Container } from '@/components/ui/Container';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { Sparkles, ArrowRight } from 'lucide-react';

/* =========================================================================
   SVG: Luminária Pendente Vintage em Gaiola Industrial (Estilo Pôster)
   ========================================================================= */
function VintageCageLamp({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 280"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.85" />
          <stop offset="35%" stopColor="#f59e0b" stopOpacity="0.4" />
          <stop offset="70%" stopColor="#d97706" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cageMetal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#78716c" />
          <stop offset="50%" stopColor="#44403c" />
          <stop offset="100%" stopColor="#1c1917" />
        </linearGradient>
      </defs>

      {/* Corrente descendo do teto */}
      <line
        x1="60"
        y1="0"
        x2="60"
        y2="140"
        stroke="#57534e"
        strokeWidth="2.5"
        strokeDasharray="4 3"
      />

      {/* Soquete industrial */}
      <rect
        x="52"
        y="138"
        width="16"
        height="18"
        rx="2"
        fill="url(#cageMetal)"
        stroke="#a8a29e"
        strokeWidth="0.8"
      />
      <line x1="50" y1="144" x2="70" y2="144" stroke="#d6d3d1" strokeWidth="1" />
      <line x1="50" y1="150" x2="70" y2="150" stroke="#d6d3d1" strokeWidth="1" />

      {/* Brilho radial quente do filamento */}
      <circle cx="60" cy="195" r="75" fill="url(#lampGlow)" />

      {/* Gaiola metálica industrial (Aros horizontais) */}
      <ellipse cx="60" cy="156" rx="18" ry="4" stroke="#a8a29e" strokeWidth="1.8" />
      <ellipse cx="60" cy="195" rx="26" ry="6" stroke="#ca8a04" strokeWidth="1.8" />
      <ellipse cx="60" cy="235" rx="14" ry="3.5" stroke="#a8a29e" strokeWidth="1.8" />

      {/* Costelas curvas da gaiola */}
      <path d="M42 156 Q34 195, 46 235" stroke="#78716c" strokeWidth="1.8" fill="none" />
      <path d="M52 156 Q44 195, 53 235" stroke="#ca8a04" strokeWidth="1.5" fill="none" />
      <line x1="60" y1="156" x2="60" y2="235" stroke="#eab308" strokeWidth="1.5" />
      <path d="M68 156 Q76 195, 67 235" stroke="#ca8a04" strokeWidth="1.5" fill="none" />
      <path d="M78 156 Q86 195, 74 235" stroke="#78716c" strokeWidth="1.8" fill="none" />

      {/* Bulbo incandescente interno */}
      <ellipse
        cx="60"
        cy="195"
        rx="14"
        ry="20"
        fill="#fef08a"
        fillOpacity="0.85"
        stroke="#fef08a"
        strokeWidth="1"
      />
      {/* Filamento em espiral */}
      <path
        d="M55 190 Q60 182, 65 190 Q60 198, 55 204 Q60 208, 65 204"
        stroke="#ea580c"
        strokeWidth="1.8"
        fill="none"
      />
      <circle cx="60" cy="195" r="3.5" fill="#ffffff" />
    </svg>
  );
}

/* =========================================================================
   Componente Principal: ContratacaoCTASection
   ========================================================================= */
export function ContratacaoCTASection() {
  return (
    <section
      id="contratar"
      aria-labelledby="contratar-heading"
      className="relative overflow-hidden bg-[#09090d] py-16 sm:py-20 md:py-24 xl:py-28 border-y border-amber-500/20"
    >
      {/* ===================================================================
          CENOGRAFIA DE PALCO & ILUMINAÇÃO QUENTE
          =================================================================== */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Feixe volumétrico superior central */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-96 sm:w-[600px] rounded-full bg-gradient-to-b from-amber-500/20 via-orange-600/10 to-transparent blur-3xl" />
        {/* Glows laterais sutis */}
        <div className="absolute top-1/2 -left-32 -translate-y-1/2 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute top-1/2 -right-32 -translate-y-1/2 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
        {/* Fundo gradiente de palco */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/20 via-[#0a0a0e] to-[#08080a]" />
      </div>

      {/* Luminárias pendentes vintage de filamento (gaiola industrial) */}
      <div className="pointer-events-none absolute -top-4 left-6 sm:left-14 md:left-24 z-10 w-20 sm:w-28 opacity-90 drop-shadow-[0_10px_20px_rgba(245,158,11,0.3)]">
        <VintageCageLamp className="w-full h-auto" />
      </div>
      <div className="pointer-events-none absolute -top-10 right-6 sm:right-14 md:right-24 z-10 w-18 sm:w-24 opacity-85 drop-shadow-[0_8px_16px_rgba(245,158,11,0.25)]">
        <VintageCageLamp className="w-full h-auto" />
      </div>

      <Container className="relative z-20">
        <RevealOnScroll>
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center pt-8 sm:pt-10">
            {/* Eyebrow de anúncio de show */}
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs sm:text-sm font-bold tracking-widest uppercase text-amber-300 mb-4 sm:mb-6 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" aria-hidden="true" />
              {copy.bookingBanner.eyebrow}
            </div>

            {/* TIPOGRAFIA EMPILHADA "CON / TRA / TE" */}
            <div
              className="select-none flex flex-col font-black tracking-tight uppercase leading-[0.85] text-7xl sm:text-8xl md:text-9xl xl:text-[140px]"
              aria-hidden="true"
            >
              {copy.bookingBanner.bigStackedWord.map((syllable, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-b from-[#fff2db] via-[#f59e0b] to-[#b45309] bg-clip-text text-transparent drop-shadow-[0_10px_25px_rgba(245,158,11,0.35)]"
                  style={{
                    WebkitTextStroke: '1px rgba(254, 240, 138, 0.25)',
                  }}
                >
                  {syllable}
                </span>
              ))}
            </div>

            {/* Texto de transição após CONTRATE */}
            <h2
              id="contratar-heading"
              className="mt-6 sm:mt-8 max-w-xl text-base sm:text-lg md:text-xl font-medium tracking-wide text-amber-100/90 uppercase leading-relaxed"
            >
              {copy.bookingBanner.title}
            </h2>

            {/* BOTÃO CTA (Diretamente após o texto) */}
            <div className="mt-8 sm:mt-10 w-full max-w-md">
              <Link
                href={destinations.booking}
                className="group relative inline-flex w-full items-center justify-center gap-3 rounded-xl border border-amber-400/50 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 px-7 py-4 text-base sm:text-lg font-bold text-ink-950 shadow-[0_10px_35px_rgba(245,158,11,0.4)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_15px_45px_rgba(245,158,11,0.55)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090d]"
              >
                <span>{copy.bookingBanner.cta}</span>
                <ArrowRight
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5"
                  aria-hidden="true"
                />
              </Link>
              <p className="mt-3.5 text-center text-xs text-zinc-400">
                {copy.bookingBanner.subtext}
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

export const BookingCTA = ContratacaoCTASection;
