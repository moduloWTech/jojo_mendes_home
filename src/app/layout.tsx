import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';
import { copy } from '@/content/copy';
import { brand } from '@/content/site';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  title: copy.seo.home.title,
  description: copy.seo.home.description,
  openGraph: {
    title: copy.seo.home.title,
    description: copy.seo.home.description,
    type: 'website',
    locale: 'pt_BR',
    images: [
      {
        url: brand.logo.src,
        width: brand.logo.width,
        height: brand.logo.height,
        alt: brand.logo.alt,
      },
    ],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${manrope.variable}`}
    >
      <body className="min-h-[100svh] flex flex-col bg-bg text-text antialiased">
        {children}
      </body>
    </html>
  );
}
