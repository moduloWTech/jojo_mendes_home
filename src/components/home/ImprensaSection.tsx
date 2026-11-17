'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Download,
  Copy,
  Check,
  FileText,
  Sparkles,
  Layers,
  Image as ImageIcon,
  SlidersHorizontal,
} from 'lucide-react';
import { pressAssets as defaultPressAssets } from '@/content/site';
import { copy } from '@/content/copy';
import type { PressAsset } from '@/types/site';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

/* =========================================================================
   Card Individual de Material de Divulgação
   ========================================================================= */
interface PressAssetCardProps {
  asset: PressAsset;
}

export function PressAssetCard({ asset }: PressAssetCardProps) {
  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#121217]/90 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-gold/40 hover:shadow-2xl hover:shadow-gold/5">
      {/* Área de Visualização / Thumbnail */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0c0c0f] border-b border-white/5 flex items-center justify-center p-4">
        {/* Padrão sutil de fundo para imagens com transparência */}
        {asset.isTransparent && (
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                'radial-gradient(circle, #52525b 1px, transparent 1px)',
              backgroundSize: '12px 12px',
            }}
            aria-hidden="true"
          />
        )}

        {asset.thumbnail ? (
          <div className="relative h-full w-full">
            <Image
              src={asset.thumbnail}
              alt={asset.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`transition-transform duration-500 ease-out group-hover:scale-105 ${
                asset.isTransparent ? 'object-contain' : 'object-cover rounded-lg'
              }`}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-zinc-500">
            <ImageIcon className="h-10 w-10 mb-2 stroke-1" aria-hidden="true" />
            <span className="text-xs">Pré-visualização</span>
          </div>
        )}

        {/* Badge da categoria no topo */}
        {asset.badge && (
          <span className="absolute top-3 right-3 rounded-full border border-gold/30 bg-black/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold-light backdrop-blur-md shadow-md">
            {asset.badge}
          </span>
        )}
      </div>

      {/* Conteúdo & Metadados */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
            <span className="text-gold">{asset.format}</span>
            {asset.sizeLabel && (
              <>
                <span>•</span>
                <span>{asset.sizeLabel}</span>
              </>
            )}
          </div>
          <h3 className="type-h4 text-text text-sm sm:text-base font-semibold line-clamp-2">
            {asset.title}
          </h3>
        </div>

        {/* Botão de Download */}
        <div className="mt-4 pt-3 border-t border-white/5">
          <a
            href={asset.href}
            download
            className="group/btn inline-flex w-full min-h-[42px] items-center justify-center gap-2 rounded-xl border border-gold/30 bg-gold/10 px-4 py-2.5 text-xs sm:text-sm font-semibold text-gold-light transition-all duration-200 hover:border-gold hover:bg-gold hover:text-ink-950 active:scale-[0.98]"
          >
            <Download className="h-4 w-4 transition-transform duration-200 group-hover/btn:-translate-y-0.5" aria-hidden="true" />
            <span>{copy.press.downloadCta}</span>
          </a>
        </div>
      </div>
    </article>
  );
}

/* =========================================================================
   Componente Principal: ImprensaSection
   ========================================================================= */
interface ImprensaSectionProps {
  items?: PressAsset[];
}

export function ImprensaSection({
  items = defaultPressAssets,
}: ImprensaSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const validAssets = items.filter((item) => Boolean(item.href?.trim()));

  const filteredAssets =
    selectedCategory === 'all'
      ? validAssets
      : validAssets.filter((asset) => asset.category === selectedCategory);

  const handleCopyRelease = async () => {
    try {
      await navigator.clipboard.writeText(copy.press.releaseText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch {
      // Fallback gracioso caso clipboard API não esteja disponível
    }
  };

  return (
    <section
      id="imprensa"
      aria-labelledby="imprensa-heading"
      className="section-spacing bg-bg relative overflow-hidden"
    >
      <Container>
        <RevealOnScroll>
          <SectionHeading
            id="imprensa-heading"
            eyebrow={copy.press.eyebrow}
            title={copy.press.title}
            description={
              validAssets.length > 0
                ? copy.press.descriptionWithFiles
                : undefined
            }
          />

          {validAssets.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[#121217] p-6 md:p-8 max-w-xl shadow-xl">
              <p className="type-body-lg text-text-muted">
                {copy.press.emptyMessage}
              </p>
            </div>
          ) : (
            <div className="space-y-10 sm:space-y-12">
              {/* Filtros por Categoria */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {[
                  { id: 'all', label: copy.press.categories.all, icon: Layers },
                  { id: 'logo', label: copy.press.categories.logo, icon: Sparkles },
                  { id: 'foto', label: copy.press.categories.foto, icon: ImageIcon },
                  { id: 'rider', label: copy.press.categories.rider, icon: SlidersHorizontal },
                ].map((cat) => {
                  const Icon = cat.icon;
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                        isActive
                          ? 'border border-gold bg-gold text-ink-950 shadow-md shadow-gold/20'
                          : 'border border-white/10 bg-[#16161c] text-zinc-300 hover:border-white/20 hover:bg-[#1f1f26]'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Grid dos Materiais de Divulgação */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                {filteredAssets.map((asset) => (
                  <PressAssetCard key={asset.id} asset={asset} />
                ))}
              </div>

              {/* ===============================================================
                  RELEASE OFICIAL PARA IMPRENSA (Caixa com Botão de Copiar)
                  =============================================================== */}
              <div className="relative rounded-2xl md:rounded-3xl border border-gold/25 bg-[#121217]/95 p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-md overflow-hidden">
                {/* Glow dourado sutil no fundo */}
                <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-gold/10 blur-3xl" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5 mb-5">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 border border-gold/30 text-gold-light">
                      <FileText className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="type-h4 text-text text-base sm:text-lg font-bold">
                        {copy.press.releaseTitle}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        {copy.press.releaseBadge}
                      </p>
                    </div>
                  </div>

                  {/* Botão Copiar Release */}
                  <button
                    type="button"
                    onClick={handleCopyRelease}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gold/40 bg-gold/15 px-4 py-2.5 text-xs sm:text-sm font-semibold text-gold-light transition-all hover:bg-gold/25 active:scale-[0.98]"
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                        <span className="text-emerald-300">
                          {copy.press.copiedReleaseCta}
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" aria-hidden="true" />
                        <span>{copy.press.copyReleaseCta}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Texto do Release */}
                <div className="relative z-10 rounded-xl bg-[#0b0b0e] border border-white/5 p-4 sm:p-6 text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
                  <p>{copy.press.releaseText}</p>
                </div>

                <p className="mt-3 text-xs text-zinc-500">
                  Uso livre autorizado para matérias jornalísticas, releases de prefeituras, fichas de festivais e cartazes de divulgação.
                </p>
              </div>
            </div>
          )}
        </RevealOnScroll>
      </Container>
    </section>
  );
}
