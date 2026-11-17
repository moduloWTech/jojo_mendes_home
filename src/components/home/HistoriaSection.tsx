'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function HistoriaSection() {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0.5); // inicia centralizado para SSR seguro
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  React.useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function'
    ) {
      return;
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const onMotionChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    motionQuery.addEventListener('change', onMotionChange);

    return () => {
      motionQuery.removeEventListener('change', onMotionChange);
    };
  }, []);

  // Monitora a posição relativa da seção na viewport para aplicar o efeito sutil de scroll e parallax
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

  // Parallax tridimensional suave no fundo:
  const bgScale = prefersReducedMotion ? 1 : 1.15 - scrollProgress * 0.18;
  const bgParallaxY = prefersReducedMotion ? 0 : (0.5 - scrollProgress) * 90;

  // Revelação fluida e natural do bloco de texto (sem sobressaltos ou cortes bruscos)
  let contentOpacity = 1;
  let contentTranslateY = 0;

  if (!prefersReducedMotion) {
    if (scrollProgress < 0.38) {
      const t = Math.min(Math.max((scrollProgress - 0.08) / 0.3, 0), 1);
      const ease = 1 - Math.pow(1 - t, 2.5);
      contentOpacity = ease;
      contentTranslateY = (1 - ease) * 36;
    } else if (scrollProgress > 0.82) {
      const t = Math.min(Math.max((scrollProgress - 0.82) / 0.18, 0), 1);
      contentOpacity = 1 - Math.pow(t, 2) * 0.7;
      contentTranslateY = -t * 24;
    }
  }

  return (
    <section
      ref={sectionRef}
      id="historia"
      aria-label="A Artista — Jojo Mendes"
      style={{ clipPath: 'inset(0)' }}
      className="relative min-h-[100svh] w-full bg-[#08070A] flex items-center py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-12 xl:px-16"
    >
      {/* =====================================================================
          TRANSIÇÃO DE FUSÃO ENTRE DOBRAS (AGENDA -> HISTÓRIA):
          - -top-1 e h-24 vedam 100% qualquer fresta ou subpixel entre as dobras
         ===================================================================== */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-1 h-24 bg-gradient-to-b from-[#0D0907] via-[#08070A] to-transparent z-[8]"
        aria-hidden="true"
      />

      {/* =====================================================================
          CAMADA DE BACKGROUND PARALLAX FIXO:
          - inset-0 ocupa 100% da viewport sem gap superior
          - A cantora em performance brilha à direita/centro
          - O fundo se movimenta suavemente em profundidade
         ===================================================================== */}
      <div className="fixed inset-0 z-0 pointer-events-none select-none">
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
            className="object-cover object-center lg:object-[center_top]"
          />
        </div>

        {/* Mobile: Versão vertical com opacidade controlada para preservar acessibilidade total */}
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
            className="object-cover object-top opacity-20"
          />
        </div>

        {/* Suave vinheta atmosférica de transição nas bordas verticais */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#08070A] via-transparent via-20% to-[#08070A]"
          aria-hidden="true"
        />
      </div>

      {/* =====================================================================
          CAMADA ESCURA EQUILIBRADA (DEDICADA DESKTOP & MOBILE):
          - Desktop: preserva a iluminação aberta e contraste suave na esquerda.
          - Mobile: escurecimento reforçado dedicado para legibilidade impecável
            do texto sobreposto à foto.
         ===================================================================== */}
      <div
        className="pointer-events-none absolute inset-0 z-[5]"
        aria-hidden="true"
      >
        {/* Desktop: Base calibrada de 50% + degradê direcional */}
        <div className="hidden lg:block absolute inset-0 bg-[#08070A]/50" />
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#08070A]/90 via-[#08070A]/75 via-42% to-transparent to-85%" />

        {/* Mobile: Fundo escuro profundo para contraste absoluto (Acessibilidade WCAG AAA) */}
        <div className="block lg:hidden absolute inset-0 bg-[#08070A]/95" />

        {/* Transição vertical suave no topo e rodapé da seção */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#08070A] via-[#08070A]/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#08070A] via-[#08070A]/80 to-transparent" />

        {/* Realce dourado sutil e quente no canto superior esquerdo */}
        <div className="absolute left-[5%] top-[15%] h-[350px] w-[350px] rounded-full bg-[radial-gradient(circle,rgba(239,193,107,0.06)_0%,transparent_70%)] blur-3xl pointer-events-none" />
      </div>

      {/* =====================================================================
          CONTEÚDO EDITORIAL: TEXTO SIMPLES E ELEGANTE DO LADO ESQUERDO
          Inspirado na referência de prestígio:
          - Título "Minha Trajetória" com realce dourado
          - Parágrafos fluidos, objetivos e com acessibilidade WCAG AAA
          - Diferenciais relevantes e botão comercial direto
         ===================================================================== */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-start">
        <div
          className="w-full max-w-xl lg:max-w-[560px] xl:max-w-[600px]"
          style={{
            transform: prefersReducedMotion
              ? 'none'
              : `translate3d(0, ${contentTranslateY}px, 0)`,
            opacity: prefersReducedMotion ? 1 : contentOpacity,
            willChange: 'transform, opacity',
            transition:
              'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.15s ease-out',
          }}
        >
          {/* Título Principal */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15] mb-6 sm:mb-7">
            Minha{' '}
            <span className="bg-gradient-to-r from-[#EFC16B] via-[#F3CE85] to-[#C89332] bg-clip-text text-transparent">
              Trajetória
            </span>
          </h2>

          {/* Parágrafos da História (Acessibilidade WCAG AAA: contraste de alta fidelidade) */}
          <div className="space-y-4 sm:space-y-5 text-[17px] sm:text-base lg:text-[16px] text-[#F3F2F6] leading-[1.75] font-sans font-normal">
            <p>
              <strong className="font-semibold text-white">Jojo Mendes</strong> é
              uma das vozes mais autênticas, versáteis e marcantes da música
              popular brasileira. Com um carisma que cativa à primeira vista e uma
              presença de palco eletrizante, ela transita com maestria pelo forró,
              seresta, sertanejo, brega e pelos grandes clássicos populares,
              transformando cada apresentação em uma celebração inesquecível.
            </p>

            <p>
              Inspirada pela riqueza da canção e com raízes fincadas no violão
              de infância, seu repertório costura a emoção dos ritmos populares
              com a pressão e o calor dos grandes espetáculos contemporâneos,
              fazendo todo mundo dançar e cantar junto do início ao fim.
            </p>

            <p>
              Ao lado de sua banda completa e com uma estrutura de alto nível,
              Jojo entrega uma experiência envolvente e cheia de calor humano — o
              espetáculo ideal para grandes festivais, eventos corporativos,
              feiras, praças públicas e festas particulares em todo o país.
            </p>
          </div>

          {/* Botão de Ação Comercial */}
          <div className="mt-8 sm:mt-9">
            <Link
              href="/contratacao"
              className="group inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-[#EFC16B] to-[#C89332] text-[#08070A] font-semibold text-sm sm:text-base shadow-[0_10px_30px_rgba(239,193,107,0.25)] hover:shadow-[0_14px_38px_rgba(239,193,107,0.4)] hover:brightness-105 active:scale-[0.98] transition-all"
            >
              <span>Agendar show para seu evento</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
