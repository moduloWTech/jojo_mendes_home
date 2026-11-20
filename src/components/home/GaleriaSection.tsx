'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Maximize2,
  Compass,
  ArrowUpRight,
} from 'lucide-react';
import { gallery as defaultGallery, socialLinks } from '@/content/site';
import { copy } from '@/content/copy';
import type { GalleryImage } from '@/types/site';
import { Container } from '@/components/ui/Container';
import { PhotoLightbox } from '@/components/media/PhotoLightbox';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { cn } from '@/lib/utils';

interface GaleriaSectionProps {
  items?: GalleryImage[];
}

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// Limite máximo de fotos no anel para preservar rigorosamente a geometria do layout
const MAX_GALLERY_PHOTOS = 8;

// =====================================================================
// GEOMETRIA RADIAL EXATA DO ANEL CURVO (ANNULAR SECTOR)
// - Raio Externo: 880px | Raio Interno: 500px | Largura da fatia: 380px
// - Arco lateral direito: centrado em 3 horas (0°), exatamente como na referência
// =====================================================================
const SECTOR_PATH =
  'M 373.02 0.00 A 880 880 0 0 1 373.02 335.82 L 0.00 263.32 A 500 500 0 0 0 0.00 72.51 Z';
const SECTOR_WIDTH = 389.19;
const SECTOR_HEIGHT = 335.82;
const ORIGIN_X = -490.81;
const ORIGIN_Y = 167.91;
const STEP_ANGLE = 24; // Ângulo entre setores adjacentes

export function GaleriaSection({ items = defaultGallery }: GaleriaSectionProps) {
  // Limita estritamente a 8 fotos para manter a geometria e a harmonia radial do anel
  const galleryItems = items.slice(0, MAX_GALLERY_PHOTOS);
  const total = galleryItems.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lastClickedRef = useRef<HTMLButtonElement | null>(null);

  const activePhoto = galleryItems[activeIndex];
  const instagramUrl =
    socialLinks.instagram || 'https://www.instagram.com/jojomendesoficial';

  // Rotação: próxima foto
  const handleNext = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  // Rotação: foto anterior
  const handlePrev = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Suporte às setas do teclado
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleNext, handlePrev, lightboxIndex]);

  const handlePhotoClick = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    lastClickedRef.current = e.currentTarget;
    setActiveIndex(index);
    setLightboxIndex(index);
  };

  if (total === 0) {
    return (
      <section
        id="galeria"
        aria-labelledby="galeria-heading"
        className="section-spacing bg-[#08070A] text-white py-16 sm:py-20"
      >
        <Container>
          <RevealOnScroll>
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-12 text-center max-w-xl mx-auto space-y-4 backdrop-blur-xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#EFC16B]/30 bg-[#EFC16B]/10 text-xs font-semibold uppercase tracking-wider text-[#EFC16B]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{copy.gallery.eyebrow} • Registros Oficiais</span>
              </div>
              <h2
                id="galeria-heading"
                className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight"
              >
                {copy.gallery.title}
              </h2>
              <p className="text-white/60 text-sm max-w-md mx-auto">
                {copy.gallery.emptyTitle}
              </p>
              <div className="pt-2">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[#EFC16B]/40 bg-[#EFC16B]/10 text-[#EFC16B] text-xs font-semibold transition-all hover:bg-[#EFC16B] hover:text-black"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>{copy.gallery.instagramCta}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                </a>
              </div>
            </div>
          </RevealOnScroll>
        </Container>
      </section>
    );
  }

  return (
    <section
      id="galeria"
      aria-labelledby="galeria-heading"
      className="relative min-h-[100svh] w-full bg-[#08070A] overflow-hidden flex flex-col justify-between py-12 sm:py-16 lg:py-20 select-none"
    >
      {/* Luz ambiente cênica de fundo */}
      <div
        className="pointer-events-none absolute -left-[10%] top-[25%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(239,193,107,0.06)_0%,transparent_70%)] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-[5%] top-[35%] h-[650px] w-[650px] rounded-full bg-[radial-gradient(circle,rgba(239,193,107,0.08)_0%,transparent_70%)] blur-3xl"
        aria-hidden="true"
      />

      {/* =====================================================================
          COLUNA ESQUERDA: IDENTIFICAÇÃO EDITORIAL & CONTROLES
         ===================================================================== */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 pointer-events-none">
        <RevealOnScroll>
          <div className="max-w-xl lg:max-w-md xl:max-w-lg pointer-events-auto">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#EFC16B]/30 bg-[#EFC16B]/10 backdrop-blur-md mb-4 sm:mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#EFC16B] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-[#EFC16B] uppercase font-sans">
                {copy.gallery.eyebrow} • Registros Oficiais
              </span>
            </div>

            {/* Título Principal */}
            <h2
              id="galeria-heading"
              className="text-2xl sm:text-3xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15] mb-2 sm:mb-4 lg:mb-5"
            >
              Momentos &{' '}
              <span className="bg-gradient-to-r from-[#EFC16B] via-[#F3CE85] to-[#C89332] bg-clip-text text-transparent">
                Galeria
              </span>
            </h2>

            {/* Texto Descritivo */}
            <p className="text-xs sm:text-sm lg:text-base text-white/75 leading-relaxed font-sans font-light mb-3 sm:mb-4 lg:mb-6">
              Navegue pelo arco e explore registros dos palcos e bastidores.
              A foto em destaque fica colorida e pronta para visualização.
            </p>

            {/* Painel da Foto Selecionada */}
            {activePhoto && (
              <div className="p-3 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md mb-1 sm:mb-2">
                <div className="flex items-center justify-between text-[11px] sm:text-xs lg:text-sm text-[#EFC16B] font-medium mb-1">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    Momento Selecionado
                  </span>
                  <span className="tabular-nums font-semibold tracking-wider text-white/90">
                    {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs lg:text-sm text-white/85 line-clamp-1 sm:line-clamp-2 font-sans font-light">
                  {activePhoto.alt}
                </p>

                {/* Dica de interação */}
                <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-white/[0.08] flex items-center justify-between text-[10px] sm:text-[11px] text-white/50">
                  <span className="inline-flex items-center gap-1">
                    <Compass className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#EFC16B]" />
                    Use as setas para girar
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Maximize2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#EFC16B]" />
                    Clique na foto para ampliar
                  </span>
                </div>
              </div>
            )}

            {/* CTA oficial para o Instagram */}
            <div className="mt-3 sm:mt-4">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir Instagram oficial de Jojo Mendes para ver mais fotos"
                className="group inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-[#EFC16B]/40 bg-gradient-to-r from-[#EFC16B]/15 via-[#EFC16B]/5 to-transparent backdrop-blur-md text-[#EFC16B] text-xs sm:text-sm font-semibold transition-all duration-300 hover:border-[#EFC16B] hover:bg-[#EFC16B] hover:text-[#08070A] hover:shadow-[0_8px_25px_rgba(239,193,107,0.25)] active:scale-95"
              >
                <InstagramIcon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                <span>{copy.gallery.instagramCta}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70 transition-transform duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <p className="text-[11px] text-white/45 mt-2 font-sans font-light">
                {copy.gallery.instagramSubtitle}
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      {/* =====================================================================
          CENTRO / DIREITA: O GRANDE ARCO CIRCULAR (APENAS O ARCO DIREITO VISÍVEL)
          - No Desktop (lg+): Totalmente intacto, mantendo a experiência perfeita
          - No Mobile (<lg): Reduzido e centrado ergonomicamente na tela do smartphone,
            com movimentação controlada exclusivamente pelas setas
         ===================================================================== */}
      <div
        className="relative z-10 w-full flex-1 flex items-center overflow-visible my-1 sm:my-2 lg:my-0 h-[380px] sm:h-[440px] lg:h-auto"
      >
        {/* Contêiner de posicionamento do centro do círculo:
            Desktop intacto (lg:left-[22%]), Mobile centrado (calc(50%-310px)) */}
        <div className="absolute left-[calc(50%-310px)] sm:left-[calc(50%-380px)] lg:left-[22%] xl:left-[26%] 2xl:left-[30%] top-1/2 -translate-y-1/2 overflow-visible">
          {/* Círculo guia interno de sustentação estética (estilo vinil) */}
          <div
            className="pointer-events-none absolute -left-[500px] -top-[500px] w-[1000px] h-[1000px] rounded-full border border-white/[0.06]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -left-[880px] -top-[880px] w-[1760px] h-[1760px] rounded-full border border-white/[0.04]"
            aria-hidden="true"
          />

          {/* Wrapper escalonado da roda: Desktop intacto (scale-[0.96] / scale-[1.05]), Mobile adaptado (scale-[0.45]) */}
          <div className="relative origin-left scale-[0.45] sm:scale-[0.56] md:scale-[0.70] lg:scale-[0.96] xl:scale-[1.05]">
            {galleryItems.map((photo, index) => {
              // Cálculo da distância angular relativa ao activeIndex
              const diff =
                ((index - activeIndex + Math.floor(total / 2)) % total + total) % total -
                Math.floor(total / 2);
              const angle = diff * STEP_ANGLE;
              const isActive = diff === 0;

              // Renderiza apenas as fotos próximas ao arco visível (-3 a +3)
              const isVisible = Math.abs(diff) <= 3;
              if (!isVisible) return null;

              return (
                <button
                  key={photo.id}
                  type="button"
                  onClick={(e) => handlePhotoClick(index, e)}
                  aria-label={copy.gallery.openPhotoLabel(index + 1)}
                  style={{
                    position: 'absolute',
                    left: '490.81px',
                    top: '-167.91px',
                    width: `${SECTOR_WIDTH}px`,
                    height: `${SECTOR_HEIGHT}px`,
                    transformOrigin: `${ORIGIN_X}px ${ORIGIN_Y}px`,
                    transform: `rotate(${angle}deg) ${isActive ? 'scale(1.05)' : 'scale(1)'}`,
                    clipPath: `path('${SECTOR_PATH}')`,
                    transition:
                      'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.35s ease, filter 0.35s ease',
                    zIndex: isActive ? 30 : 20 - Math.abs(diff),
                  }}
                  className={cn(
                    'group absolute focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EFC16B] cursor-pointer'
                  )}
                >
                  <div className="relative w-full h-full overflow-hidden bg-[#121018]">
                    {/* Imagem: Em PRETO E BRANCO para fotos laterais, COLORIDA para a foto ativa */}
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="450px"
                      style={{
                        objectPosition: photo.positionDesktop ?? 'center 20%',
                        filter: isActive
                          ? 'grayscale(0%) contrast(100%) brightness(100%)'
                          : 'grayscale(100%) contrast(120%) brightness(75%)',
                        opacity: isActive ? 1 : 0.65,
                        transition: 'filter 0.4s ease, opacity 0.4s ease, transform 0.4s ease',
                      }}
                      className={cn(
                        'object-cover pointer-events-none',
                        isActive
                          ? 'scale-105'
                          : 'scale-100 group-hover:scale-105 group-hover:opacity-90 group-hover:brightness-90'
                      )}
                    />

                    {/* Leve vinheta de sombra */}
                    <div
                      className={cn(
                        'pointer-events-none absolute inset-0 transition-opacity duration-300',
                        isActive
                          ? 'bg-gradient-to-r from-black/40 via-transparent to-black/20'
                          : 'bg-black/35 group-hover:bg-black/15'
                      )}
                      aria-hidden="true"
                    />

                    {/* Borda vetorial idêntica ao setor curvo */}
                    <svg
                      viewBox={`0 0 ${SECTOR_WIDTH} ${SECTOR_HEIGHT}`}
                      className="pointer-events-none absolute inset-0 h-full w-full"
                      aria-hidden="true"
                    >
                      <path
                        d={SECTOR_PATH}
                        fill="none"
                        stroke={
                          isActive
                            ? '#EFC16B'
                            : 'rgba(255, 255, 255, 0.18)'
                        }
                        strokeWidth={isActive ? '4' : '2'}
                        className="transition-colors duration-300 group-hover:stroke-[#EFC16B]/70"
                      />
                    </svg>

                    {/* Tag 'Em Foco' sutil na foto colorida */}
                    {isActive && (
                      <div className="absolute top-4 right-8 px-2.5 py-1 rounded-full bg-[#EFC16B] text-[#08070A] font-bold text-[10px] tracking-wider uppercase shadow-lg">
                        Em Foco
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* =====================================================================
          RODAPÉ / PÉ DA DOBRA DO LADO DIREITO: SETAS DE NAVEGAÇÃO
          - "no descktop usar setas no pe da dobra do lado direito pra rodar as imagens"
          - Conforme clica, a roda gira trazendo a próxima foto para o centro
         ===================================================================== */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 flex items-center justify-between pt-4">
        {/* Indicador de progresso */}
        <div className="text-xs text-white/50 hidden sm:flex items-center gap-2 font-sans">
          <span className="h-1.5 w-1.5 rounded-full bg-[#EFC16B]" />
          <span>Apenas a foto ativa fica colorida • Clique para ampliar</span>
        </div>

        {/* Ações e setas de navegação no canto inferior direito */}
        <div className="ml-auto flex items-center gap-3">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir Instagram para ver mais fotos de Jojo Mendes"
            className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/15 bg-[#121019]/80 backdrop-blur-md text-xs font-medium text-white/75 hover:text-[#EFC16B] hover:border-[#EFC16B]/60 transition-all duration-200"
          >
            <InstagramIcon className="w-3.5 h-3.5 text-[#EFC16B]" />
            <span>+ fotos no Instagram</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>

          <button
            type="button"
            onClick={handlePrev}
            aria-label="Girar para foto anterior"
            className="group flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/15 bg-[#121019]/85 backdrop-blur-md text-white/80 transition-all duration-200 hover:scale-105 hover:border-[#EFC16B] hover:text-[#EFC16B] active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          >
            <ChevronLeft className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Girar para próxima foto"
            className="group flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[#EFC16B]/40 bg-gradient-to-r from-[#EFC16B]/15 to-[#C89332]/25 backdrop-blur-md text-[#EFC16B] transition-all duration-200 hover:scale-105 hover:border-[#EFC16B] hover:bg-[#EFC16B] hover:text-[#08070A] active:scale-95 shadow-[0_4px_25px_rgba(239,193,107,0.25)]"
          >
            <ChevronRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* Lightbox para ampliação em tela cheia ao clicar */}
      <PhotoLightbox
        images={galleryItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() =>
          setLightboxIndex((prev) =>
            prev !== null ? (prev - 1 + total) % total : 0
          )
        }
        onNext={() =>
          setLightboxIndex((prev) =>
            prev !== null ? (prev + 1) % total : 0
          )
        }
        returnFocusRef={lastClickedRef}
      />
    </section>
  );
}

export const PhotoGallery = GaleriaSection;
