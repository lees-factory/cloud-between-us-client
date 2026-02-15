import { PUBLIC_API_URL } from '$env/static/public';
import type { Locale } from '$lib/i18n';

const API_BASE = PUBLIC_API_URL || 'https://cloud-between.duckdns.org/api/v1';

export interface QuestionOption {
	text: string;
	personaType: string;
}

export interface Question {
	ID: number;
	StepID: number;
	QuestionText: string;
	Options: QuestionOption[];
	OrderIndex: number;
}

export async function getQuestions(locale: Locale = 'ko'): Promise<Question[]> {
	const params = new URLSearchParams({ locale });
	const response = await fetch(`${API_BASE}/diagnosis/questions?${params.toString()}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch questions: ${response.status}`);
	}

	return response.json();
}
