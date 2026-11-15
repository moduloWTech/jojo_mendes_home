import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { copy } from '@/content/copy';
import { bookingMedia } from '@/content/site';
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { BookingForm } from '@/components/booking/BookingForm';

export const metadata: Metadata = {
  title: copy.seo.booking.title,
  description: copy.seo.booking.description,
  openGraph: {
    title: copy.seo.booking.title,
    description: copy.seo.booking.description,
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function ContratacaoPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-16 md:pt-28 md:pb-22 xl:pt-32 xl:pb-28 bg-bg">
        <Container className="max-w-[1200px]">
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-12 xl:gap-12 items-start">
            {/* Coluna editorial (4/12 no desktop; no mobile exibe apenas H1 + apoio sem foto antes dos campos) */}
            <div className="xl:col-span-4 space-y-6">
              <div>
                <h1 className="type-h1 text-text">{copy.bookingPage.title}</h1>
                <p className="type-body-lg text-text-muted mt-4">
                  {copy.bookingPage.description}
                </p>
                <p className="hidden xl:block type-body text-text-muted mt-4">
                  {copy.bookingPage.editorialNote}
                </p>
              </div>

              <div className="hidden xl:block relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-border-subtle bg-surface shadow-card">
                <Image
                  src={bookingMedia.pageEditorialPhoto.src}
                  alt={bookingMedia.pageEditorialPhoto.alt}
                  fill
                  sizes="380px"
                  style={{
                    objectPosition:
                      bookingMedia.pageEditorialPhoto.positionDesktop ??
                      'center 20%',
                  }}
                  className="object-cover"
                />
              </div>
            </div>

            {/* Coluna do formulário (8/12 no desktop) */}
            <div className="xl:col-span-8">
              <BookingForm />
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

