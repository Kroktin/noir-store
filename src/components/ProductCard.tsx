'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { formatPrice, type Product } from '@/lib/products'
import { useCartStore } from '@/store/cartStore'

type Props = { product: Product }

export function ProductCard({ product }: Props) {
  const [hovered, setHovered] = useState(false)
  const [added, setAdded] = useState(false)
  const addItem = useCartStore((s) => s.addItem)

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const defaultSize = product.sizes[1] ?? product.sizes[0]
    addItem(product, defaultSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div
        className="relative aspect-[3/4] overflow-hidden bg-surface"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-gold text-background text-[10px] font-semibold tracking-widest uppercase px-2 py-1">
              New
            </span>
          )}
          {!product.inStock && (
            <span className="bg-background/80 text-muted text-[10px] tracking-widest uppercase px-2 py-1">
              Нет в наличии
            </span>
          )}
        </div>

        {/* Quick add */}
        {product.inStock && (
          <button
            onClick={handleQuickAdd}
            className={`
              absolute bottom-0 left-0 right-0 py-3 text-xs tracking-widest uppercase
              transition-all duration-300 font-medium
              ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
              ${added
                ? 'bg-gold text-background'
                : 'bg-background/90 text-foreground hover:bg-gold hover:text-background'
              }
            `}
          >
            {added ? '✓ Добавлено' : 'Быстрый заказ'}
          </button>
        )}
      </div>

      {/* Info */}
      <div className="mt-3 space-y-1">
        <p className="text-[11px] text-muted tracking-widest uppercase">
          {product.categoryLabel}
        </p>
        <h3 className="text-sm font-medium text-foreground group-hover:text-gold transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gold font-light">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  )
}
