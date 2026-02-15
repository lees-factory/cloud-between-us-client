import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	return {
		// Server doesn't know about Firebase auth state by default
		user: null
	};
};
