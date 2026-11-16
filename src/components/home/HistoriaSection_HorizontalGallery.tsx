'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { copy } from '@/content/copy';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils';
import { Sparkles, ArrowRight, Mic2, Music, Compass, Flame } from 'lucide-react';

interface StoryChapter {
  id: string;
  number: string;
  tag: string;
  title: string;
  quote: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

const CHAPTERS: StoryChapter[] = [
  {
    id: 'intro',
    number: '00',
    tag: 'A Trajetória',
    title: 'A voz que move a cantiga',
    quote:
      'Uma história forjada na paixão pela música nordestina, na vida de estrada e na entrega sem reservas em cada apresentação.',
    icon: Sparkles,
    accentColor: '#EFC16B',
  },
  {
    id: 'origem',
    number: '01',
    tag: 'O Primeiro Acorde',
    title: 'Onde a cantiga começou',
    quote:
      'Comecei cantando na escola, com o violão no colo e o coração batendo no compasso da música nordestina. Ali eu já sabia: o palco era o meu destino.',
    icon: Music,
    accentColor: '#F7D995',
  },
  {
    id: 'estrada',
    number: '02',
    tag: 'A Primeira Banda',
    title: 'A escola da estrada',
    quote:
      'A primeira banda que montei foi minha grande escola. Madrugadas de ensaio, van na estrada e o aprendizado de segurar a energia do público no peito.',
    icon: Compass,
    accentColor: '#EBB338',
  },
  {
    id: 'encontros',
    number: '03',
    tag: 'Os Encontros',
    title: 'Gente especial na caminhada',
    quote:
      'Tive o privilégio de dividir acordes com mestres e músicos extraordinários. Cada parceria deixou uma marca profunda no meu som e na minha essência.',
    icon: Mic2,
    accentColor: '#DDA84E',
  },
  {
    id: 'entrega',
    number: '04',
    tag: 'A Entrega Total',
    title: 'Tudo de mim em cada show',
    quote:
      'Pra mim não importa o tamanho da plateia: dez ou dez mil pessoas, a entrega é exatamente a mesma. Em cada show, eu deixo a minha alma no palco.',
    icon: Flame,
    accentColor: '#EFC16B',
  },
];

export function HistoriaSection() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [maxShift, setMaxShift] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function'
    ) {
      return;
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const onMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    motionQuery.addEventListener('change', onMotionChange);
    return () => motionQuery.removeEventListener('change', onMotionChange);
  }, []);

  // Calcula a largura total do trilho horizontal
  const updateTrackDimensions = () => {
    if (!trackRef.current) return;
    const scrollW = trackRef.current.scrollWidth;
    const viewW = window.innerWidth;
    const shift = Math.max(0, scrollW - viewW + 64);
    setMaxShift(shift);
  };

  useEffect(() => {
    updateTrackDimensions();
    window.addEventListener('resize', updateTrackDimensions);
    return () => window.removeEventListener('resize', updateTrackDimensions);
  }, []);

  // Monitora a rolagem vertical e converte em progresso 0.0 a 1.0
  useEffect(() => {
    if (prefersReducedMotion) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false;
            return;
          }

          const rect = containerRef.current.getBoundingClientRect();
          const vh = window.innerHeight || 800;
          const totalDistance = rect.height - vh;

          if (totalDistance <= 0) {
            setScrollProgress(0);
            ticking = false;
            return;
          }

          if (rect.top <= 0) {
            const raw = -rect.top / totalDistance;
            setScrollProgress(Math.min(Math.max(raw, 0), 1));
          } else {
            setScrollProgress(0);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [prefersReducedMotion]);

  // Deslocamento horizontal do trilho
  const currentTranslateX = scrollProgress * maxShift;

  // Capítulo ativo no indicador
  const activeChapterIndex = Math.min(
    Math.floor(scrollProgress * CHAPTERS.length),
    CHAPTERS.length - 1
  );

  return (
    <section
      ref={containerRef}
      id="historia"
      aria-label={copy.nav.history}
      className={cn(
        'relative w-full bg-[#0A090D] text-text shadow-[0_-28px_60px_rgba(10,10,14,0.45)]',
        prefersReducedMotion ? 'min-h-screen py-16' : 'h-[380vh]'
      )}
    >
      <h2 className="sr-only">A Artista — Jojo Mendes</h2>

      {/* 
        Palco fixo (sticky) durante os 380vh de rolagem vertical.
        Todo o movimento vertical do usuário é traduzido em deslizamento horizontal fluido.
      */}
      <div
        className={cn(
          'w-full flex flex-col justify-between overflow-hidden',
          prefersReducedMotion
            ? 'relative min-h-screen py-12'
            : 'sticky top-0 h-[100svh] max-h-[100svh] pt-[76px] pb-5'
        )}
      >
        {/* Efeito de atmosfera com luzes de palco quentes ao fundo */}
        <div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute left-[15%] top-[10%] h-[480px] w-[580px] rounded-full bg-[radial-gradient(circle,rgba(239,193,107,0.07)_0%,transparent_70%)] blur-3xl" />
          <div className="absolute right-[10%] bottom-[15%] h-[400px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(115,45,69,0.08)_0%,transparent_70%)] blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_0%,rgba(10,9,13,0.85)_100%)]" />
        </div>

        {/* ===================================================================
            BARRA DE TOPO DA DOBRA: Título sutil e indicador de progresso
           =================================================================== */}
        <Container className="relative z-20 w-full px-6 pt-3 sm:pt-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <p className="type-eyebrow text-primary text-xs sm:text-sm tracking-widest uppercase">
                A Artista • Trajetória
              </p>
            </div>

            {/* Marcador de progresso horizontal: 01 / 04 */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-1.5" aria-hidden="true">
                {CHAPTERS.map((c, i) => (
                  <div
                    key={c.id}
                    className={cn(
                      'h-1 rounded-full transition-all duration-300',
                      i === activeChapterIndex
                        ? 'w-7 bg-primary'
                        : i < activeChapterIndex
                        ? 'w-3 bg-white/40'
                        : 'w-2 bg-white/15'
                    )}
                  />
                ))}
              </div>
              <span className="font-display text-sm font-bold text-text-muted">
                {CHAPTERS[activeChapterIndex]?.number} / 04
              </span>
            </div>
          </div>
        </Container>

        {/* ===================================================================
            CORPO PRINCIPAL: Jojo em Primeiro Plano + Trilho Horizontal ao Fundo
           =================================================================== */}
        <div className="relative z-10 flex-1 flex items-center overflow-hidden my-auto">
          {/* 
            A Jojo Recortada (Âncora fixa no primeiro plano à esquerda/centro):
            Permanece firme com o microfone, projetando sombra no palco.
          */}
          <div
            className="pointer-events-none absolute left-3 sm:left-8 xl:left-16 bottom-0 z-30 flex items-end select-none"
            aria-hidden="true"
          >
            <div className="relative h-[68svh] sm:h-[74svh] xl:h-[80svh] max-h-[720px] aspect-[1118/1600] filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)]">
              {/* Sombra de palco nos pés */}
              <div className="absolute -bottom-4 left-1/2 h-8 w-[70%] -translate-x-1/2 rounded-full bg-black/70 blur-md" />

              <Image
                src="/media/jojo/jojo-recorte-solo.png"
                alt="Jojo Mendes"
                fill
                priority
                sizes="(max-width: 767px) 55vw, (max-width: 1199px) 45vw, 520px"
                className="object-contain object-bottom"
              />
            </div>
          </div>

          {/* 
            Trilho Horizontal (Desliza da direita para a esquerda conforme o scroll):
            Passa atrás da Jojo com os capítulos da história.
          */}
          <div
            ref={trackRef}
            style={{
              transform: prefersReducedMotion
                ? 'none'
                : `translate3d(-${currentTranslateX}px, 0, 0)`,
            }}
            className={cn(
              'flex items-center gap-6 sm:gap-10 xl:gap-14 pl-[42vw] sm:pl-[38vw] xl:pl-[32vw] pr-12 will-change-transform',
              prefersReducedMotion ? 'flex-col pl-4 pr-4 gap-8' : 'flex-nowrap'
            )}
          >
            {CHAPTERS.map((chapter) => {
              const Icon = chapter.icon;
              return (
                <article
                  key={chapter.id}
                  className="relative shrink-0 w-[82vw] sm:w-[520px] xl:w-[580px] select-none rounded-2xl border border-white/10 bg-gradient-to-br from-[#1A1820]/95 via-[#131217]/95 to-[#0E0D12]/95 p-6 sm:p-8 xl:p-10 shadow-[0_24px_60px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-all duration-200"
                >
                  {/* Numeral gigante vazado ao fundo do cartão */}
                  <span
                    className="pointer-events-none absolute right-4 top-2 font-display text-8xl sm:text-9xl font-extrabold text-white/[0.04] select-none"
                    aria-hidden="true"
                  >
                    {chapter.number}
                  </span>

                  {/* Cabeçalho do Card */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold text-primary tracking-wider uppercase">
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      {chapter.tag}
                    </div>

                    <span className="font-display text-lg font-bold text-primary/60">
                      Capítulo {chapter.number}
                    </span>
                  </div>

                  {/* Título do Capítulo */}
                  <h3 className="font-display text-2xl sm:text-3xl xl:text-4xl font-bold text-text mb-4 leading-tight">
                    {chapter.title}
                  </h3>

                  {/* Citação autobiográfica da cantora */}
                  <p className="type-body-lg text-[#ECEEF2] text-base sm:text-lg xl:text-xl leading-relaxed italic mb-6">
                    “{chapter.quote}”
                  </p>

                  {/* Rodapé do Card */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs text-text-muted">
                    <span className="font-semibold text-primary">Jojo Mendes</span>
                    <span className="flex items-center gap-1 text-[11px] text-text-muted/70">
                      Continue rolando
                      <ArrowRight className="h-3 w-3 text-primary" aria-hidden="true" />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ===================================================================
            BARRA DE BASE: Dica discreta de navegação
           =================================================================== */}
        <Container className="relative z-20 w-full px-6">
          <div className="flex items-center justify-between text-xs text-text-muted/60 border-t border-white/5 pt-2">
            <span>Role verticalmente para explorar os capítulos</span>
            <span>Ao final, a agenda de shows continua abaixo ↓</span>
          </div>
        </Container>
      </div>
    </section>
  );
}
