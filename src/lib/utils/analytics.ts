import { browser } from '$app/environment';

declare global {
	interface Window {
		gtag: (...args: any[]) => void;
	}
}

/**
 * Google Analytics 4 Event Tracking Helper
 * @param eventName Event name (e.g., 'login', 'test_complete', 'purchase')
 * @param params Event parameters (optional)
 */
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
	if (browser && typeof window.gtag === 'function') {
		window.gtag('event', eventName, params);
	} else if (browser && import.meta.env.DEV) {
		console.log(`[GA4 Dev] Event: ${eventName}`, params);
	}
};
