'use client';

import React from 'react';
import { copy } from '@/content/copy';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import type { Musician } from '@/types/site';
import { musicians as defaultMusicians } from '@/content/site';

/* =========================================================================
   SVG Illustration: Guitarrista + Amplificador + Monitor 1
   ========================================================================= */
function StageGuitarristaSvg() {
  return (
    <svg
      viewBox="0 0 220 270"
      className="w-full h-auto max-h-[260px] drop-shadow-lg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="ampMesh" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2c2c34" />
          <stop offset="100%" stopColor="#18181b" />
        </radialGradient>
        <linearGradient id="guitarBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eab308" />
          <stop offset="50%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#854d0e" />
        </linearGradient>
      </defs>

      {/* --- Amplificador de Guitarra (Fundo à esquerda) --- */}
      <g transform="translate(14, 28)">
        {/* Caixa acústica */}
        <rect
          x="0"
          y="0"
          width="54"
          height="64"
          rx="4"
          fill="#141418"
          stroke="#ca8a04"
          strokeWidth="1.2"
        />
        {/* Grade de tecido */}
        <rect
          x="4"
          y="18"
          width="46"
          height="41"
          rx="2"
          fill="url(#ampMesh)"
          stroke="#27272a"
          strokeWidth="1"
        />
        {/* Painel de controle superior */}
        <rect x="4" y="4" width="46" height="11" rx="1.5" fill="#202026" />
        <circle cx="10" cy="9.5" r="2" fill="#eab308" />
        <circle cx="17" cy="9.5" r="2" fill="#a1a1aa" />
        <circle cx="24" cy="9.5" r="2" fill="#a1a1aa" />
        <circle cx="31" cy="9.5" r="2" fill="#a1a1aa" />
        <circle cx="44" cy="9.5" r="2.2" fill="#ef4444" /> {/* LED Power */}
        {/* Ponto de Energia 127/220V */}
        <rect x="0" y="68" width="18" height="11" rx="2" fill="#27272a" stroke="#ca8a04" strokeWidth="0.8" />
        <path d="M9 70 L9 77" stroke="#eab308" strokeWidth="1" />
        <path d="M5 73.5 L13 73.5" stroke="#eab308" strokeWidth="1" />
        {/* Cabo de força saindo */}
        <path d="M18 73.5 Q24 74, 27 82" stroke="#71717a" strokeWidth="1.2" fill="none" />
      </g>

      {/* Sombra no palco */}
      <ellipse cx="118" cy="208" rx="44" ry="9" fill="rgba(0,0,0,0.6)" />

      {/* --- Músico: Guitarrista --- */}
      {/* Pernas / Calça preta */}
      <rect x="106" y="162" width="10" height="44" rx="4" fill="#18181b" />
      <rect x="120" y="162" width="10" height="44" rx="4" fill="#18181b" />
      <ellipse cx="111" cy="206" rx="6" ry="3" fill="#09090b" />
      <ellipse cx="125" cy="206" rx="6" ry="3" fill="#09090b" />

      {/* Tronco / Camisa preta com acabamento sutil */}
      <path
        d="M100 114 L136 114 L134 164 L102 164 Z"
        fill="#222228"
        stroke="#3f3f46"
        strokeWidth="1"
      />

      {/* Braço esquerdo (no braço da guitarra) */}
      <path
        d="M100 118 L76 132 L94 140"
        stroke="#222228"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="76" cy="132" r="4.5" fill="#e2b18d" />

      {/* Guitarra Elétrica Estilizada */}
      <g transform="translate(72, 116) rotate(-22)">
        {/* Braço da guitarra */}
        <rect x="0" y="14" width="56" height="4.5" fill="#fef08a" rx="1" />
        <rect x="-10" y="12" width="11" height="8" rx="1.5" fill="#713f12" />
        {/* Corpo da guitarra */}
        <path
          d="M52 4 C64 -4, 82 2, 86 16 C89 26, 78 36, 68 34 C58 32, 50 18, 52 4 Z"
          fill="url(#guitarBody)"
          stroke="#fef08a"
          strokeWidth="0.8"
        />
        {/* Escudo branco */}
        <path d="M58 8 C64 4, 74 8, 76 16 C76 22, 68 25, 62 21 Z" fill="#f4f4f5" />
        {/* Captadores */}
        <rect x="63" y="10" width="3" height="12" fill="#18181b" rx="0.5" />
        <rect x="69" y="10" width="3" height="12" fill="#18181b" rx="0.5" />
      </g>

      {/* Braço direito tocando */}
      <path
        d="M136 118 L142 136 L124 142"
        stroke="#222228"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="123" cy="142" r="4.5" fill="#e2b18d" />

      {/* Cabeça e Cabelo */}
      <ellipse cx="118" cy="100" rx="9" ry="11" fill="#e2b18d" />
      <path
        d="M109 98 C109 88, 127 88, 127 98 C126 95, 122 93, 118 93 C113 93, 110 95, 109 98 Z"
        fill="#18181b"
      />

      {/* Pedestal de Microfone */}
      <line x1="130" y1="210" x2="130" y2="108" stroke="#71717a" strokeWidth="2" />
      <line x1="120" y1="210" x2="140" y2="210" stroke="#71717a" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="130" cy="106" r="3.5" fill="#27272a" stroke="#d4d4d8" strokeWidth="1" />

      {/* --- Monitor de Chão (Via 1) --- */}
      <g transform="translate(74, 212)">
        {/* Caixa angular (Wedge) */}
        <polygon
          points="0,20 18,2 66,2 84,20"
          fill="#18181c"
          stroke="#3f3f46"
          strokeWidth="1.2"
        />
        <polygon points="4,18 20,4 64,4 80,18" fill="#24242c" />
        <text
          x="42"
          y="14"
          fill="#eab308"
          fontSize="7"
          fontWeight="bold"
          textAnchor="middle"
          letterSpacing="0.5"
        >
          MONITOR 1
        </text>
      </g>
    </svg>
  );
}

/* =========================================================================
   SVG Illustration: Jojo Mendes (Centro) + Voz Principal + Monitor 2
   ========================================================================= */
function StageJojoSvg() {
  return (
    <svg
      viewBox="0 0 220 270"
      className="w-full h-auto max-h-[260px] drop-shadow-xl"
      aria-hidden="true"
    >
      <defs>
        {/* Brilho dourado exclusivo da cantora principal */}
        <radialGradient id="jojoGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Halo de destaque no palco */}
      <circle cx="110" cy="130" r="78" fill="url(#jojoGlow)" />
      <ellipse cx="110" cy="208" rx="52" ry="11" fill="rgba(0,0,0,0.65)" />

      {/* --- Artista: Jojo Mendes --- */}
      {/* Pernas / Calça preta */}
      <rect x="98" y="164" width="10.5" height="44" rx="4" fill="#141416" />
      <rect x="112" y="164" width="10.5" height="44" rx="4" fill="#141416" />
      <ellipse cx="103" cy="208" rx="6.5" ry="3.5" fill="#0a0a0c" />
      <ellipse cx="117" cy="208" rx="6.5" ry="3.5" fill="#0a0a0c" />

      {/* Tronco / Roupa Preta com detalhes dourados */}
      <path
        d="M92 116 L128 116 L126 166 L94 166 Z"
        fill="#1c1c22"
        stroke="#ca8a04"
        strokeWidth="1.2"
      />

      {/* Cordão dourado característico */}
      <path
        d="M102 116 Q110 134, 118 116"
        stroke="#f59e0b"
        strokeWidth="1.8"
        fill="none"
      />
      <circle cx="110" cy="130" r="2.2" fill="#eab308" />

      {/* Braço esquerdo aberto (expressividade) */}
      <path
        d="M92 120 L72 136 L62 148"
        stroke="#1c1c22"
        strokeWidth="8.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="60" cy="150" r="5" fill="#e2b18d" />

      {/* Braço direito segurando o microfone */}
      <path
        d="M128 120 L136 136 L118 128"
        stroke="#1c1c22"
        strokeWidth="8.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="116" cy="127" r="5" fill="#e2b18d" />

      {/* Cabeça e Expressão */}
      <ellipse cx="110" cy="100" rx="9.5" ry="11.5" fill="#e2b18d" />
      {/* Cabelo */}
      <path d="M102 102 C101 114, 105 120, 107 122" stroke="#18181b" strokeWidth="3" fill="none" />

      {/* Boné Icônico de Jojo Mendes */}
      <path
        d="M100 98 C100 86, 120 86, 120 98 Z"
        fill="#141416"
        stroke="#ca8a04"
        strokeWidth="1"
      />
      {/* Aba do boné virada para frente */}
      <path
        d="M98 96 C105 94, 124 94, 131 99 C126 100, 102 100, 98 96 Z"
        fill="#1f1f23"
        stroke="#eab308"
        strokeWidth="0.8"
      />

      {/* Microfone Principal em mãos */}
      <line x1="114" y1="126" x2="108" y2="114" stroke="#52525b" strokeWidth="2.5" />
      <circle cx="107" cy="112" r="3.8" fill="#eab308" stroke="#71717a" strokeWidth="1" />

      {/* Pedestal Central */}
      <line x1="110" y1="210" x2="110" y2="132" stroke="#a1a1aa" strokeWidth="2" />
      <circle cx="110" cy="210" r="10" fill="#27272a" stroke="#ca8a04" strokeWidth="1.2" />

      {/* --- Monitor de Chão Central (Via 2 — Destaque Dourado) --- */}
      <g transform="translate(62, 212)">
        <polygon
          points="0,22 20,2 76,2 96,22"
          fill="#18181c"
          stroke="#eab308"
          strokeWidth="1.6"
        />
        <polygon points="5,20 22,4 74,4 91,20" fill="#26262e" />
        <text
          x="48"
          y="15"
          fill="#fef08a"
          fontSize="7.5"
          fontWeight="bold"
          textAnchor="middle"
          letterSpacing="0.8"
        >
          MONITOR 2 (JOJO)
        </text>
      </g>
    </svg>
  );
}

/* =========================================================================
   SVG Illustration: Tecladista + Teclado + DI + Monitor 3
   ========================================================================= */
function StageTecladistaSvg() {
  return (
    <svg
      viewBox="0 0 220 270"
      className="w-full h-auto max-h-[260px] drop-shadow-lg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="keybGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#27272a" />
          <stop offset="100%" stopColor="#18181b" />
        </linearGradient>
      </defs>

      {/* Sombra no palco */}
      <ellipse cx="105" cy="208" rx="46" ry="9" fill="rgba(0,0,0,0.6)" />

      {/* --- Músico: Tecladista --- */}
      {/* Pernas / Calça preta */}
      <rect x="94" y="162" width="10" height="44" rx="4" fill="#18181b" />
      <rect x="108" y="162" width="10" height="44" rx="4" fill="#18181b" />
      <ellipse cx="99" cy="206" rx="6" ry="3" fill="#09090b" />
      <ellipse cx="113" cy="206" rx="6" ry="3" fill="#09090b" />

      {/* Tronco / Camisa preta */}
      <path
        d="M88 114 L124 114 L122 164 L90 164 Z"
        fill="#222228"
        stroke="#3f3f46"
        strokeWidth="1"
      />

      {/* Cabeça e Cabelo */}
      <ellipse cx="106" cy="100" rx="9" ry="11" fill="#e2b18d" />
      <path
        d="M97 98 C97 88, 115 88, 115 98 C114 94, 110 93, 106 93 C101 93, 98 94, 97 98 Z"
        fill="#18181b"
      />

      {/* Braços estendidos tocando as teclas */}
      <path
        d="M88 118 L76 138 L88 148"
        stroke="#222228"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="89" cy="148" r="4.5" fill="#e2b18d" />

      <path
        d="M124 118 L136 138 L124 148"
        stroke="#222228"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="123" cy="148" r="4.5" fill="#e2b18d" />

      {/* --- Suporte em X do Teclado --- */}
      <line x1="68" y1="156" x2="142" y2="204" stroke="#71717a" strokeWidth="2.5" />
      <line x1="142" y1="156" x2="68" y2="204" stroke="#71717a" strokeWidth="2.5" />

      {/* --- Teclado / Sintetizador --- */}
      <g transform="translate(52, 142)">
        {/* Chassis do teclado */}
        <rect
          x="0"
          y="0"
          width="106"
          height="18"
          rx="2.5"
          fill="url(#keybGrad)"
          stroke="#ca8a04"
          strokeWidth="1.2"
        />
        {/* Painel com tela digital e botões */}
        <rect x="6" y="2" width="22" height="4" fill="#09090b" rx="1" />
        <rect x="8" y="3" width="8" height="2" fill="#38bdf8" />
        <circle cx="34" cy="4" r="1.5" fill="#eab308" />
        <circle cx="39" cy="4" r="1.5" fill="#a1a1aa" />
        {/* Teclas brancas */}
        <rect x="4" y="7" width="98" height="9" fill="#f4f4f5" rx="0.8" />
        {/* Teclas pretas */}
        {Array.from({ length: 14 }).map((_, i) => (
          <rect
            key={i}
            x={8 + i * 6.5}
            y="7"
            width="3"
            height="5.5"
            fill="#18181b"
          />
        ))}
      </g>

      {/* --- Direct Box (DI) & Conexão PA (À direita) --- */}
      <g transform="translate(164, 146)">
        <rect
          x="0"
          y="0"
          width="24"
          height="14"
          rx="2"
          fill="#1c1917"
          stroke="#f59e0b"
          strokeWidth="1"
        />
        <text
          x="12"
          y="10"
          fill="#fef08a"
          fontSize="6.5"
          fontWeight="bold"
          textAnchor="middle"
        >
          DI
        </text>
        {/* Cabo de áudio indo para PA */}
        <path d="M24 7 L38 7" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2,2" />
        <polygon points="38,4.5 44,7 38,9.5" fill="#38bdf8" />
        <text x="32" y="16" fill="#7dd3fc" fontSize="5" fontWeight="bold">
          PA
        </text>
      </g>

      {/* Pedestal de Microfone */}
      <line x1="82" y1="210" x2="82" y2="108" stroke="#71717a" strokeWidth="2" />
      <line x1="72" y1="210" x2="92" y2="210" stroke="#71717a" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="82" cy="106" r="3.5" fill="#27272a" stroke="#d4d4d8" strokeWidth="1" />

      {/* --- Monitor de Chão (Via 3) --- */}
      <g transform="translate(68, 212)">
        <polygon
          points="0,20 18,2 66,2 84,20"
          fill="#18181c"
          stroke="#3f3f46"
          strokeWidth="1.2"
        />
        <polygon points="4,18 20,4 64,4 80,18" fill="#24242c" />
        <text
          x="42"
          y="14"
          fill="#eab308"
          fontSize="7"
          fontWeight="bold"
          textAnchor="middle"
          letterSpacing="0.5"
        >
          MONITOR 3
        </text>
      </g>
    </svg>
  );
}

/* =========================================================================
   Componente Principal: MusicosSection
   ========================================================================= */
interface MusicosSectionProps {
  items?: Musician[];
}

export function MusicosSection({ items = defaultMusicians }: MusicosSectionProps) {
  return (
    <section
      id="musicos"
      aria-labelledby="musicos-heading"
      className="section-spacing bg-bg relative overflow-hidden"
    >
      {/* Texto de acessibilidade / compatibilidade de testes */}
      <span className="sr-only">{copy.musicians.emptyMessage}</span>

      <Container>
        <RevealOnScroll>
          <SectionHeading
            id="musicos-heading"
            eyebrow={copy.musicians.eyebrow}
            title={copy.musicians.title}
            description={copy.musicians.description}
          />

          {/* ===================================================================
              CONTAINER PRINCIPAL DO MAPA DE PALCO (Inspirado no estilo Gabriel Sacramento)
              =================================================================== */}
          <div className="rounded-2xl md:rounded-3xl border border-white/10 bg-[#121215]/95 p-4 sm:p-6 md:p-8 shadow-2xl backdrop-blur-sm">
            {/* Barra superior de identificação */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-4 mb-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#1c1c22] px-4 py-1.5 text-xs sm:text-sm font-medium text-zinc-300">
                <span className="inline-block h-2 w-2 rounded-full bg-gold animate-pulse" />
                {copy.musicians.stageMapDiagramTitle}
              </div>
              <span className="inline-block rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold-light tracking-wide uppercase">
                {copy.musicians.subtitle}
              </span>
            </div>

            {/* TABLADO / PALCO TÉCNICO ESCURO */}
            <div className="relative rounded-xl md:rounded-2xl border border-white/5 bg-gradient-to-b from-[#09090b] via-[#0f0f14] to-[#09090b] p-3 sm:p-6 md:p-8 overflow-hidden shadow-inner">
              {/* Iluminação de fundo cenográfica */}
              <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 h-64 w-80 sm:w-96 rounded-full bg-gold/10 blur-3xl" />

              {/* GRID DOS 3 MÚSICOS EM CENA */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 items-end justify-items-center">
                {/* 1. GUITARRISTA (Lado Esquerdo) */}
                <div className="w-full max-w-[260px] flex flex-col items-center text-center">
                  <StageGuitarristaSvg />
                  <div className="mt-2 flex flex-col items-center">
                    <span className="rounded-full border border-white/10 bg-[#27272a] px-3.5 py-1 text-xs md:text-sm font-semibold text-zinc-200 shadow-md">
                      Guitarrista
                    </span>
                    <span className="mt-1 text-[11px] md:text-xs text-zinc-400">
                      Guitarra & Backing Vocal
                    </span>
                  </div>
                </div>

                {/* 2. JOJO MENDES (Centro / Destaque) */}
                <div className="w-full max-w-[260px] flex flex-col items-center text-center">
                  <StageJojoSvg />
                  <div className="mt-2 flex flex-col items-center">
                    <span className="rounded-full border border-gold/40 bg-gold/15 px-4 py-1 text-xs md:text-sm font-bold text-gold-light shadow-lg shadow-gold/10">
                      Jojo Mendes
                    </span>
                    <span className="mt-1 text-[11px] md:text-xs font-medium text-gold/90">
                      Voz Principal
                    </span>
                  </div>
                </div>

                {/* 3. TECLADISTA (Lado Direito) */}
                <div className="w-full max-w-[260px] flex flex-col items-center text-center">
                  <StageTecladistaSvg />
                  <div className="mt-2 flex flex-col items-center">
                    <span className="rounded-full border border-white/10 bg-[#27272a] px-3.5 py-1 text-xs md:text-sm font-semibold text-zinc-200 shadow-md">
                      Tecladista
                    </span>
                    <span className="mt-1 text-[11px] md:text-xs text-zinc-400">
                      Teclado & Backing Vocal
                    </span>
                  </div>
                </div>
              </div>

              {/* BARRA: FRENTE DO PALCO / PÚBLICO */}
              <div className="relative z-10 mt-8 pt-4 border-t border-white/10 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-5 py-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-gold-light shadow-md shadow-gold/5">
                  <span className="text-gold">▼</span>
                  {copy.musicians.audienceLabel}
                  <span className="text-gold">▼</span>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
