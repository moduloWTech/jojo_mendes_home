'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { brand } from '@/content/site';
import { copy, destinations } from '@/content/copy';
import { MobileMenu, type NavItem } from '@/components/navigation/MobileMenu';

interface HeaderMobileProps {
  items: NavItem[];
}

export function HeaderMobile({ items }: HeaderMobileProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="xl:hidden">
      <div className="site-container flex h-16 md:h-[72px] items-center justify-between">
        <Link
          href={destinations.homeAnchor}
          aria-label={copy.nav.logoAriaLabel}
          className="inline-flex items-center py-1"
        >
          <Image
            src={brand.logo.src}
            alt={brand.logo.alt}
            width={brand.logo.width}
            height={brand.logo.height}
            priority
            className="h-auto w-[120px] md:w-[144px] object-contain"
          />
        </Link>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setIsMenuOpen(true)}
          aria-expanded={isMenuOpen}
          aria-haspopup="dialog"
          aria-label={copy.nav.openMenuAriaLabel}
          className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-text hover:bg-surface/60 transition-colors"
        >
          <Menu className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        items={items}
        triggerRef={triggerRef}
      />
    </div>
  );
}

