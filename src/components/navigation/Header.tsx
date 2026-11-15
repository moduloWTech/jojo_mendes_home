'use client';

import React, { useEffect, useState } from 'react';
import { copy, destinations } from '@/content/copy';
import { HeaderMobile } from '@/components/navigation/HeaderMobile';
import { HeaderDesktop } from '@/components/navigation/HeaderDesktop';
import type { NavItem } from '@/components/navigation/MobileMenu';
import { cn } from '@/lib/utils';

const NAV_ITEMS: NavItem[] = [
  { label: copy.nav.home, href: destinations.homeAnchor },
  { label: copy.nav.history, href: destinations.history },
  { label: copy.nav.schedule, href: destinations.schedule },
  { label: copy.nav.videos, href: destinations.videos },
  { label: copy.nav.gallery, href: destinations.gallery },
  { label: copy.nav.musicians, href: destinations.musicians },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-colors duration-200',
        isScrolled
          ? 'bg-ink-900/90 backdrop-blur-md border-b border-border-subtle shadow-card'
          : 'bg-gradient-to-b from-ink-950/80 via-ink-950/35 to-transparent'
      )}
    >
      <HeaderMobile items={NAV_ITEMS} />
      <HeaderDesktop items={NAV_ITEMS} />
    </header>
  );
}

export const SiteHeader = Header;

