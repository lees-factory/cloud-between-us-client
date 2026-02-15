import type { User } from 'firebase/auth';

declare global {
	interface Window {
		dataLayer: any[];
		gtag: (...args: any[]) => void;
	}

	namespace App {
		interface Locals {
			user: User | null;
		}
		interface PageData {
			user: User | null;
		}
		// interface Error {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
