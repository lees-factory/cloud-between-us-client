/**
 * cloud_meta / cloud_profiles: data.json 기반.
 * cloud_meta는 locale-at-leaf.
 * cloud_profiles도 locale-at-leaf → getCloudProfiles(locale)에서 해당 locale로 평탄화해 반환.
 */
import type { Locale } from '$lib/i18n/translations';
import data from './data.json';

export const CLOUD_META = data.cloud_meta as Record<
	string,
	{
		displayName: { ko: string; en: string };
		keywords: Array<{ text: { ko: string; en: string } }>;
		loveDrive: { ko: string; en: string };
		conflictReaction: { ko: string; en: string };
		pace: string;
		temperature: string;
		safetyNeeds: Array<{ text: { ko: string; en: string } }>;
		shadows: Array<{ text: { ko: string; en: string } }>;
		trySuggestion: { ko: string; en: string };
		dangerPhrases: Array<{ bad: { ko: string; en: string }; better: { ko: string; en: string } }>;
		loveExpression: { ko: string; en: string };
		loveSignal: { ko: string; en: string };
	}
>;

/** cloud_profiles: { sunlit: { name: { ko, en }, keywords: [{ text: { ko, en } }], ... }, ... } */
const profilesLeafLocale = data.cloud_profiles as Record<string, Record<string, unknown>>;

function pickLocale(obj: unknown, locale: Locale): unknown {
	if (obj === null || obj === undefined) return obj;
	if (typeof obj === 'object' && 'ko' in obj && 'en' in obj && Object.keys(obj).length === 2) {
		const v = (obj as { ko: string; en: string })[locale];
		return v ?? (obj as { ko: string; en: string }).ko;
	}
	if (Array.isArray(obj)) {
		return (obj as unknown[]).map((item) => {
			if (item !== null && typeof item === 'object' && 'text' in item) {
				const t = (item as { text: { ko: string; en: string } }).text;
				return t[locale] ?? t.ko;
			}
			return pickLocale(item, locale);
		});
	}
	if (typeof obj === 'object') {
		const out: Record<string, unknown> = {};
		for (const [k, v] of Object.entries(obj)) {
			out[k] = pickLocale(v, locale);
		}
		return out;
	}
	return obj;
}

export function getCloudProfiles(locale: Locale): Record<string, unknown> {
	const out: Record<string, unknown> = {};
	for (const [typeKey, meta] of Object.entries(profilesLeafLocale)) {
		out[typeKey] = pickLocale(meta, locale);
	}
	return out;
}

export const CLOUD_PROFILES = getCloudProfiles('ko');
export const CLOUD_PROFILES_EN = getCloudProfiles('en');
