'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { heroMedia } from '@/content/site';
import { copy } from '@/content/copy';
import { HeroMobile } from '@/components/home/HeroMobile';
import { HeroDesktop } from '@/components/home/HeroDesktop';
import { cn } from '@/lib/utils';

type IntroPhase = 'playing' | 'transitioning' | 'done';

export function Hero() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [introPhase, setIntroPhase] = useState<IntroPhase>('playing');
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function'
    ) {
      return;
    }

    const viewportQuery = window.matchMedia('(max-width: 1199px)');
    setIsMobileViewport(viewportQuery.matches);
    const onViewportChange = (e: MediaQueryListEvent) => {
      setIsMobileViewport(e.matches);
    };
    viewportQuery.addEventListener('change', onViewportChange);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      setPrefersReducedMotion(true);
      setIntroPhase('done');
    }

    const onMotionChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
      if (event.matches) {
        setIntroPhase('done');
      }
    };
    motionQuery.addEventListener('change', onMotionChange);

    return () => {
      viewportQuery.removeEventListener('change', onViewportChange);
      motionQuery.removeEventListener('change', onMotionChange);
    };
  }, []);

  const triggerHeroTransition = () => {
    setIntroPhase((prev) => {
      if (prev !== 'playing') return prev;
      return 'transitioning';
    });
  };

  // Quando entra em 'transitioning', aguarda 0,8s (800ms) da transição suave e desmonta o overlay de abertura
  useEffect(() => {
    if (introPhase !== 'transitioning') return;
    const timer = setTimeout(() => {
      setIntroPhase('done');
    }, 800);
    return () => clearTimeout(timer);
  }, [introPhase]);

  // Fallback de segurança caso o navegador bloqueie o autoplay (5.5s cobre o trecho de 5s mobile e 4s desktop)
  useEffect(() => {
    if (introPhase !== 'playing') return;
    const safetyTimer = setTimeout(() => {
      triggerHeroTransition();
    }, 5600);
    return () => clearTimeout(safetyTimer);
  }, [introPhase]);

  const introVideoSrc = isMobileViewport
    ? '/media/jojo/jojo_intro_mobile_5_10.mp4'
    : '/media/jojo/jojo_intro_6_10.mp4';
  const mobileBgVideoSrc = heroMedia.videoMobile ?? heroMedia.videoDesktop;
  const desktopBgVideoSrc = heroMedia.videoDesktop ?? heroMedia.videoMobile;
  const shouldShowVideo =
    Boolean(desktopBgVideoSrc) && !prefersReducedMotion && !videoFailed;
  const isHeroRevealed = introPhase !== 'playing' || !shouldShowVideo;

  return (
    <section
      id="inicio"
      aria-label={copy.nav.home}
      className="relative h-[100svh] max-h-[100svh] w-full overflow-hidden bg-[#ECEEF2]"
    >
      {/* Único H1 semântico da Home para leitores de tela e SEO */}
      <h1 className="sr-only">{copy.hero.srOnlyHeading}</h1>

      {/* =====================================================================
          ABERTURA CINEMATOGRÁFICA EM TELA CHEIA:
          - Mobile (<1200px): jojo_init_site_mobile.mp4 (5s até 10s)
          - Desktop (>=1200px): jojo_init_site.mp4 (6s até 10s)
          - Transição suave de 0,8s ao terminar
         ===================================================================== */}
      {shouldShowVideo && introPhase !== 'done' && (
        <div
          aria-hidden="true"
          className={cn(
            'fixed inset-0 z-50 h-[100svh] w-full overflow-hidden bg-[#0B0B0D] transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
            introPhase === 'transitioning'
              ? 'pointer-events-none scale-[1.04] opacity-0 blur-[6px]'
              : 'scale-100 opacity-100 blur-0'
          )}
        >
          <video
            key={`cinematic-intro-${introVideoSrc}`}
            autoPlay
            muted
            playsInline
            preload="auto"
            poster={
              isMobileViewport
                ? heroMedia.posterMobile
                : heroMedia.posterDesktop
            }
            onEnded={triggerHeroTransition}
            onError={() => {
              setVideoFailed(true);
              setIntroPhase('done');
            }}
            className="h-full w-full object-cover object-center"
          >
            <source src={introVideoSrc} type="video/mp4" />
          </video>

          {/* Leve vinheta cinematográfica nas bordas */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(0,0,0,0.45)_100%)]" />
        </div>
      )}

      {/* Camada de vídeo de background cinza-claro para Mobile/Tablet (<1200px) usando o vídeo vertical */}
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

      {/* Composição Mobile (<1200px) — dispara os efeitos quando a abertura termina */}
      <HeroMobile isRevealed={isHeroRevealed} />

      {/* Composição Desktop (>=1200px) — dispara os efeitos quando a abertura termina */}
      <HeroDesktop
        shouldShowVideo={shouldShowVideo}
        videoSrc={desktopBgVideoSrc}
        onVideoError={() => setVideoFailed(true)}
        isRevealed={isHeroRevealed}
      />
    </section>
  );
}
