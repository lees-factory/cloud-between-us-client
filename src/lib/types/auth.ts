export interface SignupRequest {
	email: string;
	password?: string;
}

export interface SignupResponse {
	id: string;
	email: string;
	isPaid: boolean;
	createdAt: string;
}

export interface SocialLoginRequest {
	socialId: string;
	provider: 'GOOGLE'; // Add other providers if needed (e.g. 'KAKAO', 'APPLE')
	email: string;
}

export interface SocialLoginResponse {
	id: string;
	email: string;
	isPaid: boolean;
	createdAt: string;
}
