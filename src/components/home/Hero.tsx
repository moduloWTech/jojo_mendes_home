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
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
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

  const videoSrc = heroMedia.videoDesktop ?? heroMedia.videoMobile;
  const shouldShowVideo = Boolean(videoSrc) && !prefersReducedMotion && !videoFailed;

  return (
    <section
      id="inicio"
      aria-label={copy.nav.home}
      className="relative min-h-[100svh] w-full overflow-hidden bg-ink-950"
    >
      {/* Único H1 semântico da Home para leitores de tela e SEO */}
      <h1 className="sr-only">{copy.hero.srOnlyHeading}</h1>

      {/* Camada de mídia de fundo única (evita carregar dois vídeos simultaneamente) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Fundo ambientado para preencher larguras ultrawide sem barras secas e sem cortar o rosto no desktop */}
        <Image
          src={heroMedia.posterDesktop}
          alt={heroMedia.posterAlt}
          fill
          priority
          sizes="100vw"
          style={{
            objectPosition: heroMedia.positionDesktop ?? 'center 25%',
          }}
          className="object-cover opacity-50 blur-xl scale-110 hidden xl:block"
        />

        {shouldShowVideo && videoSrc ? (
          <video
            key={videoSrc}
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
            className="h-full w-full object-cover xl:mx-auto xl:max-w-[1100px] xl:object-cover xl:[mask-image:linear-gradient(to_right,transparent_0%,black_14%,black_86%,transparent_100%)]"
          >
            <source src={videoSrc} type="video/mp4" />
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

        {/* Overlays e vinhetas para contraste WCAG AA sobre qualquer frame do vídeo */}
        <div
          className="absolute inset-0 bg-ink-950/35"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/25"
          aria-hidden="true"
        />
        <div
          className="hidden xl:block absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,#0B0B0D_92%)]"
          aria-hidden="true"
        />
      </div>

      {/* Duas composições deliberadas compartilhando dados e tokens */}
      <HeroMobile />
      <HeroDesktop />
    </section>
  );
}

