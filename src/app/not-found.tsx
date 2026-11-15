import React from 'react';
import type { Metadata } from 'next';
import { copy, destinations } from '@/content/copy';
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { SecondaryButton } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: copy.seo.notFound.title,
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center pt-24 pb-16 md:pt-28 md:pb-24 bg-bg">
        <Container className="max-w-xl text-center">
          <h1 className="type-h1 text-text">{copy.notFoundPage.title}</h1>
          <p className="type-body-lg text-text-muted mt-4">
            {copy.notFoundPage.description}
          </p>
          <div className="mt-8 flex justify-center">
            <SecondaryButton href={destinations.home}>
              {copy.notFoundPage.cta}
            </SecondaryButton>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

