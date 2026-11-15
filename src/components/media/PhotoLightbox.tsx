'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryImage } from '@/types/site';
import { copy } from '@/content/copy';

interface PhotoLightboxProps {
  images: GalleryImage[];
  currentIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  returnFocusRef?: React.RefObject<HTMLButtonElement | null>;
}

export function PhotoLightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  returnFocusRef,
}: PhotoLightboxProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const isOpen = currentIndex !== null && images[currentIndex] !== undefined;

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 20);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        returnFocusRef?.current?.focus();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        onNext();
      } else if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onPrev, onNext, returnFocusRef]);

  if (!isOpen || currentIndex === null) return null;

  const activeImage = images[currentIndex];
  if (!activeImage) return null;

  const handleClose = () => {
    onClose();
    returnFocusRef?.current?.focus();
  };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${copy.gallery.title} — ${activeImage.alt}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/95 p-4 md:p-8 backdrop-blur-md"
    >
      {/* Clique no backdrop fecha */}
      <div
        className="fixed inset-0"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Botão Fechar */}
      <button
        ref={closeBtnRef}
        type="button"
        onClick={handleClose}
        aria-label={copy.gallery.closeGalleryLabel}
        className="fixed right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-pill bg-surface/90 border border-border text-text hover:bg-surface-hover transition-colors"
      >
        <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
      </button>

      {/* Navegação Anterior */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={onPrev}
          aria-label={copy.gallery.prevPhotoLabel}
          className="fixed left-3 md:left-6 top-1/2 z-20 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-pill bg-surface/90 border border-border text-text hover:bg-surface-hover transition-colors"
        >
          <ChevronLeft className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
        </button>
      )}

      {/* Imagem em destaque */}
      <figure className="relative z-10 flex max-h-[85svh] w-full max-w-4xl flex-col items-center justify-center">
        <div className="relative h-[70svh] w-full overflow-hidden rounded-lg">
          <Image
            src={activeImage.src}
            alt={activeImage.alt}
            fill
            sizes="(max-width: 1024px) 95vw, 896px"
            className="object-contain"
          />
        </div>
        <figcaption className="mt-4 text-center type-body-sm text-text-muted max-w-[65ch]">
          {activeImage.alt} ({currentIndex + 1} / {images.length})
        </figcaption>
      </figure>

      {/* Navegação Próxima */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={onNext}
          aria-label={copy.gallery.nextPhotoLabel}
          className="fixed right-3 md:right-6 top-1/2 z-20 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-pill bg-surface/90 border border-border text-text hover:bg-surface-hover transition-colors"
        >
          <ChevronRight className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

export const Lightbox = PhotoLightbox;

