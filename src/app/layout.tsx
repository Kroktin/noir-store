import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { CartDrawer } from '@/components/CartDrawer'

export const metadata: Metadata = {
  title: 'NOIR — Premium Fashion',
  description: 'Минималистичный премиум магазин одежды',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="bg-background text-foreground min-h-screen">
        <Header />
        <CartDrawer />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  )
}
