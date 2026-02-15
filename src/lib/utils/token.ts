import { browser } from '$app/environment';

const TOKEN_KEY = 'auth_token';

export function setToken(token: string) {
	if (!browser) return;
	localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
	if (!browser) return null;
	return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
	if (!browser) return;
	localStorage.removeItem(TOKEN_KEY);
}
