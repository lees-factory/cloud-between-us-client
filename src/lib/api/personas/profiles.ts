import { PUBLIC_API_URL } from '$env/static/public';
import type { CloudProfile, CloudType } from '$lib/types/cloud';
import type { Locale } from '$lib/i18n';

const API_BASE = PUBLIC_API_URL || 'https://cloud-between.duckdns.org/api/v1';

export async function getPersonaProfile(typeKey: CloudType, locale: Locale = 'ko'): Promise<CloudProfile> {
	const params = new URLSearchParams({ locale });
	const response = await fetch(`${API_BASE}/personas/profiles/${typeKey}?${params.toString()}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(
			errorData.message || `Failed to fetch persona profile: ${response.status} ${response.statusText}`
		);
	}

	const data = await response.json();

	// Map API response to CloudProfile
	const profile: CloudProfile = {
		type: data.typeKey as CloudType,
		emoji: data.emoji,
		name: data.name,
		subtitle: data.subtitle,
		keywords: data.keywords as [string, string, string, string],
		lore: data.lore,
		traits: {
			strengths: data.strengths || [],
			inLove: data.inLove || [], // API might not return this yet
			shadows: data.shadows || []
		}
	};

	return profile;
}
