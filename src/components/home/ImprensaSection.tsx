import React from 'react';
import { Download, FileText } from 'lucide-react';
import { pressAssets as defaultPressAssets } from '@/content/site';
import { copy } from '@/content/copy';
import type { PressAsset } from '@/types/site';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

interface PressAssetCardProps {
  asset: PressAsset;
}

export function PressAssetCard({ asset }: PressAssetCardProps) {
  const metadata = asset.sizeLabel
    ? `${asset.format} · ${asset.sizeLabel}`
    : asset.format;

  return (
    <article className="flex items-center justify-between gap-4 rounded-lg border border-border-subtle bg-surface p-5 md:p-6 shadow-card">
      <div className="flex items-start gap-3.5 min-w-0">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-ink-900 border border-border-subtle text-primary">
          <FileText className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h3 className="type-h4 text-text truncate">{asset.title}</h3>
          <p className="type-caption text-text-muted mt-1">{metadata}</p>
        </div>
      </div>

      <a
        href={asset.href}
        download
        className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-md border border-cream-50/60 px-4 py-2 text-[14px] font-semibold text-text hover:bg-cream-50/10 transition-colors"
      >
        <Download className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
        <span>{copy.press.downloadCta}</span>
      </a>
    </article>
  );
}

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
      className="section-spacing bg-bg"
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
            <div className="rounded-lg border border-border-subtle bg-surface p-6 md:p-8 max-w-xl">
              <p className="type-body-lg text-text-muted">
                {copy.press.emptyMessage}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 xl:grid-cols-3 xl:gap-6">
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

