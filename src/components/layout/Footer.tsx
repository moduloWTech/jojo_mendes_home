import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  brand,
  commercialContact,
  socialLinks as defaultSocialLinks,
} from '@/content/site';
import { copy, destinations } from '@/content/copy';
import type { SocialLinks as SocialLinksType } from '@/types/site';
import { Container } from '@/components/ui/Container';
import { SocialLinks } from '@/components/layout/SocialLinks';

const FOOTER_NAV_LINKS = [
  { label: copy.nav.home, href: destinations.homeAnchor },
  { label: copy.nav.history, href: destinations.history },
  { label: copy.nav.schedule, href: destinations.schedule },
  { label: copy.nav.videos, href: destinations.videos },
  { label: copy.nav.gallery, href: destinations.gallery },
  { label: copy.nav.musicians, href: destinations.musicians },
  { label: copy.nav.press, href: destinations.press },
];

interface FooterProps {
  socials?: SocialLinksType;
}

export function Footer({ socials = defaultSocialLinks }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const hasValidSocials = Boolean(
    socials.instagram || socials.tiktok || socials.youtube
  );
  const hasCommercialContact = Boolean(
    commercialContact.email || commercialContact.phone
  );

  return (
    <footer className="bg-ink-900 border-t border-border-subtle pt-12 pb-12 md:pt-16 md:pb-16">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 xl:gap-16 pb-10 border-b border-border-subtle">
          {/* Coluna 1: Marca e resumo curto */}
          <div className="space-y-4">
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
                className="h-auto w-[156px] object-contain"
              />
            </Link>
            <p className="type-body-sm text-text-muted max-w-xs">
              {copy.footer.tagline}
            </p>
          </div>

          {/* Coluna 2: Navegação */}
          <div>
            <h2 className="type-label text-text mb-3">
              {copy.footer.navHeading}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
              {FOOTER_NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[44px] items-center text-[14px] text-text-muted hover:text-primary hover:underline focus-visible:underline underline-offset-4 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Redes oficiais e contato comercial (somente se fornecidos) */}
          {(hasValidSocials || hasCommercialContact) && (
            <div className="space-y-4">
              {hasValidSocials && (
                <div>
                  <h2 className="type-label text-text mb-2">
                    {copy.footer.socialHeading}
                  </h2>
                  <SocialLinks links={socials} />
                </div>
              )}

              {hasCommercialContact && (
                <div className="space-y-1">
                  {commercialContact.email && (
                    <p className="type-body-sm text-text-muted">
                      {commercialContact.email}
                    </p>
                  )}
                  {commercialContact.phone && (
                    <p className="type-body-sm text-text-muted">
                      {commercialContact.phone}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Faixa inferior: Direitos autorais e Política de privacidade */}
        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="type-caption text-text-muted">
            {copy.footer.copyright(currentYear)}
          </p>
          <Link
            href={destinations.privacy}
            className="inline-flex min-h-[44px] items-center type-caption text-text-muted hover:text-primary hover:underline focus-visible:underline underline-offset-4 transition-colors"
          >
            {copy.footer.privacyLink}
          </Link>
        </div>
      </Container>
    </footer>
  );
}

export const SiteFooter = Footer;

