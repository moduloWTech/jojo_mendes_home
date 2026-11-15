'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { gallery as defaultGallery } from '@/content/site';
import { copy } from '@/content/copy';
import type { GalleryImage } from '@/types/site';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { PhotoLightbox } from '@/components/media/PhotoLightbox';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { cn } from '@/lib/utils';

interface GaleriaSectionProps {
  items?: GalleryImage[];
}

export function GaleriaSection({ items = defaultGallery }: GaleriaSectionProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const lastClickedRef = useRef<HTMLButtonElement | null>(null);

  const hasMoreMobile = items.length > 7;
  const hasMoreDesktop = items.length > 9;
  const visibleItems = isExpanded ? items : items.slice(0, 9);

  const openLightbox = (index: number, trigger: HTMLButtonElement) => {
    lastClickedRef.current = trigger;
    setLightboxIndex(index);
  };

  const handlePrev = () => {
    if (lightboxIndex === null || items.length === 0) return;
    setLightboxIndex((lightboxIndex - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    if (lightboxIndex === null || items.length === 0) return;
    setLightboxIndex((lightboxIndex + 1) % items.length);
  };

  return (
    <section
      id="galeria"
      aria-labelledby="galeria-heading"
      className="section-spacing bg-bg-alt"
    >
      <Container>
        <RevealOnScroll>
          <SectionHeading
            id="galeria-heading"
            eyebrow={copy.gallery.eyebrow}
            title={copy.gallery.title}
          />

          {items.length === 0 ? (
            <div className="rounded-lg border border-border-subtle bg-surface p-6 md:p-8">
              <p className="type-body-lg text-text-muted">
                {copy.gallery.emptyTitle}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4 xl:gap-4">
                {visibleItems.map((photo, index) => {
                  const isFeatured = index === 0;
                  const hideOnMobileWhenCollapsed = !isExpanded && index >= 7;

                  return (
                    <button
                      key={photo.id}
                      type="button"
                      onClick={(e) => openLightbox(index, e.currentTarget)}
                      aria-label={copy.gallery.openPhotoLabel(index + 1)}
                      className={cn(
                        'group relative overflow-hidden rounded-lg border border-border-subtle bg-surface text-left focus-visible:outline-none',
                        isFeatured
                          ? 'col-span-2 aspect-[4/3] xl:col-span-2 xl:row-span-2 xl:aspect-auto xl:min-h-[520px]'
                          : 'col-span-1 aspect-[4/5]',
                        hideOnMobileWhenCollapsed && 'hidden md:block'
                      )}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes={
                          isFeatured
                            ? '(max-width: 767px) 100vw, (max-width: 1199px) 66vw, 600px'
                            : '(max-width: 767px) 50vw, (max-width: 1199px) 33vw, 300px'
                        }
                        style={{
                          objectPosition:
                            photo.positionDesktop ?? 'center 20%',
                        }}
                        className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                      />
                      <span
                        className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </button>
                  );
                })}
              </div>

              {(hasMoreMobile || hasMoreDesktop) && (
                <div
                  className={cn(
                    'mt-7 md:mt-8 xl:mt-10 flex justify-center',
                    !hasMoreDesktop && 'md:hidden'
                  )}
                >
                  <Button
                    variant="secondary"
                    onClick={() => setIsExpanded((prev) => !prev)}
                  >
                    {isExpanded
                      ? copy.gallery.showLessCta
                      : copy.gallery.showMoreCta}
                  </Button>
                </div>
              )}
            </>
          )}
        </RevealOnScroll>
      </Container>

      <PhotoLightbox
        images={items}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        returnFocusRef={lastClickedRef}
      />
    </section>
  );
}

export const PhotoGallery = GaleriaSection;

