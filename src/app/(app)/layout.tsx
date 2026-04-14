import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/index.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bistrot De La Cour',
  description: 'L\'Art de la Convivialité au cœur de Charleroi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-stone-50 text-stone-900">
            <Navigation />
            <main>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
