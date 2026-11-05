import type { Metadata } from 'next';
import { Cormorant_Garamond, Pinyon_Script, Jost } from 'next/font/google';
import SmoothScroll from '@/components/SmoothScroll';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const pinyonScript = Pinyon_Script({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-script',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jost',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aixa Nails | Manicurista Profesional a Domicilio en Zona Norte',
  description:
    'Uñas con diseño, hechas a tu medida. Esmaltado semipermanente, polygel y soft gel a domicilio en Zona Norte.',
  keywords: [
    'manicura',
    'uñas a domicilio',
    'zona norte',
    'semipermanente',
    'polygel',
    'soft gel',
    'aixa nails',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${pinyonScript.variable} ${jost.variable}`}
    >
      <body className="bg-brand-bg text-brand-dark font-jost min-h-screen selection:bg-brand-burgundy selection:text-brand-bg-light antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
