import React from 'react';
import Image from 'next/image';
import { bookingMedia } from '@/content/site';
import { copy, destinations } from '@/content/copy';
import { Container } from '@/components/ui/Container';
import { PrimaryButton } from '@/components/ui/Button';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export function ContratacaoCTASection() {
  return (
    <section
      id="contratar"
      aria-labelledby="contratar-heading"
      className="relative overflow-hidden bg-wine-900 py-16 md:py-22 xl:py-28 border-y border-border-subtle"
    >
      {/* Imagem de palco ao fundo com overlay bordô/grafite para legibilidade */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={bookingMedia.bannerBackground.src}
          alt={bookingMedia.bannerBackground.alt}
          fill
          sizes="100vw"
          style={{
            objectPosition:
              bookingMedia.bannerBackground.positionDesktop ?? 'center 30%',
          }}
          className="object-cover opacity-30"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-wine-900/90 to-ink-950/90"
          aria-hidden="true"
        />
      </div>

      <Container className="relative z-10">
        <RevealOnScroll>
          <div className="flex flex-col items-center text-center xl:flex-row xl:items-center xl:justify-between xl:text-left gap-6 xl:gap-12">
            <div className="max-w-2xl">
              <h2 id="contratar-heading" className="type-h2 text-text">
                {copy.bookingBanner.title}
              </h2>
              <p className="type-body-lg text-text-muted mt-4">
                {copy.bookingBanner.description}
              </p>
            </div>

            <div className="w-full max-w-[320px] xl:w-auto xl:max-w-none shrink-0">
              <PrimaryButton
                href={destinations.booking}
                className="w-full xl:w-auto"
              >
                {copy.bookingBanner.cta}
              </PrimaryButton>
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

export const BookingCTA = ContratacaoCTASection;

