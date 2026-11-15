import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { SocialLinks as SocialLinksType } from '@/types/site';
import { socialLinks as defaultSocialLinks } from '@/content/site';

interface SocialLinksProps {
  links?: SocialLinksType;
}

export function SocialLinks({ links = defaultSocialLinks }: SocialLinksProps) {
  const entries = [
    { key: 'instagram', label: 'Instagram', url: links.instagram },
    { key: 'tiktok', label: 'TikTok', url: links.tiktok },
    { key: 'youtube', label: 'YouTube', url: links.youtube },
  ].filter((item): item is { key: string; label: string; url: string } =>
    Boolean(item.url && item.url.trim().startsWith('http'))
  );

  if (entries.length === 0) {
    return null;
  }

  return (
    <ul className="flex flex-col gap-2">
      {entries.map((entry) => (
        <li key={entry.key}>
          <a
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${entry.label} oficial de Jojo Mendes`}
            className="inline-flex min-h-[44px] items-center gap-2 text-[15px] font-medium text-text-muted hover:text-primary hover:underline focus-visible:underline underline-offset-4 transition-colors"
          >
            <span>{entry.label}</span>
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}

