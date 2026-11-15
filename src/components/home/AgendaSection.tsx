'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { shows } from '@/content/site';
import { copy, destinations } from '@/content/copy';
import type { Show } from '@/types/site';
import { Container } from '@/components/ui/Container';
import { formatShowDateParts, cn } from '@/lib/utils';

interface ShowCardProps {
  show: Show;
  index?: number;
  animKey?: number;
}

const WEEKDAY_FORMATTER = new Intl.DateTimeFormat('pt-BR', {
  weekday: 'short',
  timeZone: 'UTC',
});

function getWeekdayLabel(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map(Number);
  if (!y || !m || !d) return '';
  const dt = new Date(Date.UTC(y, m - 1, d));
  return WEEKDAY_FORMATTER.format(dt).replace('.', '').toUpperCase();
}

export function ShowCard({ show, index = 0 }: ShowCardProps) {
  const { day, month } = formatShowDateParts(show.date);
  const weekday = getWeekdayLabel(show.date);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    setEntered(false);
    const timer = setTimeout(() => {
      setEntered(true);
    }, 40 + index * 90);
    return () => clearTimeout(timer);
  }, [show.id, index]);

  return (
    <article
      className={cn(
        'group flex items-center justify-between gap-4 border-b border-[#FAF7F1]/12 py-3.5 sm:py-4 transition-all duration-500 ease-out hover:border-[#EFC16B]/55 hover:pl-1.5',
        entered ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
      )}
    >
      <div className="flex items-center gap-4 sm:gap-5 min-w-0">
        {/* Data minimalista em ouro */}
        <div className="flex w-[54px] shrink-0 flex-col items-start leading-none">
          <span className="font-display text-[28px] sm:text-[32px] font-bold text-[#EFC16B]">
            {day}
          </span>
          <span className="mt-0.5 text-[10px] font-semibold tracking-widest text-[#D5CBBF] uppercase">
            {month} · {weekday}
          </span>
        </div>

        {/* Divisória vertical sutil */}
        <span
          aria-hidden="true"
          className="h-8 w-px shrink-0 bg-[#FAF7F1]/15 group-hover:bg-[#EFC16B]/50 transition-colors"
        />

        {/* Cidade, UF e Local em linha limpa */}
        <div className="min-w-0">
          <h3 className="font-display text-[19px] sm:text-[21px] font-semibold leading-snug text-[#FAF7F1] truncate">
            {show.city} <span className="text-[#EFC16B]">·</span> {show.state}
          </h3>
          <p className="text-[13px] sm:text-[14px] text-[#CFC6BA] truncate">
            {show.venue}
          </p>
        </div>
      </div>

      {/* Horário ou link discreto à direita */}
      <div className="shrink-0 text-right">
        {show.detailsUrl ? (
          <a
            href={show.detailsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#EFC16B] hover:underline"
          >
            <span>{copy.schedule.detailsCta}</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        ) : (
          show.time && (
            <span className="text-[13px] sm:text-[14px] font-medium tabular-nums text-[#E5DDD3]/85">
              {show.time}
            </span>
          )
        )}
      </div>
    </article>
  );
}

interface AgendaSectionProps {
  items?: Show[];
}

const ITEMS_PER_PAGE = 4;

export function AgendaSection({ items = shows }: AgendaSectionProps) {
  const [page, setPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const confirmedShows = items.filter((item) => item.status !== 'cancelled');
  const totalPages = Math.max(1, Math.ceil(confirmedShows.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages - 1);

  const visibleShows = confirmedShows.slice(
    safePage * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  // Rotação suave automática a cada 5.5s para as datas irem surgindo sozinhas (pausa quando o mouse está em cima)
  useEffect(() => {
    if (totalPages <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages);
    }, 5500);
    return () => clearInterval(interval);
  }, [totalPages, isPaused]);

  return (
    <section
      id="agenda"
      aria-labelledby="agenda-heading"
      className="relative h-[100svh] max-h-[100svh] w-full overflow-hidden bg-[#0D0907] flex items-center pt-16 pb-6"
    >
      {/* Background: Foto da Jojo Mendes cantando sob luz quente à direita */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <Image
          src="/media/jojo/agenda-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[76%_center] lg:object-[82%_center]"
        />

        {/* Gradiente limpo à esquerda para leitura das datas mantendo a Jojo nítida à direita */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#090605]/95 via-[#0E0907]/80 lg:via-[#0E0907]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0D]/75 via-transparent to-[#0B0B0D]/80" />
      </div>

      <Container className="relative z-10 w-full">
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="w-full lg:max-w-[50%] xl:max-w-[540px]"
        >
          {/* Cabeçalho enxuto */}
          <div className="mb-4 sm:mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] sm:text-[12px] font-semibold tracking-[0.18em] text-[#EFC16B] uppercase">
                {copy.schedule.eyebrow}
              </p>
              <h2
                id="agenda-heading"
                className="mt-1 font-display text-[32px] sm:text-[40px] xl:text-[44px] font-bold leading-none text-[#FAF7F1]"
              >
                {copy.schedule.title}
              </h2>
            </div>

            {confirmedShows.length > 0 && (
              <span className="text-[12px] font-medium tabular-nums text-[#CFC6BA]">
                {safePage * ITEMS_PER_PAGE + 1}–
                {Math.min(
                  (safePage + 1) * ITEMS_PER_PAGE,
                  confirmedShows.length
                )}{' '}
                de {confirmedShows.length}
              </span>
            )}
          </div>

          {confirmedShows.length === 0 ? (
            <div className="border-t border-[#FAF7F1]/15 pt-6">
              <p className="type-h3 text-text">{copy.schedule.emptyTitle}</p>
              <p className="type-body text-text-muted mt-2">
                {copy.schedule.emptyDescription}
              </p>
            </div>
          ) : (
            <>
              {/* Lista limpa de 4 datas por vez (ZERO barra de rolagem) */}
              <div className="border-t border-[#FAF7F1]/15">
                {visibleShows.map((show, idx) => (
                  <ShowCard key={show.id} show={show} index={idx} />
                ))}
              </div>

              {/* Paginação minimalista + link de contratação */}
              <div className="mt-5 flex items-center justify-between gap-4">
                {totalPages > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Datas anteriores"
                      onClick={() =>
                        setPage((prev) => (prev - 1 + totalPages) % totalPages)
                      }
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#FAF7F1]/20 text-[#FAF7F1] transition-colors hover:border-[#EFC16B] hover:text-[#EFC16B]"
                    >
                      <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    </button>

                    <div className="flex items-center gap-1.5 px-1">
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          aria-label={`Página ${i + 1} da agenda`}
                          onClick={() => setPage(i)}
                          className={cn(
                            'h-1.5 rounded-full transition-all duration-300',
                            i === safePage
                              ? 'w-6 bg-[#EFC16B]'
                              : 'w-1.5 bg-[#FAF7F1]/25 hover:bg-[#FAF7F1]/50'
                          )}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      aria-label="Próximas datas"
                      onClick={() => setPage((prev) => (prev + 1) % totalPages)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#FAF7F1]/20 text-[#FAF7F1] transition-colors hover:border-[#EFC16B] hover:text-[#EFC16B]"
                    >
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                )}

                <Link
                  href={destinations.booking}
                  className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#EFC16B] transition-colors hover:text-[#FAF7F1]"
                >
                  <span>Levar Jojo para meu evento</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
