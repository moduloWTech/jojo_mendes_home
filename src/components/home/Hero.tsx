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
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const mobileVideoSrc = heroMedia.videoMobile;
  const desktopVideoSrc = heroMedia.videoDesktop ?? heroMedia.videoMobile;
  const shouldShowMobileVideo =
    Boolean(mobileVideoSrc) && !prefersReducedMotion && !videoFailed;
  const shouldShowDesktopVideo =
    Boolean(desktopVideoSrc) && !prefersReducedMotion && !videoFailed;

  return (
    <section
      id="inicio"
      aria-label={copy.nav.home}
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#0B0B0D] xl:bg-[#EEF0F4]"
    >
      {/* Único H1 semântico da Home para leitores de tela e SEO */}
      <h1 className="sr-only">{copy.hero.srOnlyHeading}</h1>

      {/* Camada de vídeo full-bleed exclusiva para Mobile/Tablet (<1200px) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden xl:hidden">
        {shouldShowMobileVideo && mobileVideoSrc ? (
          <video
            key={`mobile-${mobileVideoSrc}`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={heroMedia.posterMobile}
            onError={() => setVideoFailed(true)}
            style={{
              objectPosition: heroMedia.positionMobile ?? 'center 25%',
            }}
            className="h-full w-full object-cover"
          >
            <source src={mobileVideoSrc} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={heroMedia.posterMobile}
            alt={heroMedia.posterAlt}
            fill
            priority
            sizes="100vw"
            style={{
              objectPosition: heroMedia.positionMobile ?? 'center 25%',
            }}
            className="object-cover"
          />
        )}

        <div className="absolute inset-0 bg-ink-950/35" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/25"
          aria-hidden="true"
        />
      </div>

      {/* Composição Mobile (<1200px) */}
      <HeroMobile />

      {/* Composição Desktop (>=1200px) com vídeo rodando dentro das letras EITA */}
      <HeroDesktop
        shouldShowVideo={shouldShowDesktopVideo}
        videoSrc={desktopVideoSrc}
        onVideoError={() => setVideoFailed(true)}
      />
    </section>
  );
}
