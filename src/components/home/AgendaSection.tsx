'use client';

import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { shows } from '@/content/site';
import { copy } from '@/content/copy';
import type { Show } from '@/types/site';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { formatShowDateParts } from '@/lib/utils';

interface ShowCardProps {
  show: Show;
}

export function ShowCard({ show }: ShowCardProps) {
  const { day, month } = formatShowDateParts(show.date);

  return (
    <article className="flex flex-col justify-between rounded-lg bg-surface p-5 md:p-6 xl:p-8 border border-border-subtle shadow-card transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:bg-surface-hover">
      <div>
        {/* 1. Dia e mês */}
        <div className="inline-flex items-baseline gap-2 border-b border-border-subtle pb-3 mb-4">
          <span className="font-display text-[40px] leading-[40px] font-semibold text-primary">
            {day}
          </span>
          <span className="type-eyebrow text-text-muted">{month}</span>
        </div>

        {/* 2. Cidade + UF */}
        <h3 className="type-h4 text-text">
          {show.city} · {show.state}
        </h3>

        {/* 3. Nome do local */}
        <p className="type-body text-text-muted mt-1.5">{show.venue}</p>

        {/* 4. Horário, somente se confirmado */}
        {show.time && (
          <p className="type-body-sm text-text-muted mt-2">{show.time}</p>
        )}
      </div>

      {/* 5. Link opcional Ver detalhes somente se houver URL real */}
      {show.detailsUrl && (
        <div className="mt-5 pt-4 border-t border-border-subtle">
          <a
            href={show.detailsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-1.5 text-[15px] font-semibold text-primary hover:text-primary-hover hover:underline focus-visible:underline underline-offset-4"
          >
            <span>{copy.schedule.detailsCta}</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      )}
    </article>
  );
}

interface AgendaSectionProps {
  items?: Show[];
}

export function AgendaSection({ items = shows }: AgendaSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const confirmedShows = items.filter((item) => item.status !== 'cancelled');
  const hasMoreDesktop = confirmedShows.length > 6;
  const hasMoreMobile = confirmedShows.length > 4;
  const visibleShows = isExpanded ? confirmedShows : confirmedShows.slice(0, 6);

  return (
    <section
      id="agenda"
      aria-labelledby="agenda-heading"
      className="section-spacing bg-bg-alt"
    >
      <Container>
        <RevealOnScroll>
          <SectionHeading
            id="agenda-heading"
            eyebrow={copy.schedule.eyebrow}
            title={copy.schedule.title}
          />

          {confirmedShows.length === 0 ? (
            <div className="rounded-lg border border-border-subtle bg-surface p-6 md:p-8 xl:p-10 text-left xl:text-center max-w-2xl xl:mx-auto">
              <p className="type-h3 text-text">{copy.schedule.emptyTitle}</p>
              <p className="type-body text-text-muted mt-2">
                {copy.schedule.emptyDescription}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3 xl:gap-6">
                {visibleShows.map((show, index) => (
                  <div
                    key={show.id}
                    className={
                      !isExpanded && index >= 4 ? 'hidden md:block' : undefined
                    }
                  >
                    <ShowCard show={show} />
                  </div>
                ))}
              </div>

              {(hasMoreDesktop || hasMoreMobile) && (
                <div className="mt-7 md:mt-8 xl:mt-10 flex justify-center">
                  <Button
                    variant="secondary"
                    onClick={() => setIsExpanded((prev) => !prev)}
                  >
                    {isExpanded
                      ? copy.schedule.showLessCta
                      : copy.schedule.showMoreCta}
                  </Button>
                </div>
              )}
            </>
          )}
        </RevealOnScroll>
      </Container>
    </section>
  );
}

