# WZprez

Next.js 16+ проект с App Router

## Структура проекта

```
WZprez/
├── app/                    # App Router - маршрутизация и страницы
│   ├── api/               # API Routes (Route Handlers)
│   ├── (routes)/          # Route Groups - группировка маршрутов
│   ├── layout.tsx         # Корневой layout
│   ├── page.tsx           # Главная страница
│   └── globals.css        # Глобальные стили
├── components/            # Переиспользуемые React компоненты
├── hooks/                 # Кастомные React хуки
├── lib/                   # Утилиты и вспомогательные функции
│   └── utils.ts           # Общие утилиты
├── public/                # Статические файлы (изображения, иконки, шрифты)
├── types/                 # TypeScript типы и интерфейсы
│   └── index.ts           # Общие типы
├── next.config.ts         # Конфигурация Next.js
├── tsconfig.json          # Конфигурация TypeScript
└── package.json           # Зависимости проекта
```

## Команды

- `pnpm dev` - запуск сервера разработки
- `pnpm build` - сборка проекта
- `pnpm start` - запуск production сервера
- `pnpm lint` - проверка кода линтером

## Пути импорта

В проекте настроены алиасы путей:
- `@/components` - компоненты
- `@/lib` - утилиты
- `@/types` - типы
- `@/hooks` - хуки
- `@/*` - корень проекта

