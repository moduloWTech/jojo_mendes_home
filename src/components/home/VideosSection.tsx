'use client';

import React, { useState } from 'react';
import { videos as defaultVideos } from '@/content/site';
import { copy } from '@/content/copy';
import type { ArtistVideo } from '@/types/site';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { YouTubePlayer } from '@/components/media/YouTubePlayer';
import { YouTubeVideoCard } from '@/components/media/YouTubeVideoCard';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

interface VideosSectionProps {
  items?: ArtistVideo[];
}

export function VideosSection({ items = defaultVideos }: VideosSectionProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const featuredVideo = items[selectedIndex] ?? items[0];
  const secondaryVideos = items
    .map((video, index) => ({ video, index }))
    .filter(({ index }) => index !== selectedIndex)
    .slice(0, 4);

  const handleSelectVideo = (index: number) => {
    setSelectedIndex(index);
    setIsPlaying(true);
  };

  return (
    <section
      id="videos"
      aria-labelledby="videos-heading"
      className="section-spacing bg-bg"
    >
      <Container>
        <RevealOnScroll>
          <SectionHeading
            id="videos-heading"
            eyebrow={copy.videos.eyebrow}
            title={copy.videos.title}
          />

          {!featuredVideo ? (
            <div className="rounded-lg border border-border-subtle bg-surface p-6 md:p-8 xl:p-10 max-w-2xl">
              <p className="type-h3 text-text">{copy.videos.emptyTitle}</p>
              <p className="type-body text-text-muted mt-2">
                {copy.videos.emptyDescription}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-12 xl:gap-8 items-start">
              {/* Vídeo principal: 7/12 colunas à esquerda no desktop */}
              <div className="xl:col-span-7">
                <YouTubePlayer
                  video={featuredVideo}
                  isPlaying={isPlaying}
                  onPlay={() => setIsPlaying(true)}
                />
              </div>

              {/* Lista secundária: 5/12 colunas à direita no desktop */}
              {secondaryVideos.length > 0 && (
                <div className="xl:col-span-5 flex flex-col gap-4">
                  {secondaryVideos.map(({ video, index }) => (
                    <YouTubeVideoCard
                      key={video.id}
                      video={video}
                      isActive={index === selectedIndex}
                      onSelect={() => handleSelectVideo(index)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </RevealOnScroll>
      </Container>
    </section>
  );
}

