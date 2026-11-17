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
  // - Primeiros 0.70vh: somente os botões se separam suavemente para as laterais enquanto a 2ª dobra aguarda
  // - A partir de 0.75vh até 1.75vh: a 2ª dobra sobe cobrindo a Hero
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const vh = window.innerHeight || 800;
          const currentY = window.scrollY;
          const buttonSeparationProgress = Math.min(
            Math.max(currentY / (vh * 0.7), 0),
            1
          );
          setScrollProgress(buttonSeparationProgress);
          setIsHeroCovered(currentY >= vh * 1.65);
          setIsPastHero(currentY > vh * 1.8);
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

  const mobileBgVideoSrc = heroMedia.videoMobile ?? heroMedia.videoDesktop;
  const desktopBgVideoSrc = heroMedia.videoDesktop ?? heroMedia.videoMobile;
  const shouldShowVideo =
    Boolean(desktopBgVideoSrc) && !prefersReducedMotion && !videoFailed;

  return (
    <>
      {/* Âncora inicial para navegação */}
      <div id="inicio" className="absolute top-0 left-0 h-px w-px pointer-events-none" aria-hidden="true" />

      {/* Dobra 1 — Palco cinematográfico fixo */}
      <section
        aria-label={copy.nav.home}
        style={{
          visibility: isPastHero ? 'hidden' : 'visible',
          pointerEvents: isHeroCovered ? 'none' : 'auto',
        }}
        className="fixed inset-0 z-10 h-[100svh] w-full overflow-hidden bg-[#ECEEF2]"
      >
        {/* Único H1 semântico da Home para leitores de tela e SEO */}
        <h1 className="sr-only">{copy.hero.srOnlyHeading}</h1>

        {/* Camada de vídeo de background cinza-claro para Mobile/Tablet (<1200px) */}
        <div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden xl:hidden"
          aria-hidden="true"
        >
          {shouldShowVideo && mobileBgVideoSrc ? (
            <video
              key={`mobile-bg-${mobileBgVideoSrc}`}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={heroMedia.posterMobile}
              onError={() => setVideoFailed(true)}
              onTimeUpdate={(e) => {
                if (e.currentTarget.currentTime >= 7) {
                  e.currentTarget.currentTime = 0;
                  void e.currentTarget.play();
                }
              }}
              className="h-full w-full object-cover object-center grayscale contrast-110 opacity-[0.24]"
            >
              <source src={mobileBgVideoSrc} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={heroMedia.posterMobile}
              alt={heroMedia.posterAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center grayscale opacity-20"
            />
          )}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(246,247,250,0.52)_0%,rgba(234,236,241,0.82)_65%,rgba(218,222,230,0.94)_100%)]" />
        </div>

        {/* Composição Mobile (<1200px) */}
        <HeroMobile
          isRevealed
          scrollProgress={prefersReducedMotion ? 0 : scrollProgress}
        />

        {/* Composição Desktop (>=1200px) */}
        <HeroDesktop
          shouldShowVideo={shouldShowVideo}
          videoSrc={desktopBgVideoSrc}
          onVideoError={() => setVideoFailed(true)}
          isRevealed
          scrollProgress={prefersReducedMotion ? 0 : scrollProgress}
        />
      </section>

      {/* Espaço reservado no fluxo do documento (175svh):
          - Primeiros 0.75vh: os botões se afastam para as laterais com a arte estática
          - Seguintes 1.00vh: a 2ª dobra sobe cobrindo a Hero */}
      <div className="h-[175svh] w-full pointer-events-none" aria-hidden="true" />
    </>
  );
}
