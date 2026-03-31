'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { products, categories } from '@/lib/products'
import { ProductCard } from '@/components/ProductCard'

function CatalogContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') ?? 'all'
  const [activeCategory, setActiveCategory] = useState(initialCategory)

  const filtered = useMemo(() =>
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory),
    [activeCategory]
  )

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">

      {/* Page title */}
      <div className="mb-12 text-center">
        <h1 className="font-serif text-4xl tracking-[0.2em] text-foreground">
          Коллекция
        </h1>
        <div className="mx-auto mt-3 h-px w-16 bg-gold" />
      </div>

      {/* Filters */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-5 py-2 text-[11px] tracking-widest uppercase transition-all duration-200
              ${activeCategory === cat.id
                ? 'bg-gold text-background'
                : 'text-muted hover:text-foreground border border-transparent hover:border-border'
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="mb-6 text-[11px] text-muted tracking-wider text-center">
        {filtered.length} {filtered.length === 1 ? 'товар' : filtered.length < 5 ? 'товара' : 'товаров'}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </div>
  )
}

export default function CatalogPage() {
  return (
    <Suspense>
      <CatalogContent />
    </Suspense>
  )
}
