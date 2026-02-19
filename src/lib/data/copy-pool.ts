/**
 * copy_pool 데이터: data.json의 locale-at-leaf 구조를
 * build-premium-report 등에서 쓰는 { ko: string[], en: string[] } 형태로 노출.
 */
import type { Locale } from '$lib/i18n/translations';
import data from './data.json';

type TextByLang = { text: { ko: string; en: string } };
function byLang(arr: TextByLang[]): { ko: string[]; en: string[] } {
	return {
		ko: arr.map((x) => x.text.ko),
		en: arr.map((x) => x.text.en)
	};
}

const cp = data.copy_pool as {
	openingPatterns: TextByLang[];
	softeningLines: TextByLang[];
	strengthLines: TextByLang[];
	growthLines: TextByLang[];
	closingLines: TextByLang[];
	shareCardPhrases: TextByLang[];
	shareCardCaptions: TextByLang[];
	frictionPatterns: Record<string, { ko: string; en: string }>;
	defaultActions: Record<
		string,
		{ title: { ko: string; en: string }; desc: { ko: string; en: string } }
	>;
	seasonFirstMeet: Record<string, TextByLang[]>;
	seasonSettling: Record<string, TextByLang[]>;
	seasonLongTerm: TextByLang[];
	misreadingPatterns: Record<
		string,
		Array<{ signal: { ko: string; en: string }; misread: { ko: string; en: string } }>
	>;
};

export const OPENING_PATTERNS = byLang(cp.openingPatterns);
export const SOFTENING_LINES = byLang(cp.softeningLines);
export const STRENGTH_LINES = byLang(cp.strengthLines);
export const GROWTH_LINES = byLang(cp.growthLines);
export const CLOSING_LINES = byLang(cp.closingLines);
export const SHARE_CARD_PHRASES = byLang(cp.shareCardPhrases);
export const SHARE_CARD_CAPTIONS = byLang(cp.shareCardCaptions);
export const FRICTION_PATTERNS = cp.frictionPatterns;
export const DEFAULT_ACTIONS = cp.defaultActions;

/** data 키는 언더스코어(fast_fast). 코드에서 쓰는 키는 하이픈(fast-fast). */
function seasonByLang(keyByUnderscore: string): { ko: string[]; en: string[] } {
	const k = keyByUnderscore as keyof typeof cp.seasonFirstMeet;
	return byLang(cp.seasonFirstMeet[k] ?? []);
}
const firstMeetKeys = Object.keys(cp.seasonFirstMeet) as string[];
export const SEASON_FIRST_MEET = Object.fromEntries(
	firstMeetKeys.map((k) => [k.replace(/_/g, '-'), seasonByLang(k)])
) as Record<string, { ko: string[]; en: string[] }>;

const settlingKeys = Object.keys(cp.seasonSettling) as string[];
export const SEASON_SETTLING = Object.fromEntries(
	settlingKeys.map((k) => [k.replace(/_/g, '-'), byLang(cp.seasonSettling[k] ?? [])])
) as Record<string, { ko: string[]; en: string[] }>;

export const SEASON_LONG_TERM = byLang(cp.seasonLongTerm);

/** locale-at-leaf: 배열 항목이 { signal: { ko, en }, misread: { ko, en } }. lang으로 배열 반환 시 여기서 변환. */
export const MISREADING_PATTERNS = cp.misreadingPatterns;

export function getMisreadingsByLang(
	patternKey: keyof typeof cp.misreadingPatterns,
	lang: Locale
): Array<{ signal: string; misread: string }> {
	const arr = cp.misreadingPatterns[patternKey] ?? [];
	return arr.map((p) => ({ signal: p.signal[lang], misread: p.misread[lang] }));
}
