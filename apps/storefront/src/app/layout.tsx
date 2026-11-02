import type { Metadata } from 'next';
import './globals.css';
import { Header, Footer } from '@lamaia/ui';

export const metadata: Metadata = {
  title: 'la maia — Fine Fragrance Atelier India',
  description:
    'the invisible made felt. unhurried, artisanal Indian perfumes, Extrait de Parfum, and discovery sets.',
  openGraph: {
    title: 'la maia — Fine Fragrance Atelier India',
    description: 'the invisible made felt. unhurried, artisanal Indian perfumes.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-surface">
      <body className="min-h-full flex flex-col justify-between selection:bg-accent/20 selection:text-ink">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

