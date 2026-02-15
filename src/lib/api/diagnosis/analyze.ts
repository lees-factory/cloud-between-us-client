import { PUBLIC_API_URL } from '$env/static/public';
import { getToken } from '$lib/utils/token';

const API_BASE = PUBLIC_API_URL || 'https://cloud-between.duckdns.org/api/v1';

export interface DiagnosisAnswer {
	questionId: number;
	cloudType: string;
}

export interface AnalyzeRequest {
	answers: DiagnosisAnswer[];
}

export interface AnalyzeResponse {
	personaType: string;
}

export async function analyzeDiagnosis(answers: DiagnosisAnswer[]): Promise<AnalyzeResponse> {
	const token = getToken();
	const headers: HeadersInit = {
		'Content-Type': 'application/json'
	};

	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}

	const response = await fetch(`${API_BASE}/diagnosis/analyze`, {
		method: 'POST',
		headers,
		body: JSON.stringify({ answers })
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(
			errorData.message || `Diagnosis analysis failed: ${response.status} ${response.statusText}`
		);
	}

	return response.json();
}
