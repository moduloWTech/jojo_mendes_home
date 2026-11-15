'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, ExternalLink } from 'lucide-react';
import type { ArtistVideo } from '@/types/site';
import { copy } from '@/content/copy';

interface YouTubePlayerProps {
  video: ArtistVideo;
  isPlaying: boolean;
  onPlay: () => void;
}

export function YouTubePlayer({ video, isPlaying, onPlay }: YouTubePlayerProps) {
  const [thumbFailed, setThumbFailed] = useState(false);
  const youtubeWatchUrl = `https://www.youtube.com/watch?v=${encodeURIComponent(
    video.youtubeId
  )}`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(
    video.youtubeId
  )}?autoplay=1&rel=0`;
  const thumbUrl = `https://i.ytimg.com/vi/${encodeURIComponent(
    video.youtubeId
  )}/hqdefault.jpg`;

  return (
    <div className="flex flex-col rounded-xl bg-surface border border-border-subtle overflow-hidden shadow-card">
      <div className="relative aspect-video w-full bg-ink-950 overflow-hidden">
        {isPlaying ? (
          <iframe
            key={video.youtubeId}
            src={embedUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={onPlay}
            aria-label={`${copy.videos.playButtonLabel}: ${video.title}`}
            className="group relative flex h-full w-full items-center justify-center overflow-hidden text-left focus-visible:outline-none"
          >
            {!thumbFailed ? (
              <Image
                src={thumbUrl}
                alt={video.title}
                fill
                sizes="(max-width: 1199px) 100vw, 58vw"
                onError={() => setThumbFailed(true)}
                className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
              />
            ) : (
              <div
                className="absolute inset-0 bg-gradient-to-br from-ink-800 via-ink-900 to-wine-900/50"
                aria-hidden="true"
              />
            )}

            <div
              className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/35 to-ink-950/20 transition-opacity group-hover:opacity-90"
              aria-hidden="true"
            />

            {video.isDemo && (
              <span className="absolute left-3 top-3 z-10 rounded-sm bg-ink-950/90 border border-primary/50 px-2.5 py-1 type-caption text-primary">
                {copy.videos.demoBadge}
              </span>
            )}

            <span className="relative z-10 inline-flex items-center gap-2.5 rounded-pill bg-primary px-5 py-3 text-text-inverse font-bold shadow-card transition-transform duration-150 ease-out group-hover:bg-primary-hover group-hover:scale-105">
              <Play
                className="h-5 w-5 fill-current"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <span>{copy.videos.playButtonLabel}</span>
            </span>
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 md:p-6">
        <div className="space-y-1">
          {video.isDemo && (
            <p className="type-caption text-primary">{copy.videos.demoBadge}</p>
          )}
          <h3 className="type-h4 text-text">{video.title}</h3>
        </div>

        <a
          href={youtubeWatchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] shrink-0 items-center gap-2 text-[15px] font-semibold text-primary hover:text-primary-hover hover:underline focus-visible:underline underline-offset-4 transition-colors"
        >
          <span>{copy.videos.watchOnYoutubeCta}</span>
          <ExternalLink className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

