import React from 'react';
import Image from 'next/image';
import { brand } from '@/content/site';
import { copy, destinations } from '@/content/copy';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button';

export function HeroDesktop() {
  return (
    <div
      data-testid="hero-desktop"
      className="relative z-10 hidden min-h-[100svh] w-full flex-col items-center justify-end pb-20 pt-32 xl:flex"
    >
      <div className="site-container flex flex-col items-center text-center">
        <div className="mb-9 py-3">
          <Image
            src={brand.logo.src}
            alt={brand.logo.alt}
            width={brand.logo.width}
            height={brand.logo.height}
            priority
            sizes="480px"
            className="h-auto w-full max-w-[480px] object-contain drop-shadow-[0_16px_36px_rgba(0,0,0,0.85)]"
          />
        </div>

        <div className="flex flex-row items-center justify-center gap-4">
          <PrimaryButton href={destinations.booking}>
            {copy.hero.primaryCta}
          </PrimaryButton>
          <SecondaryButton href={destinations.schedule}>
            {copy.hero.secondaryCta}
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}

