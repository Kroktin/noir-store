export type Product = {
  id: string
  name: string
  price: number
  category: 'jackets' | 'trousers' | 'knitwear' | 'accessories'
  categoryLabel: string
  image: string
  images: string[]
  sizes: string[]
  description: string
  isNew?: boolean
  inStock: boolean
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Пальто Obsidian',
    price: 42000,
    category: 'jackets',
    categoryLabel: 'Верхняя одежда',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80',
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Классическое пальто из шерсти мериноса. Строгий силуэт, минималистичные детали.',
    isNew: true,
    inStock: true,
  },
  {
    id: '2',
    name: 'Блейзер Slate',
    price: 28500,
    category: 'jackets',
    categoryLabel: 'Верхняя одежда',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Структурированный блейзер из итальянской шерсти. Идеален для деловых встреч.',
    inStock: true,
  },
  {
    id: '3',
    name: 'Брюки Void',
    price: 18900,
    category: 'trousers',
    categoryLabel: 'Брюки',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Широкие брюки с высокой посадкой. Шерсть с добавлением шёлка.',
    isNew: true,
    inStock: true,
  },
  {
    id: '4',
    name: 'Брюки Eclipse',
    price: 16500,
    category: 'trousers',
    categoryLabel: 'Брюки',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Прямые брюки с лампасами из атласной ленты.',
    inStock: true,
  },
  {
    id: '5',
    name: 'Свитер Ash',
    price: 14200,
    category: 'knitwear',
    categoryLabel: 'Трикотаж',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Оверсайз свитер из кашемира. Мягкая текстура, свободный крой.',
    inStock: true,
  },
  {
    id: '6',
    name: 'Водолазка Mist',
    price: 9800,
    category: 'knitwear',
    categoryLabel: 'Трикотаж',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Базовая водолазка из мериносовой шерсти. Тонкий трикотаж, облегающий крой.',
    inStock: false,
  },
  {
    id: '7',
    name: 'Ремень Onyx',
    price: 7500,
    category: 'accessories',
    categoryLabel: 'Аксессуары',
    image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&q=80',
    ],
    sizes: ['One Size'],
    description: 'Кожаный ремень с матовой пряжкой. Полированная телячья кожа.',
    inStock: true,
  },
  {
    id: '8',
    name: 'Шарф Veil',
    price: 11200,
    category: 'accessories',
    categoryLabel: 'Аксессуары',
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&q=80',
    ],
    sizes: ['One Size'],
    description: 'Шёлковый шарф с тонкой бахромой. Двусторонний, 180×30 см.',
    isNew: true,
    inStock: true,
  },
]

export const categories = [
  { id: 'all', label: 'Все' },
  { id: 'jackets', label: 'Верхняя одежда' },
  { id: 'trousers', label: 'Брюки' },
  { id: 'knitwear', label: 'Трикотаж' },
  { id: 'accessories', label: 'Аксессуары' },
] as const

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
  }).format(price)
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}
