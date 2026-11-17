'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Music2, Flame, ArrowRight } from 'lucide-react';

interface Act {
  id: string;
  number: string;
  badge: string;
  title: string;
  quote: string;
  text: string;
  spotlightLabel: string;
  pinPosition: { left: string; top: string };
  stats?: Array<{ value: string; label: string }>;
}

const ACTS: Act[] = [
  {
    id: 'raizes',
    number: '01',
    badge: 'Ato 01 · As Raízes & O Violão',
    title: 'Onde a cantiga começou',
    quote: '“Comecei com o violão no colo, ouvindo os mestres do forró e sonhando com o dia em que nossa cantiga conquistaria o Brasil.”',
    text: 'Ainda menina, a música transbordava nas reuniões em família e nas rodas de escola. A sonoridade das cordas de nylon e a poesia do sertão moldaram uma voz autêntica, feita de verdade e sentimento puro.',
    spotlightLabel: 'O Primeiro Violão',
    pinPosition: { left: '16%', top: '82%' },
  },
  {
    id: 'estrada',
    number: '02',
    badge: 'Ato 02 · A Estrada & A Banda',
    title: 'O calor da estrada e dos palcos',
    quote: '“A estrada é uma escola sem fim. A cada quilômetro percorrido, uma nova multidão cantando junto com a gente.”',
    text: 'Com a formação da sua banda e um repertório que não deixa ninguém parado, Jojo Mendes ganhou o circuito de festas, vaquejadas e festivais. A sintonia no palco virou marca registrada de quem nasceu para animar o povo.',
    spotlightLabel: 'A Voz & A Energia',
    pinPosition: { left: '48%', top: '38%' },
  },
  {
    id: 'show',
    number: '03',
    badge: 'Ato 03 · O Grande Show',
    title: 'Eita Cantiga! O Palco se Ilumina',
    quote: '“Quando as luzes acendem e a sanfona chora, eu me entrego por inteiro. A cantiga é nossa maior celebração!”',
    text: 'Hoje, o espetáculo de Jojo Mendes é sinônimo de energia contagiante, estrutura profissional e conexão visceral com o público. Tradição e modernidade unidas no ritmo que faz o coração acelerar.',
    spotlightLabel: 'O Espetáculo ao Vivo',
    pinPosition: { left: '78%', top: '42%' },
    stats: [
      { value: '500+', label: 'Shows Marcantes' },
      { value: '100%', label: 'Energia ao Vivo' },
      { value: 'Brasil', label: 'Turnês & Festivais' },
    ],
  },
];

export function HistoriaSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeAct, setActiveAct] = useState(0);

  // --- CONTROLE DE SCROLL UNIFICADO (DESKTOP E MOBILE) ---
  // No mobile, o scroll vertical por arrasto aciona exatamente a mesma mecânica de transição
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;

      if (totalScrollable <= 0) return;

      const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);

      if (progress < 0.33) {
        setActiveAct(0);
      } else if (progress < 0.67) {
        setActiveAct(1);
      } else {
        setActiveAct(2);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToAct = useCallback((index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const totalScrollable = rect.height - window.innerHeight;

    const targets = [0.12, 0.5, 0.88];
    const targetScroll = scrollTop + rect.top + totalScrollable * targets[index];

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
    setActiveAct(index);
  }, []);

  return (
    <section
      ref={containerRef}
      id="historia"
      aria-label="A Artista — Jojo Mendes"
      style={{ clipPath: 'inset(0)' }}
      className="relative h-[270vh] sm:h-[280vh] w-full bg-[#08070A]"
    >
      {/* =====================================================================
          CAMADA DE BACKGROUND PARALLAX FIXO:
          - Fica ancorada à viewport iniciando abaixo do header fixo
          - Reage com sutil zoom e iluminação dinâmica conforme o Ato ativo
         ===================================================================== */}
      <div className="fixed inset-x-0 top-[84px] sm:top-[92px] lg:top-[96px] bottom-0 z-0 pointer-events-none select-none overflow-hidden">
        {/* Desktop / Tablet: Imagem panorâmica */}
        <div
          className={`hidden md:block relative w-full h-full transition-transform duration-1000 ease-out ${
            activeAct === 0 ? 'scale-100' : activeAct === 1 ? 'scale-[1.03]' : 'scale-[1.05]'
          }`}
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

        {/* Mobile: Versão vertical dedicada */}
        <div
          className={`block md:hidden relative w-full h-full transition-transform duration-1000 ease-out ${
            activeAct === 0 ? 'scale-100' : activeAct === 1 ? 'scale-[1.03]' : 'scale-[1.05]'
          }`}
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

        {/* =====================================================================
            LUZES VIVAS DO MURAL:
            Refletores dinâmicos que acendem partes da foto no desktop e mobile
           ===================================================================== */}
        {/* Ato 1: Foco íntimo âmbar no violão acústico */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-out pointer-events-none ${
            activeAct === 0 ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background:
              'radial-gradient(circle at 22% 82%, rgba(239,193,107,0.45) 0%, rgba(239,193,107,0.1) 35%, transparent 65%)',
          }}
          aria-hidden="true"
        />

        {/* Ato 2: Refletor de palco focado no microfone e no canto */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-out pointer-events-none ${
            activeAct === 1 ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background:
              'radial-gradient(circle at 50% 38%, rgba(239,193,107,0.45) 0%, rgba(239,193,107,0.1) 40%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        {/* Ato 3: Explosão de luzes douradas de festival */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-out pointer-events-none ${
            activeAct === 2 ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(239,193,107,0.55) 0%, rgba(239,193,107,0.15) 50%, transparent 80%), linear-gradient(to top, rgba(239,193,107,0.2) 0%, transparent 50%)',
          }}
          aria-hidden="true"
        />

        {/* Suave vinheta atmosférica de transição nas bordas */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#08070A]/30 via-transparent via-30% to-[#08070A]/85"
          aria-hidden="true"
        />
      </div>

      {/* =====================================================================
          FILTRO ESCURO DINÂMICO:
          - No Ato 1 e 2: Escuridão cinematográfica para leitura
          - No Ato 3: Clareia celebrando o show aceso
         ===================================================================== */}
      <div
        className={`pointer-events-none absolute inset-0 z-[5] backdrop-blur-[0.5px] transition-all duration-1000 ease-out ${
          activeAct === 2 ? 'bg-[#08070A]/40' : 'bg-[#08070A]/60'
        }`}
        aria-hidden="true"
      />

      {/* =====================================================================
          HOTSPOTS INTERATIVOS NO MURAL (DESKTOP):
          Pinos luminosos flutuantes apontando para os detalhes da foto
         ===================================================================== */}
      <div className="hidden lg:block fixed inset-x-0 top-[84px] bottom-0 z-[8] pointer-events-none">
        {ACTS.map((act, idx) => {
          const isActive = activeAct === idx;
          return (
            <div
              key={act.id}
              style={{ left: act.pinPosition.left, top: act.pinPosition.top }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out ${
                isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}
            >
              <div className="relative flex items-center gap-3">
                <span className="relative flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EFC16B] opacity-75" />
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-[#EFC16B] shadow-[0_0_15px_#EFC16B]" />
                </span>
                <div className="rounded-full border border-[#EFC16B]/50 bg-black/80 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-[#EFC16B] shadow-xl whitespace-nowrap">
                  {act.spotlightLabel}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* =====================================================================
          CONTEÚDO STICKY UNIFICADO (DESKTOP & MOBILE):
          - Fica fixado (sticky top-0 h-[100svh]) enquanto o usuário rola
          - No Desktop: Painel lateral à esquerda
          - No Mobile: Card centralizado compacto e ultra legível
         ===================================================================== */}
      <div className="sticky top-0 z-10 h-[100svh] w-full flex items-center justify-center lg:justify-start px-4 sm:px-6 lg:px-14 xl:px-20 pt-[76px] pb-6 sm:py-0">
        <div className="w-full max-w-xl lg:max-w-[500px] xl:max-w-[540px] flex flex-col justify-center">
          
          {/* Indicadores de Ato / Progresso do Scroll */}
          <div className="flex items-center gap-2 mb-3 sm:mb-4 lg:mb-5">
            {ACTS.map((act, idx) => {
              const isActive = activeAct === idx;
              return (
                <button
                  key={act.id}
                  onClick={() => scrollToAct(idx)}
                  className={`group flex items-center gap-1.5 sm:gap-2 rounded-full px-2.5 sm:px-3.5 py-1 text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                    isActive
                      ? 'bg-[#EFC16B] text-black shadow-[0_0_25px_rgba(239,193,107,0.5)] font-bold'
                      : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                  }`}
                  aria-label={`Ir para o Ato ${act.number}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-black' : 'bg-[#EFC16B]'}`} />
                  <span>Ato {act.number}</span>
                </button>
              );
            })}
          </div>

          {/* Área de Transição dos Atos no Scroll */}
          <div className="relative min-h-[360px] sm:min-h-[420px] lg:min-h-[460px]">
            {ACTS.map((act, idx) => {
              const isActive = activeAct === idx;
              return (
                <article
                  key={act.id}
                  className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-out ${
                    isActive
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 translate-y-6 pointer-events-none'
                  }`}
                  aria-hidden={!isActive}
                >
                  <div
                    className={`relative overflow-hidden rounded-2xl sm:rounded-3xl border bg-[#0c0a14]/90 sm:bg-[#0c0a14]/85 p-5 sm:p-7 lg:p-9 shadow-[0_30px_90px_rgba(0,0,0,0.9)] backdrop-blur-2xl transition-colors duration-700 ${
                      isActive ? 'border-[#EFC16B]/40 shadow-[0_0_50px_rgba(239,193,107,0.15)]' : 'border-white/10'
                    }`}
                  >
                    {/* Linha superior de realce dourado */}
                    <div
                      className="absolute top-0 left-6 sm:left-8 right-6 sm:right-8 h-px bg-gradient-to-r from-transparent via-[#EFC16B] to-transparent"
                      aria-hidden="true"
                    />

                    {/* Cabeçalho do Ato */}
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      {idx === 0 && <Music2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#EFC16B]" />}
                      {idx === 1 && <Flame className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#EFC16B]" />}
                      {idx === 2 && <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#EFC16B]" />}
                      <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] sm:tracking-[0.25em] text-[#EFC16B] uppercase font-sans">
                        {act.badge}
                      </span>
                    </div>

                    {/* Título do Ato */}
                    <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white mb-2 sm:mb-3.5 leading-snug sm:leading-tight">
                      {act.title}
                    </h2>

                    {/* Citação em Destaque */}
                    <blockquote className="relative pl-3 sm:pl-4 border-l-2 border-[#EFC16B] mb-2.5 sm:mb-4">
                      <p className="font-display italic text-xs sm:text-sm lg:text-base text-[#FAF7F1]/95 leading-snug sm:leading-relaxed">
                        {act.quote}
                      </p>
                    </blockquote>

                    {/* Texto Narrativo */}
                    <p className="text-[11px] sm:text-xs lg:text-sm text-[#FAF7F1]/80 leading-relaxed font-sans mb-3 sm:mb-4">
                      {act.text}
                    </p>

                    {/* NO ATO 3: Grid de Estatísticas de Impacto (Desktop & Mobile) */}
                    {act.stats && (
                      <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 pt-3 mb-3 border-t border-white/10">
                        {act.stats.map((st) => (
                          <div
                            key={st.label}
                            className="rounded-lg sm:rounded-xl border border-[#EFC16B]/30 bg-[#EFC16B]/10 p-2 sm:p-3 text-center backdrop-blur-sm"
                          >
                            <span className="block font-display text-base sm:text-xl lg:text-2xl font-bold text-[#EFC16B]">
                              {st.value}
                            </span>
                            <span className="block text-[8px] sm:text-[10px] font-medium text-[#FAF7F1]/70 tracking-wider uppercase mt-0.5">
                              {st.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Rodapé do Card com Dica de Scroll no Mobile e Desktop */}
                    <div className="flex items-center justify-between pt-2.5 sm:pt-3 border-t border-white/10 text-[10px] sm:text-xs">
                      {idx === 2 ? (
                        <Link
                          href="/contratacao"
                          className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-[#EFC16B] px-3.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-black hover:bg-[#FAF7F1] transition-colors"
                        >
                          <span>Agendar show</span>
                          <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        </Link>
                      ) : (
                        <span className="text-white/50 text-[10px] sm:text-[11px]">Jojo Mendes · História</span>
                      )}

                      <span className="text-[#EFC16B] flex items-center gap-1 font-mono text-[10px] sm:text-[11px]">
                        Ato {idx + 1}/3 ↓ Role para continuar
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
