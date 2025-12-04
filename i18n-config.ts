export const i18n = {
  defaultLocale: 'ru',
  locales: ['ru', 'en', 'es', 'zh', 'hi'],
} as const;

export type Locale = (typeof i18n)['locales'][number];
