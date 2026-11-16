'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const IMAGES = [
  '/media/sobre-jojo/jojo-seq-0.webp', // Estado 0: Base P&B com Jojo colorida
  '/media/sobre-jojo/jojo-seq-1.webp', // Estado 1: Faixa 1 colorida
  '/media/sobre-jojo/jojo-seq-2.webp', // Estado 2: Faixa 2 colorida
  '/media/sobre-jojo/jojo-seq-3.webp', // Estado 3: Faixa 3 colorida
  '/media/sobre-jojo/jojo-seq-4.webp', // Estado 4: Faixa 4 colorida
];

function getLayerOpacity(
  p: number,
  inStart: number,
  inEnd: number,
  outStart: number,
  outEnd: number
) {
  if (p < inStart || p > outEnd) return 0;
  if (p >= inEnd && p <= outStart) return 1;
  if (p < inEnd) return (p - inStart) / (inEnd - inStart);
  return (outEnd - p) / (outEnd - outStart);
}

export function HistoriaSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pinState, setPinState] = useState<'before' | 'pinned' | 'after'>('before');
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

  // Monitora o scroll e trava o palco (pin) na tela durante a sequência de 5 estados
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
            setPinState('before');
            setScrollProgress(0);
            ticking = false;
            return;
          }

          // Ativo enquanto o topo da seção estiver na tela até o fim do scroll
          if (rect.top <= 0 && rect.bottom >= vh) {
            setPinState('pinned');
            const raw = -rect.top / totalDistance;
            setScrollProgress(Math.min(Math.max(raw, 0), 1));
          } else if (rect.top > 0) {
            setPinState('before');
            setScrollProgress(0);
          } else {
            setPinState('after');
            setScrollProgress(1);
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

  // Opacidade de cada uma das 4 faixas coloridas sobrepostas à imagem base 0
  const l1Opacity = getLayerOpacity(scrollProgress, 0.05, 0.20, 0.28, 0.40);
  const l2Opacity = getLayerOpacity(scrollProgress, 0.28, 0.42, 0.50, 0.62);
  const l3Opacity = getLayerOpacity(scrollProgress, 0.50, 0.64, 0.72, 0.84);
  const l4Opacity = getLayerOpacity(scrollProgress, 0.72, 0.86, 0.94, 1.00);

  return (
    <section
      ref={containerRef}
      id="historia"
      aria-label="A Artista — Jojo Mendes"
      className={cn(
        'relative w-full bg-bg text-text shadow-[0_-28px_60px_rgba(10,10,14,0.45)]',
        prefersReducedMotion ? 'min-h-screen py-12 flex items-center justify-center' : 'h-[320vh]'
      )}
    >
      <h2 className="sr-only">A Artista — Jojo Mendes</h2>

      {/* 
        Palco cinematográfico fixo durante a rolagem:
        - 'before': relativo no topo da dobra
        - 'pinned': travado no centro da tela (fixed inset-0 z-20)
        - 'after': absoluto no final da dobra (absolute bottom-0)
      */}
      <div
        className={cn(
          'w-full flex items-center justify-center overflow-hidden',
          prefersReducedMotion && 'relative min-h-screen',
          !prefersReducedMotion && pinState === 'before' && 'relative h-[100svh] w-full',
          !prefersReducedMotion && pinState === 'pinned' && 'fixed inset-0 z-20 h-[100svh] w-full',
          !prefersReducedMotion && pinState === 'after' && 'absolute bottom-0 left-0 h-[100svh] w-full z-20'
        )}
      >
        {/* Iluminação ambiente suave de fundo */}
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(239,193,107,0.05)_0%,transparent_70%)]"
          aria-hidden="true"
        />

        {/* ===================================================================
            COMPOSIÇÃO EDITORIAL CENTRALIZADA (1024 x 1536)
           =================================================================== */}
        <div className="relative z-10 flex items-center justify-center p-4 sm:p-6">
          <div
            className="relative aspect-[1024/1536] h-[78svh] sm:h-[84svh] max-h-[820px] w-auto select-none overflow-hidden rounded-2xl border border-white/10 bg-[#121115] shadow-[0_24px_70px_rgba(0,0,0,0.75)]"
            aria-hidden="true"
          >
            {/* Imagem 0 (Base oficial): Jojo em destaque colorida + 4 faixas em P&B */}
            <Image
              src={IMAGES[0]}
              alt="Jojo Mendes"
              fill
              sizes="(max-width: 1023px) 90vw, 680px"
              priority
              className="object-contain object-center"
            />

            {/* Imagem 1 (Faixa 1 colorida): surge e transiciona no scroll */}
            <Image
              src={IMAGES[1]}
              alt=""
              fill
              sizes="(max-width: 1023px) 90vw, 680px"
              priority
              style={{ opacity: l1Opacity }}
              className="pointer-events-none object-contain object-center transition-opacity duration-100 will-change-opacity"
            />

            {/* Imagem 2 (Faixa 2 colorida): surge e transiciona no scroll */}
            <Image
              src={IMAGES[2]}
              alt=""
              fill
              sizes="(max-width: 1023px) 90vw, 680px"
              priority
              style={{ opacity: l2Opacity }}
              className="pointer-events-none object-contain object-center transition-opacity duration-100 will-change-opacity"
            />

            {/* Imagem 3 (Faixa 3 colorida): surge e transiciona no scroll */}
            <Image
              src={IMAGES[3]}
              alt=""
              fill
              sizes="(max-width: 1023px) 90vw, 680px"
              priority
              style={{ opacity: l3Opacity }}
              className="pointer-events-none object-contain object-center transition-opacity duration-100 will-change-opacity"
            />

            {/* Imagem 4 (Faixa 4 colorida): surge e transiciona no scroll */}
            <Image
              src={IMAGES[4]}
              alt=""
              fill
              sizes="(max-width: 1023px) 90vw, 680px"
              priority
              style={{ opacity: l4Opacity }}
              className="pointer-events-none object-contain object-center transition-opacity duration-100 will-change-opacity"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
