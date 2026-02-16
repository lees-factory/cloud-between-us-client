import type { CloudProfile } from '$lib/types/cloud';
import type { Locale } from '$lib/i18n/translations';
import cloudProfilesData from './cloud-profiles.json';

export interface CloudMeta {
	displayName: { en: string; ko: string };
	keywords: { en: string[]; ko: string[] };
	loveDrive: { en: string; ko: string };
	conflictReaction: { en: string; ko: string };
	pace: 'fast' | 'slow' | 'steady';
	temperature: 'warm' | 'cool' | 'intense';
	safetyNeeds: { en: string[]; ko: string[] };
	shadows: { en: string[]; ko: string[] };
	trySuggestion: { en: string; ko: string };
	dangerPhrases: { en: { bad: string; better: string }[]; ko: { bad: string; better: string }[] };
	loveExpression: { en: string; ko: string };
	loveSignal: { en: string; ko: string };
}

export const CLOUD_META: Record<string, CloudMeta> = (cloudProfilesData as any).meta;

/** Korean cloud profiles (default, backward-compatible export). */
export const CLOUD_PROFILES: Record<string, CloudProfile> = cloudProfilesData.ko as unknown as Record<
	string,
	CloudProfile
>;

/** English cloud profiles. */
export const CLOUD_PROFILES_EN: Record<string, CloudProfile> =
	cloudProfilesData.en as unknown as Record<string, CloudProfile>;

/** Returns cloud profiles for the given locale. */
export function getCloudProfiles(locale: Locale): Record<string, CloudProfile> {
	return locale === 'ko' ? CLOUD_PROFILES : CLOUD_PROFILES_EN;
}
