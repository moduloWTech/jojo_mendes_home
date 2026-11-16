'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { copy } from '@/content/copy';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils';
import { Sparkles, Quote, ArrowDown } from 'lucide-react';

interface TypographicAct {
  id: string;
  number: string;
  keyword: string;
  tagline: string;
  headline: string;
  quote: string;
  range: [number, number];
}

const ACTS: TypographicAct[] = [
  {
    id: 'raiz',
    number: '01',
    keyword: 'RAIZ',
    tagline: 'O Primeiro Acorde',
    headline: 'Nasci com a cantiga no sangue',
    quote:
      'Comecei cantando na escola, com o violão no colo e o coração batendo no compasso da música nordestina. Ali eu já sabia: o palco era o meu destino.',
    range: [0.06, 0.28],
  },
  {
    id: 'estrada',
    number: '02',
    keyword: 'ESTRADA',
    tagline: 'A Primeira Banda',
    headline: 'A escola da poeira e do asfalto',
    quote:
      'A primeira banda que montei me ensinou o que nenhuma faculdade ensina: van na estrada, ensaio até de madrugada e o poder de segurar uma multidão no peito.',
    range: [0.28, 0.50],
  },
  {
    id: 'encontros',
    number: '03',
    keyword: 'ENCONTROS',
    tagline: 'Parcerias & Mestres',
    headline: 'Gente especial que moldou o som',
    quote:
      'Tive o privilégio de dividir notas e abraços com mestres extraordinários. Cada parceria deixou uma marca eterna na minha voz e no meu jeito de fazer forró.',
    range: [0.50, 0.72],
  },
  {
    id: 'entrega',
    number: '04',
    keyword: 'ENTREGA',
    tagline: 'O Show Ao Vivo',
    headline: 'Tudo de mim em cada verso',
    quote:
      'Pra mim não existe palco pequeno nem plateia fria. Sejam dez ou dez mil pessoas, a entrega é total: deixo o meu suor, minha voz e minha alma no palco.',
    range: [0.72, 0.95],
  },
];

export function HistoriaSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function'
    ) {
      return;
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const onMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    motionQuery.addEventListener('change', onMotionChange);
    return () => motionQuery.removeEventListener('change', onMotionChange);
  }, []);

  // Monitora o scroll contínuo e mapeia para 0.0 a 1.0
  useEffect(() => {
    if (prefersReducedMotion) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false;
            return;
          }

          const rect = containerRef.current.getBoundingClientRect();
          const vh = window.innerHeight || 800;
          const totalDistance = rect.height - vh;

          if (totalDistance <= 0) {
            setScrollProgress(0);
            ticking = false;
            return;
          }

          if (rect.top <= 0) {
            const raw = -rect.top / totalDistance;
            setScrollProgress(Math.min(Math.max(raw, 0), 1));
          } else {
            setScrollProgress(0);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [prefersReducedMotion]);

  // Função para calcular a opacidade suave senoidal de cada ato
  const computeActOpacity = (start: number, end: number) => {
    if (prefersReducedMotion) return 1;
    if (scrollProgress < start || scrollProgress > end) return 0;
    const t = (scrollProgress - start) / (end - start);
    return Math.max(0, Math.min(1, Math.sin(t * Math.PI)));
  };

  // Determina qual ato está ativo no momento
  let activeActIndex = 0;
  if (scrollProgress >= 0.72) {
    activeActIndex = 3;
  } else if (scrollProgress >= 0.50) {
    activeActIndex = 2;
  } else if (scrollProgress >= 0.28) {
    activeActIndex = 1;
  } else {
    activeActIndex = 0;
  }

  const activeAct = ACTS[activeActIndex] ?? ACTS[0];

  // Deslocamento horizontal em parallax das palavras gigantes de fundo
  // Move-se suavemente de 8vw para -8vw ao longo de cada ato
  const wordParallaxOffset = (0.5 - (scrollProgress % 0.25) / 0.25) * 16;

  return (
    <section
      ref={containerRef}
      id="historia"
      aria-label={copy.nav.history}
      className={cn(
        'relative w-full bg-[#0A090D] text-text shadow-[0_-28px_60px_rgba(10,10,14,0.45)]',
        prefersReducedMotion ? 'min-h-screen py-16' : 'h-[380vh]'
      )}
    >
      <h2 className="sr-only">A Artista — Jojo Mendes</h2>

      {/* 
        Palco fixo (sticky) que encaixa abaixo do header:
        Permanece travado no viewport enquanto o usuário rola pelos 380vh de trajetória.
      */}
      <div
        className={cn(
          'w-full flex flex-col justify-between overflow-hidden',
          prefersReducedMotion
            ? 'relative min-h-screen py-12'
            : 'sticky top-0 h-[100svh] max-h-[100svh] pt-[76px] pb-5'
        )}
      >
        {/* ===================================================================
            CAMADA 0: PALAVRAS GIGANTES VAZADAS EM PARALLAX NO FUNDO
            (Garganta tipográfica monumental estilo editorial internacional)
           =================================================================== */}
        <div
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden select-none"
          aria-hidden="true"
        >
          {ACTS.map((act) => {
            const opacity = computeActOpacity(act.range[0], act.range[1]);
            return (
              <div
                key={`bg-word-${act.id}`}
                style={{
                  opacity: prefersReducedMotion ? 0.08 : opacity * 0.18,
                  transform: prefersReducedMotion
                    ? 'none'
                    : `translate3d(${wordParallaxOffset}vw, 0, 0)`,
                }}
                className="absolute inset-x-0 flex items-center justify-center transition-opacity duration-200 will-change-transform"
              >
                <span
                  className="font-display font-extrabold text-[24vw] sm:text-[20vw] tracking-tighter leading-none uppercase text-transparent [-webkit-text-stroke:2px_#EFC16B] text-stroke-primary"
                >
                  {act.keyword}
                </span>
              </div>
            );
          })}

          {/* Halo dourado e vinheta ambiente */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(239,193,107,0.08)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_0%,rgba(10,9,13,0.88)_100%)]" />
        </div>

        {/* ===================================================================
            BARRA DE TOPO: Eyebrow e Marcador dos 4 Atos
           =================================================================== */}
        <Container className="relative z-20 w-full px-6 pt-3 sm:pt-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
              <p className="type-eyebrow text-primary text-xs sm:text-sm tracking-widest uppercase font-semibold">
                A Artista • {activeAct.tagline}
              </p>
            </div>

            {/* Marcadores dos 4 Atos */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2" aria-hidden="true">
                {ACTS.map((act, i) => (
                  <span
                    key={act.id}
                    className={cn(
                      'font-display text-xs sm:text-sm font-bold transition-all duration-300',
                      i === activeActIndex
                        ? 'text-primary scale-110'
                        : 'text-white/30'
                    )}
                  >
                    {act.number}
                  </span>
                ))}
              </div>
              <span className="font-display text-sm font-bold text-primary hidden sm:inline">
                {activeAct.keyword}
              </span>
            </div>
          </div>
        </Container>

        {/* ===================================================================
            CORPO PRINCIPAL:
            - Esquerda/Centro: Frase e Depoimento Autobiográfico em destaque
            - Direita/Centro: Jojo Recortada imponente com sombra de palco
           =================================================================== */}
        <Container className="relative z-10 flex-1 flex items-center w-full px-6 my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 xl:gap-12 w-full">
            {/* 
              COLUNA ESQUERDA (Texto Tipográfico do Ato):
              Muda suavemente a cada trecho da rolagem
            */}
            <div className="lg:col-span-7 xl:col-span-7 relative min-h-[260px] sm:min-h-[280px] flex items-center">
              {ACTS.map((act) => {
                const opacity = computeActOpacity(act.range[0], act.range[1]);
                const isCurrent = act.id === activeAct.id;

                if (!prefersReducedMotion && opacity <= 0.01) return null;

                return (
                  <article
                    key={act.id}
                    style={{
                      opacity: prefersReducedMotion ? (isCurrent ? 1 : 0) : opacity,
                      transform: prefersReducedMotion
                        ? 'none'
                        : `translate3d(0, ${(1 - opacity) * 18}px, 0)`,
                    }}
                    className={cn(
                      'transition-all duration-200',
                      !prefersReducedMotion && 'absolute inset-x-0'
                    )}
                  >
                    {/* Badge do Ato */}
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/25 px-3 py-1 mb-4 text-xs font-bold text-primary tracking-wider uppercase">
                      <span>Ato {act.number}</span>
                      <span className="text-white/40">•</span>
                      <span>{act.tagline}</span>
                    </div>

                    {/* Manchete Principal do Ato */}
                    <h3 className="font-display text-3xl sm:text-4xl xl:text-5xl font-bold text-text mb-5 leading-tight tracking-tight">
                      {act.headline}
                    </h3>

                    {/* Citação autobiográfica da Jojo */}
                    <div className="relative pl-5 sm:pl-6 border-l-2 border-primary/60">
                      <Quote
                        className="pointer-events-none absolute -left-3 -top-2 h-6 w-6 text-primary/40 select-none"
                        aria-hidden="true"
                      />
                      <p className="type-body-lg text-[#E6E8EE] text-base sm:text-lg xl:text-xl leading-relaxed italic">
                        “{act.quote}”
                      </p>
                    </div>

                    {/* Assinatura */}
                    <div className="mt-6 flex items-center gap-2 text-xs text-text-muted">
                      <span className="font-semibold text-primary">— Jojo Mendes</span>
                      <span className="text-white/30">•</span>
                      <span className="text-white/50 text-[11px]">Voz, paixão e forró</span>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* 
              COLUNA DIREITA: A Jojo Recortada (Âncora Visual Absoluta)
              Fica em primeiro plano com microfone e iluminação realista
            */}
            <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end select-none">
              <div className="relative h-[55svh] sm:h-[64svh] xl:h-[75svh] max-h-[700px] aspect-[1118/1600] filter drop-shadow-[0_24px_50px_rgba(0,0,0,0.85)]">
                {/* Sombra de palco nos pés */}
                <div className="absolute -bottom-3 left-1/2 h-8 w-[65%] -translate-x-1/2 rounded-full bg-black/80 blur-md" />

                <Image
                  src="/media/jojo/jojo-recorte-solo.png"
                  alt="Jojo Mendes cantora"
                  fill
                  priority
                  sizes="(max-width: 1023px) 60vw, 480px"
                  className="object-contain object-bottom"
                />
              </div>
            </div>
          </div>
        </Container>

        {/* ===================================================================
            BARRA DE BASE: Dica de navegação e continuidade
           =================================================================== */}
        <Container className="relative z-20 w-full px-6">
          <div className="flex items-center justify-between text-xs text-text-muted/60 border-t border-white/5 pt-2.5">
            <span className="flex items-center gap-1.5">
              <ArrowDown className="h-3 w-3 text-primary animate-bounce" aria-hidden="true" />
              Role para acompanhar os 4 atos da trajetória
            </span>
            <span>Agenda de shows logo abaixo ↓</span>
          </div>
        </Container>
      </div>
    </section>
  );
}
