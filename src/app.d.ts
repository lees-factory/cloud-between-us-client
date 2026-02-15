import type { User } from "firebase/auth";

declare global {
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
