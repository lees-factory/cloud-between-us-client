/**
 * pair_meta / chemistry_matrix: data.json 기반.
 * chemistry_matrix는 locale-at-leaf (skyName: { ko, en }, premium: { fullStory: { ko, en }, ... }).
 */
import type { CloudType, CoupleChemistry, WeatherPhenomenon } from '$lib/types/cloud';
import type { Locale } from '$lib/i18n/translations';
import { buildPremiumReport } from '$lib/utils/premium/build-premium-report';
import data from './data.json';

/** 코드에서는 sunlit-mist 형태 사용. data는 sunlit_mist. */
const pairMetaRaw = data.pair_meta as Record<string, unknown>;
export const PAIR_META = Object.fromEntries(
	Object.entries(pairMetaRaw).map(([k, v]) => [k.replace(/_/g, '-'), v])
) as Record<string, unknown>;

type ChemRow = {
	skyName: string | { ko: string; en: string };
	phenomenon: WeatherPhenomenon;
	narrative: string | { ko: string; en: string };
	warning: string | null | { ko: string; en: string };
	premium?: unknown;
};

function pickLeaf(
	val: string | null | { ko: string; en: string } | undefined,
	locale: Locale
): string | null {
	if (val == null) return null;
	if (typeof val === 'object' && 'ko' in val && 'en' in val) {
		return val[locale] ?? val.ko ?? null;
	}
	return typeof val === 'string' ? val : null;
}

const chemistryMatrix = data.chemistry_matrix as Record<string, ChemRow>;

function toDataKey(pair: string): string {
	return pair.replace(/-/g, '_');
}

/** 리프가 { ko, en }인 트리를 해당 locale 값만 남긴 트리로 변환 */
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

export function getChemistry(
	user: CloudType,
	partner: CloudType,
	locale: Locale = 'ko'
): CoupleChemistry {
	const dataKey = toDataKey(`${user}-${partner}`);
	const reverseDataKey = toDataKey(`${partner}-${user}`);
	const row = chemistryMatrix[dataKey] ?? chemistryMatrix[reverseDataKey];
	if (!row) {
		throw new Error(`Chemistry data not found for ${user} and ${partner}`);
	}

	const skyNameLeaf = row.skyName;
	const skyName =
		typeof skyNameLeaf === 'object' && skyNameLeaf !== null && 'en' in skyNameLeaf
			? skyNameLeaf.en
			: (skyNameLeaf as string);
	const skyNameKo =
		typeof skyNameLeaf === 'object' && skyNameLeaf !== null && 'ko' in skyNameLeaf
			? skyNameLeaf.ko
			: undefined;

	const premium = row.premium
		? ({
				ko: pickLocale(row.premium, 'ko'),
				en: pickLocale(row.premium, 'en')
			} as CoupleChemistry['premium'])
		: ({
				ko: buildPremiumReport(user, partner, 'ko'),
				en: buildPremiumReport(user, partner, 'en')
			} as CoupleChemistry['premium']);

	return {
		user,
		partner,
		skyName,
		skyNameKo,
		phenomenon: row.phenomenon,
		narrative: pickLeaf(row.narrative, locale) ?? '',
		warning: pickLeaf(row.warning, locale),
		premium
	};
}
