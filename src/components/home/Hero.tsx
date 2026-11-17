'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { heroMedia } from '@/content/site';
import { copy } from '@/content/copy';
import { HeroMobile } from '@/components/home/HeroMobile';
import { HeroDesktop } from '@/components/home/HeroDesktop';

export function Hero() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isHeroCovered, setIsHeroCovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function'
    ) {
      return;
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const onMotionChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    motionQuery.addEventListener('change', onMotionChange);

    return () => {
      motionQuery.removeEventListener('change', onMotionChange);
    };
  }, []);

  // Progresso do scroll:
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const vh = window.innerHeight || 800;
          const currentY = window.scrollY;
          const progress = Math.min(Math.max(currentY / (vh * 0.8), 0), 1);
          setScrollProgress(progress);
          setIsHeroCovered(currentY >= vh * 1.5);
          setIsPastHero(currentY > vh * 1.7);
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
  }, []);

  const bgVideoSrc = heroMedia.videoDesktop ?? heroMedia.videoMobile;
  const shouldShowVideo =
    Boolean(bgVideoSrc) && !prefersReducedMotion && !videoFailed;

  return (
    <>
      {/* Âncora inicial para navegação */}
      <div id="inicio" className="absolute top-0 left-0 h-px w-px pointer-events-none" aria-hidden="true" />

      {/* Dobra 1 — Palco cinematográfico fixo (Dark Theme inspirado em Gabriel Sacramento) */}
      <section
        aria-label={copy.nav.home}
        style={{
          visibility: isPastHero ? 'hidden' : 'visible',
          pointerEvents: isHeroCovered ? 'none' : 'auto',
        }}
        className="fixed inset-0 z-10 h-[100svh] w-full overflow-hidden bg-[#070609]"
      >
        {/* Único H1 semântico da Home para leitores de tela e SEO */}
        <h1 className="sr-only">{copy.hero.srOnlyHeading}</h1>

        {/* Camada de vídeo de fundo cinematográfico de show */}
        <div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
          aria-hidden="true"
        >
          {shouldShowVideo && bgVideoSrc ? (
            <video
              key={`hero-bg-${bgVideoSrc}`}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={heroMedia.posterDesktop}
              onError={() => setVideoFailed(true)}
              className="h-full w-full object-cover object-center opacity-45 brightness-95"
            >
              <source src={bgVideoSrc} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={heroMedia.posterDesktop}
              alt={heroMedia.posterAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-35"
            />
          )}

          {/* Vinheta escura cinematográfica com acabamento sofisticado */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#08070A]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,rgba(0,0,0,0.85)_100%)]" />
        </div>

        {/* Composição Mobile (<1200px) */}
        <HeroMobile
          isRevealed
          scrollProgress={prefersReducedMotion ? 0 : scrollProgress}
        />

        {/* Composição Desktop (>=1200px) */}
        <HeroDesktop
          isRevealed
          scrollProgress={prefersReducedMotion ? 0 : scrollProgress}
        />
      </section>

      {/* Espaço reservado no fluxo do documento (150svh) para rolagem suave */}
      <div className="h-[150svh] w-full pointer-events-none" aria-hidden="true" />
    </>
  );
}
