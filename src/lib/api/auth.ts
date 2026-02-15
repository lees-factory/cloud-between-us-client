import { PUBLIC_API_URL } from '$env/static/public';
import type {
	SignupRequest,
	SignupResponse,
	SocialLoginRequest,
	SocialLoginResponse
} from '$lib/types/auth';
import { setToken } from '$lib/utils/token';

const API_BASE = PUBLIC_API_URL || 'https://cloud-between.duckdns.org/api/v1'; // Fallback URL if not set

export async function signup(data: SignupRequest): Promise<SignupResponse> {
	const response = await fetch(`${API_BASE}/users/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || `Signup failed: ${response.status} ${response.statusText}`);
	}

	const result = await response.json();
	// Note: If signup response includes a token, save it here.
	// Currently SignupResponse doesn't seem to have a token field based on types.
	// If the backend returns a token on signup, update the type and uncomment below:
	// if (result.token) setToken(result.token);
	
	return result;
}

export async function socialLogin(data: SocialLoginRequest): Promise<SocialLoginResponse> {
	const response = await fetch(`${API_BASE}/users/login/social`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(
			errorData.message || `Social login failed: ${response.status} ${response.statusText}`
		);
	}

	const result = await response.json();
	
	// Assuming the backend returns an accessToken or similar field. 
	// Please update SocialLoginResponse type if the field name is different.
	// For now, I'll assume 'accessToken' or 'token' might be present in the full response 
	// even if not yet in the interface, or I will cast it.
	// If your backend doesn't return a token yet, you need to ask backend developer.
	
	// Let's try to save if it exists in the result (casting to any for safety)
	const token = (result as any).accessToken || (result as any).token;
	if (token) {
		setToken(token);
	}

	return result;
}
