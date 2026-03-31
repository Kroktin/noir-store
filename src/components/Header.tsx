'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

export function Header() {
  const { totalItems, toggleCart } = useCartStore()
  const count = totalItems()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Nav left */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/catalog"
            className="text-xs tracking-widest uppercase text-muted hover:text-gold transition-colors"
          >
            Каталог
          </Link>
          <Link
            href="/catalog?category=jackets"
            className="text-xs tracking-widest uppercase text-muted hover:text-gold transition-colors"
          >
            Коллекция
          </Link>
        </nav>

        {/* Logo center */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 font-serif text-xl tracking-[0.4em] text-foreground hover:text-gold transition-colors"
        >
          NOIR
        </Link>

        {/* Cart right */}
        <div className="ml-auto flex items-center gap-6">
          <button
            onClick={toggleCart}
            className="relative text-muted hover:text-gold transition-colors"
            aria-label="Корзина"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-background">
                {count}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  )
}
