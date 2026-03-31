import Link from 'next/link'

export default function Home() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden">

      {/* Background subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#c9a96e 1px, transparent 1px), linear-gradient(90deg, #c9a96e 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <p className="text-[11px] tracking-[0.5em] uppercase text-muted mb-8">
          Новая коллекция 2025
        </p>

        <h1 className="font-serif text-7xl md:text-9xl tracking-[0.3em] text-foreground leading-none">
          NOIR
        </h1>

        <div className="mt-4 h-px w-32 bg-gold" />

        <p className="mt-6 text-sm tracking-[0.2em] uppercase text-muted max-w-xs leading-relaxed">
          Минимализм. Качество. Вне времени.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/catalog"
            className="px-10 py-4 bg-gold text-background text-xs tracking-widest uppercase font-medium hover:bg-gold-light transition-colors"
          >
            Смотреть коллекцию
          </Link>
          <Link
            href="/catalog?category=accessories"
            className="px-10 py-4 border border-border text-xs tracking-widest uppercase text-muted hover:border-gold hover:text-gold transition-colors"
          >
            Аксессуары
          </Link>
        </div>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-8 flex items-center gap-3 text-[11px] tracking-widest text-muted uppercase">
        <span className="h-px w-8 bg-border" />
        Free shipping from 30 000 ₽
        <span className="h-px w-8 bg-border" />
      </div>

    </div>
  )
}
