import React from 'react';
import type { Metadata } from 'next';
import { copy, destinations } from '@/content/copy';
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { SecondaryButton } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: copy.seo.privacy.title,
  description: copy.seo.privacy.description,
};

export default function PrivacidadePage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-16 md:pt-28 md:pb-22 xl:pt-32 xl:pb-28 bg-bg">
        <Container className="max-w-3xl">
          <p className="type-eyebrow text-primary mb-2">
            {copy.privacyPage.eyebrow}
          </p>
          <h1 className="type-h1 text-text">{copy.privacyPage.title}</h1>

          <div className="mt-6 inline-flex rounded-sm border border-primary/40 bg-surface px-3 py-1.5 type-caption text-primary">
            {copy.privacyPage.provisionalBadge}
          </div>

          <div className="mt-8 space-y-5 rounded-lg border border-border-subtle bg-surface p-6 md:p-8">
            {copy.privacyPage.paragraphs.map((paragraph, index) => (
              <p key={index} className="type-body text-text-muted max-w-[65ch]">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8">
            <SecondaryButton href={destinations.home}>
              {copy.privacyPage.backCta}
            </SecondaryButton>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

