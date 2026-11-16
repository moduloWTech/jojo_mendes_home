'use client';

import React from 'react';
import Image from 'next/image';

export function HistoriaSection() {
  return (
    <section
      id="historia"
      aria-label="A Artista — Jojo Mendes"
      style={{ clipPath: 'inset(0)' }}
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#08070A]"
    >
      <h2 className="sr-only">A Artista — Jojo Mendes</h2>

      {/* =====================================================================
          CAMADA DE BACKGROUND PARALLAX FIXO:
          - Fica ancorada à viewport iniciando abaixo do header fixo
          - object-top garante que o topo da imagem e as cabeças nunca fiquem cortados
          - Desktop (>= md): Imagem panorâmica unificada
          - Mobile (< md): Imagem vertical dedicada
         ===================================================================== */}
      <div className="fixed inset-x-0 top-[84px] sm:top-[92px] lg:top-[96px] bottom-0 z-0 pointer-events-none select-none">
        {/* Desktop / Tablet: Imagem panorâmica posicionada pelo topo para não cortar cabeças */}
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

        {/* Mobile: Versão vertical dedicada */}
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

        {/* Suave vinheta atmosférica de transição nas bordas sem escurecer as cabeças */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#08070A]/30 via-transparent via-30% to-[#08070A]/85"
          aria-hidden="true"
        />
        {/* Realce dourado sutil */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_60%,rgba(8,7,10,0.4)_100%)]"
          aria-hidden="true"
        />
      </div>

      {/* =====================================================================
          CAMADA ESCURA SEMITRANSPARENTE (OVERLAY DE CONTRASTE):
          - Fica sobre a imagem de background (z-[5])
          - Proporciona contraste perfeito para leitura de textos e títulos
          - Mantém a imagem fotográfica e o efeito parallax visíveis ao fundo
         ===================================================================== */}
      <div
        className="pointer-events-none absolute inset-0 z-[5] bg-[#08070A]/65 backdrop-blur-[0.5px]"
        aria-hidden="true"
      />

      {/* Espaço da dobra preparado para receber os conteúdos e informações */}
      <div className="relative z-10 min-h-[100svh] w-full flex items-center justify-center pointer-events-none" />
    </section>
  );
}

