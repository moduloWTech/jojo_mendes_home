'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Minus, ArrowRight } from 'lucide-react';

interface AccordionItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  quote: string;
  text: string;
  tags: string[];
}

const TOPICS: AccordionItem[] = [
  {
    id: 'raizes',
    number: '01',
    title: 'As Raízes & O Primeiro Violão',
    subtitle: 'A infância, a família e onde a cantiga começou',
    quote: '“Comecei cantando ainda menina, com o violão no colo e o sonho de levar nossa cantiga para os grandes palcos do Brasil.”',
    text: 'A paixão pela música ganhou vida nas cantorias de escola e encontros em família. Inspirada pelos grandes mestres do forró tradicional e pela poesia nordestina, Jojo Mendes construiu uma identidade vocal autêntica, vibrante e cheia de sentimento.',
    tags: ['Primeiro Violão', 'Forró Tradicional', 'Origens'],
  },
  {
    id: 'estrada',
    number: '02',
    title: 'A Estrada & A Banda',
    subtitle: 'Turnês, praças lotadas e o calor do público',
    quote: '“A estrada é onde o coração bate mais forte. Cada cidade nos acolhe com uma energia inesquecível.”',
    text: 'Com a formação da sua banda e um repertório contagiante, a cantora conquistou festivais, vaquejadas e festas tradicionais. A sintonia no palco e a entrega em cada apresentação transformaram seus shows em uma grande celebração popular.',
    tags: ['Turnês pelo Brasil', 'Banda Completa', 'Conexão ao Vivo'],
  },
  {
    id: 'show',
    number: '03',
    title: 'Eita Cantiga! O Show ao Vivo',
    subtitle: 'Repertório vibrante, presença marcante e estrutura de grande porte',
    quote: '“No palco a entrega é total. Nosso show é feito para cantar, dançar e emocionar do início ao fim.”',
    text: 'Hoje, Jojo Mendes representa a força do forró autêntico com a pressão e o brilho dos grandes espetáculos contemporâneos. Uma experiência sonora e visual completa, pronta para animar eventos corporativos, feiras e praças públicas.',
    tags: ['Show Completo', 'Energia 100%', 'Estrutura Profissional'],
  },
];

export function HistoriaSection() {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0.5); // inicia centralizado para SSR seguro
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Todos os tópicos iniciam fechados conforme solicitado
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  React.useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function'
    ) {
      return;
    }

    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const onMotionChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    motionQuery.addEventListener('change', onMotionChange);
    window.addEventListener('resize', checkMobile);

    return () => {
      motionQuery.removeEventListener('change', onMotionChange);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Monitora a posição relativa da seção na viewport para aplicar os efeitos de entrada e saída no scroll
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const section = sectionRef.current;
          if (!section) {
            ticking = false;
            return;
          }

          const rect = section.getBoundingClientRect();
          const vh = window.innerHeight || 800;
          const totalDistance = rect.height + vh;
          const currentDistance = vh - rect.top;
          const progress = Math.min(
            Math.max(currentDistance / totalDistance, 0),
            1
          );

          setScrollProgress(progress);
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
  }, []);

  // Efeito contínuo e marcante de profundidade ("o fundo vai indo para trás no scroll"):
  // O fundo se afasta continuamente de 1.18x (mais perto) para 0.96x (recolhido em profundidade),
  // com deslocamento vertical de parallax de 120px que acentua a sensação tridimensional de câmera.
  const bgScale = prefersReducedMotion ? 1 : 1.18 - scrollProgress * 0.22;
  const bgParallaxY = prefersReducedMotion ? 0 : (0.5 - scrollProgress) * 120;

  // Curvas de transição do card:
  // - Desktop: o quadro vem da esquerda (-520px) em trajeto estendido e se posiciona à direita, com fade-in gradual.
  // - Mobile: o quadro mantém a aproximação centrada rápida com escala e flutuação vertical (sem deslocamento lateral).
  let cardTranslateX = 0;
  let cardTranslateY = 0;
  let cardScale = 1;
  let cardOpacity = 1;

  if (!prefersReducedMotion) {
    if (isMobile) {
      // Mobile: Aproximação mais rápida centrada com escala (conforme versão anterior)
      if (scrollProgress < 0.42) {
        const t = Math.min(Math.max((scrollProgress - 0.06) / 0.3, 0), 1);
        const ease = 1 - Math.pow(1 - t, 3);
        cardTranslateX = 0; // Centralizado, sem corte lateral
        cardTranslateY = (1 - ease) * 50; // Sobe suavemente
        cardScale = 0.92 + ease * 0.08;   // Aproximação rápida em escala
        cardOpacity = 0.15 + ease * 0.85; // Revelação rápida
      } else if (scrollProgress > 0.68) {
        const t = Math.min(Math.max((scrollProgress - 0.68) / 0.25, 0), 1);
        const ease = Math.pow(t, 2);
        cardTranslateX = 0;
        cardTranslateY = -ease * 35;
        cardScale = 1 - ease * 0.04;
        cardOpacity = 1 - ease * 0.75;
      }
    } else {
      // Desktop: Mantido exatamente como está (grande trajeto horizontal estendido de -520px até a direita com fade-in)
      const startX = -520;

      if (scrollProgress < 0.58) {
        const t = Math.min(Math.max((scrollProgress - 0.12) / 0.46, 0), 1);
        const ease = 1 - Math.pow(1 - t, 2.2);

        cardTranslateX = (1 - ease) * startX; // De -520px até 0px (posição final à direita)
        cardTranslateY = (1 - ease) * 20;     // Leve acomodação vertical
        cardScale = 0.92 + ease * 0.08;       // Escala gradual de 0.92 para 1.0
        cardOpacity = Math.min(Math.max(ease * 1.15, 0), 1); // Vai aparecendo de 0% até 100%
      } else if (scrollProgress > 0.78) {
        const t = Math.min(Math.max((scrollProgress - 0.78) / 0.2, 0), 1);
        const ease = Math.pow(t, 2);
        cardTranslateX = ease * 40;
        cardTranslateY = -ease * 40;
        cardScale = 1 - ease * 0.04;
        cardOpacity = 1 - ease * 0.8;
      }
    }
  }

  return (
    <section
      ref={sectionRef}
      id="historia"
      aria-label="A Artista — Jojo Mendes"
      style={{ clipPath: 'inset(0)' }}
      className="relative min-h-[100svh] w-full bg-[#08070A] flex items-center justify-center py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-12"
    >
      {/* =====================================================================
          CAMADA DE BACKGROUND PARALLAX FIXO:
          - Ancorada à viewport iniciando abaixo do header fixo
          - origin-top garante que os rostos fiquem sempre perfeitamente enquadrados
          - Efeito marcante de profundidade contínua no scroll
         ===================================================================== */}
      <div className="fixed inset-x-0 top-[84px] sm:top-[92px] lg:top-[96px] bottom-0 z-0 pointer-events-none select-none">
        {/* Desktop: Imagem panorâmica */}
        <div
          className="hidden md:block relative w-full h-full origin-top"
          style={{
            transform: prefersReducedMotion
              ? 'none'
              : `translate3d(0, ${bgParallaxY}px, 0) scale(${bgScale})`,
            willChange: 'transform',
            transition: 'transform 0.12s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        >
          <Image
            src="/media/sobre-jojo/bg-historia-parallax.jpg"
            alt="Jojo Mendes Trajetória"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>

        {/* Mobile: Versão vertical */}
        <div
          className="block md:hidden relative w-full h-full origin-top"
          style={{
            transform: prefersReducedMotion
              ? 'none'
              : `translate3d(0, ${bgParallaxY}px, 0) scale(${bgScale})`,
            willChange: 'transform',
            transition: 'transform 0.12s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        >
          <Image
            src="/media/sobre-jojo/bg-historia-parallax-mobile.jpg"
            alt="Jojo Mendes"
            fill
            priority
            sizes="100vw"
            className="object-contain sm:object-cover object-top"
          />
        </div>

        {/* Suave vinheta atmosférica de transição nas bordas */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#08070A]/35 via-transparent via-30% to-[#08070A]/80"
          aria-hidden="true"
        />
        {/* Realce dourado sutil */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_60%,rgba(8,7,10,0.35)_100%)]"
          aria-hidden="true"
        />
      </div>

      {/* =====================================================================
          FILTRO ESCURO SUAVE:
          Delicado para que a foto e a silhueta da Jojo fiquem nítidas ao fundo
         ===================================================================== */}
      <div
        className="pointer-events-none absolute inset-0 z-[5] bg-[#08070A]/35"
        aria-hidden="true"
      >
        {/* Luz cênica que ganha intensidade suave no centro da seção */}
        <div
          className="absolute right-[5%] lg:right-[15%] top-[25%] h-[400px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(239,193,107,0.14)_0%,transparent_70%)] blur-3xl pointer-events-none transition-opacity duration-300"
          style={{
            opacity: prefersReducedMotion
              ? 0.5
              : Math.max(0, 1 - Math.abs(scrollProgress - 0.5) * 2.8),
          }}
        />
      </div>

      {/* =====================================================================
          CONTEÚDO: ACCORDION EDITORIAL POSICIONADO NO LADO DIREITO
          - No Desktop: Alinhado à direita (justify-end), liberando a Jojo e os quadros à esquerda e centro
          - No Mobile: Centralizado com margens elegantes
          - Caixa em vidro fosco translúcido com efeitos de entrada e saída no scroll
         ===================================================================== */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-center lg:justify-end">
        <div
          className="w-full max-w-xl lg:max-w-[540px] xl:max-w-[580px]"
          style={{
            transform: prefersReducedMotion
              ? 'none'
              : `translate3d(${cardTranslateX}px, ${cardTranslateY}px, 0) scale(${cardScale})`,
            opacity: prefersReducedMotion ? 1 : cardOpacity,
            willChange: 'transform, opacity',
            transition:
              'transform 0.12s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.12s ease-out',
          }}
        >
          {/* Card de Vidro Fosco Translúcido Delicado */}
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.12] bg-[#0c0a14]/30 sm:bg-[#0c0a14]/25 p-5 sm:p-7 lg:p-9 shadow-[0_25px_70px_rgba(0,0,0,0.7)] backdrop-blur-xl">
            {/* Filete superior com brilho suave estático */}
            <div
              className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#EFC16B]/40 to-transparent"
              aria-hidden="true"
            />

            {/* Filete superior com brilho dourado dinâmico na rolagem */}
            <div
              className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] overflow-hidden"
              aria-hidden="true"
            >
              <div
                className="h-full w-2/5 bg-gradient-to-r from-transparent via-[#EFC16B] to-transparent opacity-90 transition-transform duration-100 ease-out"
                style={{
                  transform: prefersReducedMotion
                    ? 'none'
                    : `translate3d(${(scrollProgress - 0.45) * 260}%, 0, 0)`,
                  willChange: 'transform',
                }}
              />
            </div>

            {/* Cabeçalho do Card com destaque para a história da cantora */}
            <div className="pb-4 sm:pb-5 border-b border-white/10 mb-2">
              <div className="flex items-center justify-between gap-3 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#EFC16B]" />
                  <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-[#EFC16B] uppercase font-sans">
                    A História da Cantora
                  </span>
                </div>
                <span className="text-[11px] text-white/40 font-mono">
                  03 Atos
                </span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                Capítulos da História
              </h2>
              <p className="text-xs sm:text-sm text-white/60 font-sans mt-1">
                Conheça a trajetória, as raízes e os momentos que moldaram a carreira de Jojo Mendes.
              </p>
            </div>

            {/* Lista Sanfona (Accordion) */}
            <div className="divide-y divide-white/10">
              {TOPICS.map((topic) => {
                const isOpen = openId === topic.id;

                return (
                  <div key={topic.id} className="transition-colors duration-300">
                    {/* Botão Gatilho do Tópico */}
                    <button
                      type="button"
                      onClick={() => toggleItem(topic.id)}
                      aria-expanded={isOpen}
                      aria-controls={`topic-${topic.id}`}
                      className="group flex w-full items-center justify-between py-4 sm:py-5 text-left transition-colors"
                    >
                      <div className="flex items-center gap-3 sm:gap-4 pr-3 min-w-0">
                        {/* Número em caixa baixa dourada */}
                        <span
                          className={`font-mono text-sm sm:text-base font-bold transition-colors ${
                            isOpen ? 'text-[#EFC16B]' : 'text-white/40 group-hover:text-white/70'
                          }`}
                        >
                          {topic.number}
                        </span>

                        <div className="min-w-0">
                          <h3
                            className={`font-display text-base sm:text-lg lg:text-xl font-semibold transition-colors ${
                              isOpen ? 'text-white' : 'text-white/80 group-hover:text-white'
                            }`}
                          >
                            {topic.title}
                          </h3>
                        </div>
                      </div>

                      {/* Botão circular (+ / -) */}
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isOpen
                            ? 'bg-[#EFC16B] border-[#EFC16B] text-black shadow-[0_0_15px_rgba(239,193,107,0.4)] rotate-180'
                            : 'bg-white/5 border-white/15 text-white/70 group-hover:bg-white/10 group-hover:text-white'
                        }`}
                      >
                        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>

                    {/* Conteúdo Expansível com Transição Fluida */}
                    <div
                      id={`topic-${topic.id}`}
                      role="region"
                      aria-labelledby={topic.id}
                      className={`grid transition-all duration-500 ease-in-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100 pb-5 pt-1' : 'grid-rows-[0fr] opacity-0 pb-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        {/* Citação do capítulo com fonte maior e destaque */}
                        <blockquote className="relative pl-3.5 border-l-2 border-[#EFC16B] mb-3.5 mt-1">
                          <p className="font-display italic text-sm sm:text-base lg:text-[17px] text-[#FAF7F1] leading-relaxed">
                            {topic.quote}
                          </p>
                        </blockquote>

                        {/* Texto Narrativo com fonte maior para leitura confortável */}
                        <p className="text-sm sm:text-[15px] lg:text-[16px] text-[#FAF7F1]/85 leading-relaxed font-sans">
                          {topic.text}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Rodapé com CTA Comercial para Eventos */}
            <div className="pt-5 mt-3 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <span className="text-white/45 text-[11px] font-sans">
                Leve esse espetáculo para sua cidade ou evento.
              </span>
              <Link
                href="/contratacao"
                className="inline-flex items-center gap-2 rounded-full bg-[#EFC16B] px-5 py-2.5 text-xs sm:text-sm font-semibold text-black hover:bg-[#FAF7F1] transition-all shadow-[0_0_20px_rgba(239,193,107,0.3)] shrink-0"
              >
                <span>Agendar show para seu evento</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
