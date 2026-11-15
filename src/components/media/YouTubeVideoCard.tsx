'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, ExternalLink } from 'lucide-react';
import type { ArtistVideo } from '@/types/site';
import { copy } from '@/content/copy';
import { cn } from '@/lib/utils';

interface YouTubeVideoCardProps {
  video: ArtistVideo;
  isActive: boolean;
  onSelect: () => void;
}

export function YouTubeVideoCard({
  video,
  isActive,
  onSelect,
}: YouTubeVideoCardProps) {
  const [thumbFailed, setThumbFailed] = useState(false);
  const thumbUrl = `https://i.ytimg.com/vi/${encodeURIComponent(
    video.youtubeId
  )}/hqdefault.jpg`;
  const youtubeWatchUrl = `https://www.youtube.com/watch?v=${encodeURIComponent(
    video.youtubeId
  )}`;

  return (
    <article
      className={cn(
        'flex flex-col xl:flex-row xl:items-center gap-3.5 rounded-lg bg-surface p-3.5 md:p-4 border transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-surface-hover',
        isActive ? 'border-primary' : 'border-border-subtle'
      )}
    >
      <button
        type="button"
        onClick={onSelect}
        aria-label={`${copy.videos.playButtonLabel}: ${video.title}`}
        className="group relative aspect-video w-full xl:w-44 shrink-0 overflow-hidden rounded-md bg-ink-950"
      >
        {!thumbFailed ? (
          <Image
            src={thumbUrl}
            alt={video.title}
            fill
            sizes="(max-width: 1199px) 100vw, 176px"
            onError={() => setThumbFailed(true)}
            className="object-cover transition-transform duration-200 group-hover:scale-105"
          />
        ) : (
          <div
            className="absolute inset-0 bg-gradient-to-br from-ink-800 to-ink-950"
            aria-hidden="true"
          />
        )}
        <div
          className="absolute inset-0 bg-ink-950/40 group-hover:bg-ink-950/25 transition-colors"
          aria-hidden="true"
        />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-pill bg-primary text-text-inverse shadow-card transition-transform group-hover:scale-105">
            <Play
              className="h-4 w-4 fill-current"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </span>
        </span>
      </button>

      <div className="flex flex-1 flex-col justify-between gap-2 min-w-0">
        {video.isDemo && (
          <span className="inline-flex self-start rounded-sm bg-ink-950/80 border border-primary/40 px-2 py-0.5 type-caption text-primary">
            {copy.videos.demoBadge}
          </span>
        )}

        <h3 className="text-[17px] leading-[24px] font-bold text-text truncate">
          {video.title}
        </h3>

        <div className="flex flex-wrap items-center gap-4 pt-1">
          <button
            type="button"
            onClick={onSelect}
            className="inline-flex min-h-[44px] items-center gap-1.5 text-[14px] font-semibold text-primary hover:text-primary-hover hover:underline focus-visible:underline underline-offset-4"
          >
            <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
            <span>{copy.videos.playButtonLabel}</span>
          </button>

          <a
            href={youtubeWatchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-1.5 text-[14px] font-medium text-text-muted hover:text-primary hover:underline focus-visible:underline underline-offset-4"
          >
            <span>{copy.videos.watchOnYoutubeCta}</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

