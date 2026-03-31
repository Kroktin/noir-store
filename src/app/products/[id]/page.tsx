'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ShoppingBag } from 'lucide-react'
import { getProductById, formatPrice, products } from '@/lib/products'
import { useCartStore } from '@/store/cartStore'
import { ProductCard as RelatedCard } from '@/components/ProductCard'

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)
  if (!product) notFound()

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [activeImage, setActiveImage] = useState(0)
  const [error, setError] = useState(false)
  const [added, setAdded] = useState(false)

  const { addItem, toggleCart } = useCartStore()

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError(true)
      setTimeout(() => setError(false), 2000)
      return
    }
    addItem(product, selectedSize)
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
      toggleCart()
    }, 800)
  }

  // Related products (same category, exclude self)
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">

      {/* Breadcrumb */}
      <Link
        href="/catalog"
        className="inline-flex items-center gap-2 text-[11px] tracking-widest uppercase text-muted hover:text-gold transition-colors mb-10"
      >
        <ArrowLeft size={14} />
        Назад в каталог
      </Link>

      {/* Main layout */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">

        {/* Images */}
        <div className="space-y-3">
          {/* Main image */}
          <div className="relative aspect-[3/4] overflow-hidden bg-surface">
            <Image
              src={product.images[activeImage]}
              alt={product.name}
              fill
              className="object-cover transition-opacity duration-300"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {product.isNew && (
              <span className="absolute top-4 left-4 bg-gold text-background text-[10px] font-semibold tracking-widest uppercase px-3 py-1">
                New
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative h-20 w-14 overflow-hidden flex-shrink-0 transition-all duration-200
                    ${activeImage === i ? 'ring-1 ring-gold' : 'opacity-50 hover:opacity-80'}`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center space-y-8">

          {/* Category + name */}
          <div>
            <p className="text-[11px] tracking-widest uppercase text-muted mb-2">
              {product.categoryLabel}
            </p>
            <h1 className="font-serif text-4xl text-foreground leading-tight">
              {product.name}
            </h1>
            <p className="mt-4 text-2xl text-gold font-light">
              {formatPrice(product.price)}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Description */}
          <p className="text-sm text-muted leading-relaxed">
            {product.description}
          </p>

          {/* Size selector */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] tracking-widest uppercase text-foreground">
                Размер
              </p>
              {error && (
                <p className="text-[11px] text-red-400 tracking-wide animate-fade-in">
                  Выберите размер
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => { setSelectedSize(size); setError(false) }}
                  className={`min-w-[48px] px-3 py-2 text-xs tracking-wider border transition-all duration-200
                    ${selectedSize === size
                      ? 'border-gold text-gold bg-gold/5'
                      : 'border-border text-muted hover:border-foreground hover:text-foreground'
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to cart */}
          {product.inStock ? (
            <button
              onClick={handleAddToCart}
              className={`flex items-center justify-center gap-3 w-full py-4 text-xs tracking-widest uppercase font-medium transition-all duration-300
                ${added
                  ? 'bg-gold/20 text-gold border border-gold'
                  : error
                  ? 'bg-red-900/20 border border-red-800 text-red-400'
                  : 'bg-gold text-background hover:bg-gold-light'
                }`}
            >
              <ShoppingBag size={16} strokeWidth={1.5} />
              {added ? '✓ Добавлено в корзину' : 'Добавить в корзину'}
            </button>
          ) : (
            <div className="w-full py-4 text-center text-xs tracking-widest uppercase text-muted border border-border">
              Нет в наличии
            </div>
          )}

          {/* Delivery info */}
          <div className="space-y-2 border-t border-border pt-6">
            {[
              'Бесплатная доставка от 30 000 ₽',
              'Примерка перед оплатой',
              'Возврат в течение 14 дней',
            ].map((text) => (
              <p key={text} className="flex items-center gap-3 text-[11px] text-muted tracking-wide">
                <span className="h-px w-4 bg-gold/50 flex-shrink-0" />
                {text}
              </p>
            ))}
          </div>

        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-24">
          <div className="mb-10 text-center">
            <h2 className="font-serif text-2xl tracking-[0.2em] text-foreground">
              Похожие товары
            </h2>
            <div className="mx-auto mt-3 h-px w-12 bg-gold" />
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
            {related.map((p) => (
              <RelatedCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
