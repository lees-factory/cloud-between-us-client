import translationsData from './translations.json';

export const translations = translationsData;

export type Locale = keyof typeof translations;
