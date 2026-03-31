'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Lock } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/products'

type FormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  address: string
  delivery: 'courier' | 'pickup'
  payment: 'card' | 'cash'
}

const INITIAL_FORM: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  city: '',
  address: '',
  delivery: 'courier',
  payment: 'card',
}

function Field({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string
  name: keyof FormData
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] tracking-widest uppercase text-muted">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full bg-surface border border-border px-4 py-3 text-sm text-foreground
          placeholder:text-muted/40 focus:outline-none focus:border-gold transition-colors"
      />
    </div>
  )
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore()
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const total = totalPrice()
  const shipping = total >= 30000 ? 0 : 500

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Симуляция отправки заказа (в реальном проекте — POST /api/orders)
    await new Promise((r) => setTimeout(r, 1500))
    clearCart()
    setSubmitted(true)
    setLoading(false)
  }

  // Success screen
  if (submitted) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6 text-center px-6">
        <div className="h-16 w-16 rounded-full border border-gold flex items-center justify-center">
          <span className="text-gold text-2xl">✓</span>
        </div>
        <div>
          <h1 className="font-serif text-3xl text-foreground">Заказ оформлен</h1>
          <div className="mx-auto mt-3 h-px w-12 bg-gold" />
        </div>
        <p className="text-sm text-muted max-w-sm leading-relaxed">
          Подтверждение отправлено на{' '}
          <span className="text-foreground">{form.email}</span>.
          Менеджер свяжется с вами в течение 2 часов.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link
            href="/catalog"
            className="px-8 py-3 bg-gold text-background text-xs tracking-widest uppercase hover:bg-gold-light transition-colors"
          >
            Продолжить покупки
          </Link>
          <Link
            href="/"
            className="px-8 py-3 border border-border text-xs tracking-widest uppercase text-muted hover:border-gold hover:text-gold transition-colors"
          >
            На главную
          </Link>
        </div>
      </div>
    )
  }

  // Empty cart
  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center px-6">
        <h1 className="font-serif text-3xl text-foreground">Корзина пуста</h1>
        <div className="h-px w-12 bg-gold" />
        <Link
          href="/catalog"
          className="text-xs tracking-widest uppercase text-gold hover:text-gold-light transition-colors"
        >
          Перейти в каталог
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">

      {/* Back */}
      <Link
        href="/catalog"
        className="inline-flex items-center gap-2 text-[11px] tracking-widest uppercase text-muted hover:text-gold transition-colors mb-10"
      >
        <ArrowLeft size={14} />
        Продолжить покупки
      </Link>

      <h1 className="font-serif text-3xl text-foreground mb-10">
        Оформление заказа
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">

          {/* Left — form */}
          <div className="space-y-10">

            {/* Contact */}
            <section>
              <h2 className="text-[11px] tracking-widest uppercase text-muted mb-6 pb-3 border-b border-border">
                Контактные данные
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Имя" name="firstName" value={form.firstName}
                  onChange={handleChange} placeholder="Анатолий" required />
                <Field label="Фамилия" name="lastName" value={form.lastName}
                  onChange={handleChange} placeholder="Иванов" required />
                <Field label="Email" name="email" type="email" value={form.email}
                  onChange={handleChange} placeholder="mail@example.com" required />
                <Field label="Телефон" name="phone" type="tel" value={form.phone}
                  onChange={handleChange} placeholder="+7 999 000 00 00" required />
              </div>
            </section>

            {/* Delivery */}
            <section>
              <h2 className="text-[11px] tracking-widest uppercase text-muted mb-6 pb-3 border-b border-border">
                Способ доставки
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 mb-6">
                {([
                  { value: 'courier', label: 'Курьером', sub: 'До двери, 1-2 дня' },
                  { value: 'pickup', label: 'Самовывоз', sub: 'Бесплатно, готов через 2 часа' },
                ] as const).map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-start gap-4 p-4 border cursor-pointer transition-all
                      ${form.delivery === opt.value ? 'border-gold bg-gold/5' : 'border-border hover:border-muted'}`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value={opt.value}
                      checked={form.delivery === opt.value}
                      onChange={handleChange}
                      className="mt-0.5 accent-[#c9a96e]"
                    />
                    <div>
                      <p className="text-sm text-foreground">{opt.label}</p>
                      <p className="text-[11px] text-muted mt-0.5">{opt.sub}</p>
                    </div>
                  </label>
                ))}
              </div>

              {form.delivery === 'courier' && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 animate-fade-in">
                  <Field label="Город" name="city" value={form.city}
                    onChange={handleChange} placeholder="Москва" required />
                  <Field label="Адрес" name="address" value={form.address}
                    onChange={handleChange} placeholder="ул. Тверская, 1, кв. 1" required />
                </div>
              )}
            </section>

            {/* Payment */}
            <section>
              <h2 className="text-[11px] tracking-widest uppercase text-muted mb-6 pb-3 border-b border-border">
                Способ оплаты
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {([
                  { value: 'card', label: 'Картой онлайн', sub: 'Visa, Mastercard, МИР' },
                  { value: 'cash', label: 'При получении', sub: 'Наличными или картой курьеру' },
                ] as const).map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-start gap-4 p-4 border cursor-pointer transition-all
                      ${form.payment === opt.value ? 'border-gold bg-gold/5' : 'border-border hover:border-muted'}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={opt.value}
                      checked={form.payment === opt.value}
                      onChange={handleChange}
                      className="mt-0.5 accent-[#c9a96e]"
                    />
                    <div>
                      <p className="text-sm text-foreground">{opt.label}</p>
                      <p className="text-[11px] text-muted mt-0.5">{opt.sub}</p>
                    </div>
                  </label>
                ))}
              </div>
            </section>

          </div>

          {/* Right — order summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="border border-border p-6 space-y-6">
              <h2 className="text-[11px] tracking-widest uppercase text-muted">
                Ваш заказ
              </h2>

              {/* Items */}
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
                    <div className="relative h-16 w-12 flex-shrink-0 overflow-hidden bg-background">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <p className="text-xs text-foreground leading-tight">{item.product.name}</p>
                        <p className="text-[11px] text-muted mt-0.5">
                          Размер: {item.size} · {item.quantity} шт.
                        </p>
                      </div>
                      <p className="text-xs text-gold">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-border" />

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted">
                  <span>Товары</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-xs text-muted">
                  <span>Доставка</span>
                  <span>{shipping === 0 ? 'Бесплатно' : formatPrice(shipping)}</span>
                </div>
                <div className="h-px bg-border my-2" />
                <div className="flex justify-between text-sm">
                  <span className="text-foreground">Итого</span>
                  <span className="text-gold font-medium">{formatPrice(total + shipping)}</span>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gold text-background text-xs tracking-widest uppercase font-medium
                  hover:bg-gold-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed
                  flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="animate-spin h-3 w-3 border border-background border-t-transparent rounded-full" />
                    Оформляем...
                  </>
                ) : (
                  <>
                    <Lock size={12} />
                    Подтвердить заказ
                  </>
                )}
              </button>

              <p className="text-center text-[10px] text-muted leading-relaxed">
                Нажимая кнопку, вы соглашаетесь с условиями публичной оферты
              </p>
            </div>
          </div>

        </div>
      </form>
    </div>
  )
}
