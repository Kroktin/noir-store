import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center px-6">
      <p className="text-[11px] tracking-widest uppercase text-muted">404</p>
      <h1 className="font-serif text-4xl text-foreground">Товар не найден</h1>
      <div className="h-px w-12 bg-gold" />
      <Link
        href="/catalog"
        className="mt-4 text-xs tracking-widest uppercase text-gold hover:text-gold-light transition-colors"
      >
        Вернуться в каталог
      </Link>
    </div>
  )
}
