'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X } from 'lucide-react';
import { brand } from '@/content/site';
import { copy, destinations } from '@/content/copy';
import { PrimaryButton } from '@/components/ui/Button';

export interface NavItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export function MobileMenu({
  isOpen,
  onClose,
  items,
  triggerRef,
}: MobileMenuProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 20);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        triggerRef.current?.focus();
        return;
      }

      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
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
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  const handleCloseWithFocus = () => {
    onClose();
    triggerRef.current?.focus();
  };

  return (
    <div
      className="fixed inset-0 z-50 xl:hidden"
      role="dialog"
      aria-modal="true"
      aria-label={copy.nav.mobileNavAriaLabel}
      ref={dialogRef}
    >
      {/* Backdrop para fechar ao clicar fora */}
      <div
        className="fixed inset-0 bg-ink-950/85 backdrop-blur-md transition-opacity duration-200"
        onClick={handleCloseWithFocus}
        aria-hidden="true"
      />

      {/* Drawer de largura total */}
      <div className="relative z-10 flex min-h-[100svh] w-full flex-col justify-between bg-ink-900 px-5 pb-8 pt-3 md:px-8">
        <div>
          <div className="flex h-16 md:h-[72px] items-center justify-between border-b border-border-subtle">
            <Link
              href={destinations.homeAnchor}
              aria-label={copy.nav.logoAriaLabel}
              onClick={onClose}
              className="inline-flex items-center py-1"
            >
              <Image
                src={brand.logo.src}
                alt={brand.logo.alt}
                width={brand.logo.width}
                height={brand.logo.height}
                className="h-auto w-[120px] md:w-[144px] object-contain"
              />
            </Link>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={handleCloseWithFocus}
              aria-label={copy.nav.closeMenuAriaLabel}
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-text hover:bg-surface transition-colors"
            >
              <X className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>

          <nav aria-label={copy.nav.mobileNavAriaLabel} className="mt-6">
            <ul className="divide-y divide-border-subtle">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex min-h-[52px] items-center justify-between py-3 text-[18px] font-medium text-text hover:text-primary transition-colors"
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-border-subtle">
          <PrimaryButton
            href={destinations.booking}
            fullWidth
            onClick={onClose}
          >
            {copy.nav.booking}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

