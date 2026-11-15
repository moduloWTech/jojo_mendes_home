import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { brand } from '@/content/site';
import { copy, destinations } from '@/content/copy';
import { PrimaryButton } from '@/components/ui/Button';
import type { NavItem } from '@/components/navigation/MobileMenu';

interface HeaderDesktopProps {
  items: NavItem[];
}

export function HeaderDesktop({ items }: HeaderDesktopProps) {
  return (
    <div className="hidden xl:block">
      <div className="site-container flex h-20 items-center justify-between gap-8">
        <Link
          href={destinations.homeAnchor}
          aria-label={copy.nav.logoAriaLabel}
          className="inline-flex items-center py-1 shrink-0"
        >
          <Image
            src={brand.logo.src}
            alt={brand.logo.alt}
            width={brand.logo.width}
            height={brand.logo.height}
            priority
            className="h-auto w-[168px] object-contain"
          />
        </Link>

        <nav aria-label={copy.nav.mainNavAriaLabel}>
          <ul className="flex items-center gap-7">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-[44px] items-center text-[15px] font-medium text-text hover:text-primary hover:underline focus-visible:underline underline-offset-8 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shrink-0">
          <PrimaryButton href={destinations.booking} className="min-h-[48px] px-6">
            {copy.nav.booking}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

