import 'server-only';
import type { Locale } from './i18n-config';

const dictionaries = {
    ru: () => import('./dictionaries/ru.json').then((module) => module.default),
    en: () => import('./dictionaries/en.json').then((module) => module.default),
    es: () => import('./dictionaries/es.json').then((module) => module.default),
    zh: () => import('./dictionaries/zh.json').then((module) => module.default),
    hi: () => import('./dictionaries/hi.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]?.() ?? dictionaries.ru();
