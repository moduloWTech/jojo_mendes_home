'use client';

import React from 'react';
import {
  Download,
  FileText,
  Sparkles,
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
   Ícone contextual por categoria de arquivo
   ========================================================================= */
function getAssetIcon(category?: string) {
  switch (category) {
    case 'logo':
      return Sparkles;
    case 'foto':
      return ImageIcon;
    case 'rider':
      return SlidersHorizontal;
    default:
      return FileText;
  }
}

/* =========================================================================
   Card Individual Limpo e Elegante
   ========================================================================= */
interface PressAssetCardProps {
  asset: PressAsset;
}

export function PressAssetCard({ asset }: PressAssetCardProps) {
  const Icon = getAssetIcon(asset.category);

  return (
    <article className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#121217]/95 p-4 sm:p-5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-gold/40 hover:bg-[#16161d] hover:shadow-xl hover:shadow-gold/5">
      {/* Informações do Arquivo */}
      <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
        {/* Ícone refinado */}
        <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gradient-to-br from-gold/20 via-gold/10 to-transparent text-gold-light shadow-md shadow-gold/5 transition-transform duration-300 group-hover:scale-105">
          <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
        </div>

        {/* Textos & Metadados */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
            <span className="text-gold font-bold">{asset.format}</span>
            {asset.sizeLabel && (
              <>
                <span className="text-zinc-600">•</span>
                <span>{asset.sizeLabel}</span>
              </>
            )}
            {asset.badge && (
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-zinc-300">
                {asset.badge}
              </span>
            )}
          </div>
          <h3 className="type-h4 text-text text-sm sm:text-base font-semibold truncate">
            {asset.title}
          </h3>
        </div>
      </div>

      {/* Botão de Download */}
      <div className="shrink-0 w-full sm:w-auto">
        <a
          href={asset.href}
          download
          className="group/btn inline-flex min-h-[42px] w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-gold/30 bg-gold/15 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold text-gold-light transition-all duration-200 hover:border-gold hover:bg-gold hover:text-ink-950 active:scale-[0.98]"
        >
          <Download className="h-4 w-4 transition-transform duration-200 group-hover/btn:-translate-y-0.5" aria-hidden="true" />
          <span>{copy.press.downloadCta}</span>
        </a>
      </div>
    </article>
  );
}

/* =========================================================================
   Componente Principal: ImprensaSection (Design Direto e Limpo)
   ========================================================================= */
interface ImprensaSectionProps {
  items?: PressAsset[];
}

export function ImprensaSection({
  items = defaultPressAssets,
}: ImprensaSectionProps) {
  const validAssets = items.filter((item) => Boolean(item.href?.trim()));

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
            /* Grid Limpo dos Materiais de Divulgação (2 Colunas Elegantes) */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 md:gap-5">
              {validAssets.map((asset) => (
                <PressAssetCard key={asset.id} asset={asset} />
              ))}
            </div>
          )}
        </RevealOnScroll>
      </Container>
    </section>
  );
}
