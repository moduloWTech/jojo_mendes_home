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
  // Primeiro item aberto por padrão para indicar intuitivamente a interação
  const [openId, setOpenId] = useState<string | null>('raizes');

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="historia"
      aria-label="A Artista — Jojo Mendes"
      style={{ clipPath: 'inset(0)' }}
      className="relative min-h-[100svh] w-full bg-[#08070A] flex items-center justify-center py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-12"
    >
      {/* =====================================================================
          CAMADA DE BACKGROUND PARALLAX FIXO:
          - Ancorada à viewport iniciando abaixo do header fixo
          - object-top garante que as cabeças fiquem 100% visíveis
         ===================================================================== */}
      <div className="fixed inset-x-0 top-[84px] sm:top-[92px] lg:top-[96px] bottom-0 z-0 pointer-events-none select-none">
        {/* Desktop: Imagem panorâmica */}
        <div className="hidden md:block relative w-full h-full">
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
        <div className="block md:hidden relative w-full h-full">
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
      />

      {/* =====================================================================
          CONTEÚDO: ACCORDION EDITORIAL POSICIONADO NO LADO DIREITO
          - No Desktop: Alinhado à direita (justify-end), liberando a Jojo e os quadros à esquerda e centro
          - No Mobile: Centralizado com margens elegantes
          - Caixa em vidro fosco translúcido delicado (estilo GruboGrubo)
         ===================================================================== */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-center lg:justify-end">
        <div className="w-full max-w-xl lg:max-w-[540px] xl:max-w-[580px]">
          
          {/* Card de Vidro Fosco Translúcido Delicado */}
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.12] bg-[#0c0a14]/30 sm:bg-[#0c0a14]/25 p-5 sm:p-7 lg:p-9 shadow-[0_25px_70px_rgba(0,0,0,0.7)] backdrop-blur-xl">
            
            {/* Filete superior com brilho suave */}
            <div
              className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#EFC16B]/60 to-transparent"
              aria-hidden="true"
            />

            {/* Cabeçalho do Card */}
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-2">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#EFC16B]" />
                <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-[#EFC16B] uppercase font-sans">
                  Capítulos da História
                </span>
              </div>
              <span className="text-[11px] text-white/40 font-mono">
                03 Atos
              </span>
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
                      <div className="flex items-start sm:items-center gap-3 sm:gap-4 pr-3 min-w-0">
                        {/* Número em caixa baixa dourada */}
                        <span
                          className={`font-mono text-xs sm:text-sm font-bold transition-colors ${
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
                          <p className="text-[11px] sm:text-xs text-white/45 truncate font-sans mt-0.5">
                            {topic.subtitle}
                          </p>
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
                        {/* Citação do capítulo */}
                        <blockquote className="relative pl-3 border-l-2 border-[#EFC16B] mb-3">
                          <p className="font-display italic text-xs sm:text-sm text-[#FAF7F1]/95 leading-relaxed">
                            {topic.quote}
                          </p>
                        </blockquote>

                        {/* Texto Narrativo */}
                        <p className="text-xs sm:text-[13px] text-[#FAF7F1]/80 leading-relaxed font-sans mb-3.5">
                          {topic.text}
                        </p>

                        {/* Tags em pílulas */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/5">
                          {topic.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-medium text-[#FAF7F1]/75 border border-white/10"
                            >
                              <span className="text-[#EFC16B]">✦</span> {tag}
                            </span>
                          ))}
                        </div>
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
