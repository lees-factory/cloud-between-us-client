import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { Locale } from './translations';

const STORAGE_KEY = 'cloud-between-us-locale';
const COOKIE_NAME = 'locale';

function setCookie(locale: Locale) {
	if (browser) {
		document.cookie = `${COOKIE_NAME}=${locale};path=/;max-age=31536000;SameSite=Lax`;
	}
}

function getInitialLocale(): Locale {
	if (browser) {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored === 'ko' || stored === 'en') {
			setCookie(stored);
			return stored;
		}
		// 브라우저 언어로 자동 감지 (한국어면 ko, 그 외 en)
		const browserLang =
			navigator.language ?? (navigator as { userLanguage?: string }).userLanguage ?? '';
		const detected: Locale = browserLang.startsWith('ko') ? 'ko' : 'en';
		setCookie(detected);
		return detected;
	}
	return 'en';
}

function createLocaleStore() {
	const { subscribe, set, update } = writable<Locale>(getInitialLocale());
	return {
		subscribe,
		set: (locale: Locale) => {
			if (browser) {
				localStorage.setItem(STORAGE_KEY, locale);
				setCookie(locale);
			}
			set(locale);
		},
		toggle: () =>
			update((current) => {
				const next = current === 'ko' ? 'en' : 'ko';
				if (browser) {
					localStorage.setItem(STORAGE_KEY, next);
					setCookie(next);
				}
				return next;
			})
	};
}

export const locale = createLocaleStore();
