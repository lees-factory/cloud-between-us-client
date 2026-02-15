import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Firebase auth is primarily client-side.
	// Server-side session can be handled via cookies if needed.
	return resolve(event);
};
