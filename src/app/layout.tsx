import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { DeviceProvider } from '@/context/DeviceContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TechCatalogo - Catálogo de Dispositivos Inteligentes',
  description: 'Descubre y compara los mejores smartphones y laptops del mercado. Reseñas detalladas, especificaciones y comentarios de usuarios.',
  keywords: 'smartphones, laptops, tecnología, dispositivos, reseñas, comparativas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full">
      <body className={`${inter.className} h-full flex flex-col bg-gray-50 dark:bg-gray-900`}>
        <DeviceProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </DeviceProvider>
      </body>
    </html>
  );
}
