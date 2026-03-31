'use client'

import Image from 'next/image'
import Link from 'next/link'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/products'

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } =
    useCartStore()

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-surface border-l border-border
          flex flex-col transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-xs tracking-widest uppercase text-foreground">
            Корзина {items.length > 0 && `(${items.length})`}
          </h2>
          <button
            onClick={closeCart}
            className="text-muted hover:text-foreground transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={40} strokeWidth={1} className="text-muted" />
              <p className="text-sm text-muted">Корзина пуста</p>
              <button
                onClick={closeCart}
                className="text-xs tracking-widest uppercase text-gold hover:text-gold-light transition-colors"
              >
                Перейти в каталог
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                <div className="relative h-24 w-16 flex-shrink-0 overflow-hidden bg-background">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-foreground">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-muted mt-0.5">Размер: {item.size}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    {/* Quantity */}
                    <div className="flex items-center gap-3 border border-border">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.size, item.quantity - 1)
                        }
                        className="px-2 py-1 text-muted hover:text-foreground transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-xs w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.size, item.quantity + 1)
                        }
                        className="px-2 py-1 text-muted hover:text-foreground transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    {/* Price */}
                    <p className="text-sm text-gold">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
                {/* Remove */}
                <button
                  onClick={() => removeItem(item.product.id, item.size)}
                  className="self-start text-muted hover:text-foreground transition-colors mt-0.5"
                >
                  <X size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted tracking-wide">Итого</span>
              <span className="text-gold font-medium">{formatPrice(totalPrice())}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-gold text-background text-center text-xs tracking-widest uppercase py-4 hover:bg-gold-light transition-colors font-medium"
            >
              Оформить заказ
            </Link>
            <p className="text-center text-[11px] text-muted">
              Бесплатная доставка от 30 000 ₽
            </p>
          </div>
        )}
      </aside>
    </>
  )
}
