'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { heroMedia } from '@/content/site';
import { copy } from '@/content/copy';
import { HeroMobile } from '@/components/home/HeroMobile';
import { HeroDesktop } from '@/components/home/HeroDesktop';

export function Hero() {
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

  const mobileBgVideoSrc = heroMedia.videoMobile ?? heroMedia.videoDesktop;
  const desktopBgVideoSrc = heroMedia.videoDesktop ?? heroMedia.videoMobile;
  const shouldShowVideo =
    Boolean(desktopBgVideoSrc) && !prefersReducedMotion && !videoFailed;

  return (
    <section
      id="inicio"
      aria-label={copy.nav.home}
      className="relative h-[100svh] max-h-[100svh] w-full overflow-hidden bg-[#ECEEF2]"
    >
      {/* Único H1 semântico da Home para leitores de tela e SEO */}
      <h1 className="sr-only">{copy.hero.srOnlyHeading}</h1>

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

      {/* Composição Mobile (<1200px) */}
      <HeroMobile isRevealed />

      {/* Composição Desktop (>=1200px) */}
      <HeroDesktop
        shouldShowVideo={shouldShowVideo}
        videoSrc={desktopBgVideoSrc}
        onVideoError={() => setVideoFailed(true)}
        isRevealed
      />
    </section>
  );
}
