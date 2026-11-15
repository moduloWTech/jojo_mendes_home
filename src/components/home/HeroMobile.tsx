import React from 'react';
import Image from 'next/image';
import { brand } from '@/content/site';
import { copy, destinations } from '@/content/copy';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button';

export function HeroMobile() {
  return (
    <div
      data-testid="hero-mobile"
      className="relative z-10 flex min-h-[100svh] w-full flex-col justify-end items-center px-5 pt-24 pb-[max(32px,calc(env(safe-area-inset-bottom)+24px))] xl:hidden"
    >
      <div className="flex w-full max-w-[320px] flex-col items-center text-center">
        <div className="mb-7 py-2">
          <Image
            src={brand.logo.src}
            alt={brand.logo.alt}
            width={brand.logo.width}
            height={brand.logo.height}
            priority
            sizes="(max-width: 767px) 72vw, 300px"
            className="h-auto w-[min(72vw,300px)] object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.75)]"
          />
        </div>

        <div className="flex w-full flex-col gap-3">
          <PrimaryButton href={destinations.booking} fullWidth>
            {copy.hero.primaryCta}
          </PrimaryButton>
          <SecondaryButton href={destinations.schedule} fullWidth>
            {copy.hero.secondaryCta}
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}

