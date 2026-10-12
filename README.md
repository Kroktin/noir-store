# NOIR — Premium Fashion Store

Минималистичный премиум e-commerce магазин одежды. Demo-проект для портфолио.

**Demo:** https://noir-store-demo.netlify.app

## Стек

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State:** Zustand (корзина с persist)
- **Images:** Unsplash (бесплатные фото)
- **Deploy:** Netlify

## Возможности

- Каталог с фильтрами по категориям
- Страница товара с галереей и выбором размера
- Корзина (Zustand + localStorage)
- Оформление заказа (симуляция)
- Адаптивная вёрстка (mobile-first)
- Анимации и hover-эффекты

## Запуск локально

```bash
git clone https://github.com/Kroktin/noir-store
cd noir-store
npm install
cp .env.example .env.local
npm run dev
```

Открой [http://localhost:3000](http://localhost:3000)

## Структура

```
src/
├── app/
│   ├── page.tsx              # Hero
│   ├── catalog/page.tsx      # Каталог с фильтрами
│   ├── products/[id]/        # Страница товара + 404
│   └── checkout/page.tsx     # Оформление заказа
├── components/
│   ├── Header.tsx
│   ├── CartDrawer.tsx
│   └── ProductCard.tsx
├── lib/products.ts           # Данные и типы
└── store/cartStore.ts        # Zustand корзина
```
