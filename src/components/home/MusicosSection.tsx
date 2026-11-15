import React from 'react';
import Image from 'next/image';
import { musicians as defaultMusicians } from '@/content/site';
import { copy } from '@/content/copy';
import type { Musician } from '@/types/site';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

interface MusicianCardProps {
  musician: Musician;
}

export function MusicianCard({ musician }: MusicianCardProps) {
  return (
    <article className="group overflow-hidden rounded-lg border border-border-subtle bg-surface shadow-card">
      <div className="relative aspect-[4/5] xl:aspect-[3/4] w-full overflow-hidden bg-ink-950">
        <Image
          src={musician.photo}
          alt={`${musician.name} — ${musician.role}`}
          fill
          sizes="(max-width: 479px) 100vw, (max-width: 1199px) 50vw, 300px"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-5 md:p-6">
        <h3 className="type-h4 text-text">{musician.name}</h3>
        <p className="type-body-sm text-text-muted mt-1">{musician.role}</p>
      </div>
    </article>
  );
}

interface MusicosSectionProps {
  items?: Musician[];
}

export function MusicosSection({ items = defaultMusicians }: MusicosSectionProps) {
  const confirmedMusicians = items.filter((m) => m.confirmed);

  return (
    <section
      id="musicos"
      aria-labelledby="musicos-heading"
      className="section-spacing bg-bg"
    >
      <Container>
        <RevealOnScroll>
          <SectionHeading
            id="musicos-heading"
            eyebrow={copy.musicians.eyebrow}
            title={copy.musicians.title}
          />

          {confirmedMusicians.length === 0 ? (
            <div className="rounded-lg border border-border-subtle bg-surface p-6 md:p-8 max-w-xl">
              <p className="type-body-lg text-text-muted">
                {copy.musicians.emptyMessage}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 xl:grid-cols-3 xl:gap-6">
              {confirmedMusicians.map((musician) => (
                <MusicianCard key={musician.id} musician={musician} />
              ))}
            </div>
          )}
        </RevealOnScroll>
      </Container>
    </section>
  );
}

