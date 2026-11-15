import React from 'react';
import Image from 'next/image';
import { biography } from '@/content/site';
import { copy } from '@/content/copy';
import { Container } from '@/components/ui/Container';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export function HistoriaSection() {
  return (
    <section
      id="historia"
      aria-labelledby="historia-heading"
      className="section-spacing bg-bg"
    >
      <Container>
        <RevealOnScroll>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10 xl:gap-16 items-center">
            {/* Coluna da fotografia: primeiro no mobile, esquerda (5/12) no desktop */}
            <div className="md:col-span-5">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-border-subtle bg-surface shadow-card xl:h-[620px] xl:aspect-auto">
                <Image
                  src={biography.photo.src}
                  alt={biography.photo.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1199px) 42vw, 480px"
                  style={{
                    objectPosition:
                      biography.photo.positionDesktop ?? 'center top',
                  }}
                  className="object-cover"
                />
              </div>
            </div>

            {/* Coluna editorial: abaixo no mobile, direita (7/12) no desktop */}
            <div className="md:col-span-7 flex flex-col justify-center">
              <p className="type-eyebrow text-primary mb-2 md:mb-2.5 xl:mb-3">
                {copy.history.eyebrow}
              </p>

              <h2 id="historia-heading" className="type-h2 text-text">
                {copy.history.title}
              </h2>

              <div className="mt-4 md:mt-5 xl:mt-6 space-y-4 max-w-[65ch]">
                {biography.paragraphs.map((paragraph, idx) => (
                  <p key={idx} className="type-body-lg text-text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

