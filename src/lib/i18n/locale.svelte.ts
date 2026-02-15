import { browser } from '$app/environment';
import type { Locale } from './translations';

const STORAGE_KEY = 'cloud-between-us-locale';
const COOKIE_NAME = 'locale';

function setCookie(val: Locale) {
	if (browser) {
		document.cookie = `${COOKIE_NAME}=${val};path=/;max-age=31536000;SameSite=Lax`;
	}
}

function getInitialLocale(): Locale {
	if (browser) {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored === 'ko' || stored === 'en') {
			setCookie(stored);
			return stored;
		}
		const browserLang =
			navigator.language ?? (navigator as { userLanguage?: string }).userLanguage ?? '';
		const detected: Locale = browserLang.startsWith('ko') ? 'ko' : 'en';
		setCookie(detected);
		return detected;
	}
	return 'en';
}

// Svelte 5 전역 반응형 상태
class LocaleState {
	current = $state<Locale>(getInitialLocale());

	constructor() {
		if (browser) {
			setCookie(this.current);
		}
	}

	set(val: Locale) {
		this.current = val;
		if (browser) {
			localStorage.setItem(STORAGE_KEY, val);
			setCookie(val);
		}
	}

	toggle() {
		const next = this.current === 'ko' ? 'en' : 'ko';
		this.set(next);
	}
}

export const locale = new LocaleState();
