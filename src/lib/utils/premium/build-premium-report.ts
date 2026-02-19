import type { CloudType, PremiumContent } from '$lib/types/cloud';
import type { Locale } from '$lib/i18n/translations';
import { CLOUD_META } from '../../data/cloudProfiles';
import { PAIR_META } from '../../data/chemistryMatrix';
import {
	OPENING_PATTERNS,
	SOFTENING_LINES,
	STRENGTH_LINES,
	GROWTH_LINES,
	CLOSING_LINES,
	SHARE_CARD_PHRASES,
	SHARE_CARD_CAPTIONS,
	FRICTION_PATTERNS,
	DEFAULT_ACTIONS,
	SEASON_FIRST_MEET,
	SEASON_SETTLING,
	SEASON_LONG_TERM,
	getMisreadingsByLang
} from '../../data/copy-pool';

/** PAIR_META 항목: storyBeats, fightOverride 등 locale-at-leaf */
type PairMetaLeaf = {
	storyBeats?: {
		openingImage?: Record<Locale, string>;
		emotionalDynamic?: Record<Locale, string>;
		hiddenStrength?: Record<Locale, string>;
		growthArc?: Record<Locale, string>;
	};
	fightOverride?: {
		frictionTruth?: Record<Locale, string>;
		tryThisInstead?: Record<Locale, string>;
	};
};

/**
 * 간단한 시드 해시: 동일 조합에서 일관된 문장 선택.
 */
function seedHash(a: string, b: string): number {
	const str = `${a}-${b}`;
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = (hash << 5) - hash + str.charCodeAt(i);
		hash |= 0;
	}
	return Math.abs(hash);
}

function pick<T>(arr: readonly T[], seed: number, offset = 0): T {
	return arr[(seed + offset) % arr.length];
}

/** copy-pool은 ko만 있을 수 있음. en 요청 시 ko로 폴백 */
function L<T>(obj: Record<string, T>, lang: Locale): T {
	return (obj[lang] ?? obj['ko']) as T;
}

/**
 * 핵심 생성 엔진.
 * PAIR_META의 storyBeats override 우선 → 없으면 규칙 기반 조합.
 */
export function buildPremiumReport(
	user: CloudType,
	partner: CloudType,
	locale: Locale
): PremiumContent {
	const userMeta = CLOUD_META[user];
	const partnerMeta = CLOUD_META[partner];
	const pairKey = `${user}-${partner}` as `${CloudType}-${CloudType}`;
	const pairMeta = PAIR_META[pairKey] as PairMetaLeaf | undefined;
	const seed = seedHash(user, partner);

	const lang = locale;

	// ── 1. Full Story (4단락) ──

	const openingPattern = L(OPENING_PATTERNS, lang) as string[];
	const openingImage =
		pairMeta?.storyBeats?.openingImage?.[lang] ??
		pick(openingPattern, seed)
			.replace('{userCloud}', userMeta.displayName[lang])
			.replace('{partnerCloud}', partnerMeta.displayName[lang]) +
			' ' +
			pick(L(SOFTENING_LINES, lang) as string[], seed);

	const emotionalDynamic =
		pairMeta?.storyBeats?.emotionalDynamic?.[lang] ??
		buildEmotionalDynamic(userMeta, partnerMeta, lang);

	const hiddenStrength =
		pairMeta?.storyBeats?.hiddenStrength?.[lang] ??
		buildHiddenStrength(userMeta, partnerMeta, lang, seed);

	const growthArc = pairMeta?.storyBeats?.growthArc?.[lang] ?? pick(L(GROWTH_LINES, lang) as string[], seed);

	const fullStory = [openingImage, emotionalDynamic, hiddenStrength, growthArc].join('\n\n');

	// ── 2. Conflict (When You Fight) ──

	const userTendency = userMeta.conflictReaction[lang];
	const partnerTendency = partnerMeta.conflictReaction[lang];

	const frictionTruth =
		pairMeta?.fightOverride?.frictionTruth?.[lang] ??
		buildFrictionTruth(userMeta, partnerMeta, lang);

	const tryThis = pairMeta?.fightOverride?.tryThisInstead?.[lang] ?? userMeta.trySuggestion[lang];

	const tip = `${frictionTruth} ${tryThis}`;

	// ── 3. Shelter (안전감 조건) ──

	const shelter = buildShelter(userMeta, partnerMeta, lang, seed);

	// ── 4. Shadows (반복되는 함정) ──

	const shadows = buildShadows(userMeta, partnerMeta, lang);

	// ── 5. Actions (3 micro actions) ──

	const actions = buildActions(userMeta, partnerMeta, lang, seed);

	// ── 6. Seasons (사랑의 계절) ──

	const seasons = buildSeasons(userMeta, partnerMeta, lang, seed);

	// ── 7. Danger Phrases (금지어) ──

	const dangerPhrases = buildDangerPhrases(userMeta, partnerMeta, lang);

	// ── 8. Love Language (날씨 언어) ──

	const loveLanguage = buildLoveLanguage(userMeta, partnerMeta, lang, seed);

	// ── 9. Share Card ──

	const shareCard = {
		phrase: pick(L(SHARE_CARD_PHRASES, lang) as string[], seed) as string,
		caption: pick(L(SHARE_CARD_CAPTIONS, lang) as string[], seed) as string
	};

	return {
		fullStory,
		conflict: {
			userTendency: capitalizeFirst(userTendency),
			partnerTendency: capitalizeFirst(partnerTendency),
			tip
		},
		shelter,
		shadows,
		seasons,
		dangerPhrases,
		loveLanguage,
		actions,
		shareCard
	};
}

function buildEmotionalDynamic(
	userMeta: (typeof CLOUD_META)[CloudType],
	partnerMeta: (typeof CLOUD_META)[CloudType],
	lang: Locale
): string {
	const userDrive = userMeta.loveDrive[lang];
	const partnerDrive = partnerMeta.loveDrive[lang];

	if (lang === 'ko') {
		return `당신은 ${userDrive}.\n그 사람은 ${partnerDrive}.`;
	}
	return `You ${userDrive}.\nThey ${partnerDrive}.`;
}

function buildHiddenStrength(
	userMeta: (typeof CLOUD_META)[CloudType],
	partnerMeta: (typeof CLOUD_META)[CloudType],
	lang: Locale,
	seed: number
): string {
	const strengthLine = pick(STRENGTH_LINES[lang] as string[], seed);
	const closingLine = pick(CLOSING_LINES[lang] as string[], seed, 1);

	if (lang === 'ko') {
		return `함께할 때, ${strengthLine}. ${closingLine}`;
	}
	return `Together, ${strengthLine}. ${closingLine}`;
}

function buildFrictionTruth(
	userMeta: (typeof CLOUD_META)[CloudType],
	partnerMeta: (typeof CLOUD_META)[CloudType],
	lang: Locale
): string {
	if (userMeta.pace === partnerMeta.pace) {
		if (userMeta.pace === 'slow') {
			return FRICTION_PATTERNS.same_cool[lang];
		}
		return FRICTION_PATTERNS.same_pace[lang];
	}

	if (userMeta.temperature !== partnerMeta.temperature) {
		return FRICTION_PATTERNS.temperature_mismatch[lang];
	}

	return FRICTION_PATTERNS.pace_mismatch[lang];
}

function buildShelter(
	userMeta: (typeof CLOUD_META)[CloudType],
	partnerMeta: (typeof CLOUD_META)[CloudType],
	lang: Locale,
	seed: number
): PremiumContent['shelter'] {
	// safetyNeeds: locale-at-leaf 배열 → 해당 lang 문자열 3개
	type SafetyNeed = { text: Record<Locale, string> };
	const partnerNeeds = (partnerMeta.safetyNeeds as SafetyNeed[]).map((x) => x.text[lang]).slice(0, 3);
	const userNeeds = (userMeta.safetyNeeds as SafetyNeed[]).map((x) => x.text[lang]).slice(0, 3);
	const closingLine = pick(CLOSING_LINES[lang] as string[], seed, 2);

	return { partnerNeeds, userNeeds, closingLine };
}

function buildShadows(
	userMeta: (typeof CLOUD_META)[CloudType],
	partnerMeta: (typeof CLOUD_META)[CloudType],
	lang: Locale
): PremiumContent['shadows'] {
	type ShadowLeaf = { text: Record<Locale, string> };
	return {
		userShadows: (userMeta.shadows as ShadowLeaf[]).map((x) => x.text[lang]),
		partnerShadows: (partnerMeta.shadows as ShadowLeaf[]).map((x) => x.text[lang])
	};
}

function buildActions(
	userMeta: (typeof CLOUD_META)[CloudType],
	partnerMeta: (typeof CLOUD_META)[CloudType],
	lang: Locale,
	seed: number
): PremiumContent['actions'] {
	const appreciationDesc =
		partnerMeta.pace === 'slow'
			? lang === 'ko'
				? `${partnerMeta.displayName.ko} 구름은 깊이 느끼지만 확신이 필요할 때가 많습니다. 무엇을 알아차렸는지 구체적으로 말해주세요.`
				: `${partnerMeta.displayName.en} clouds feel deeply but need to know you notice. Be specific about what you value in them.`
			: DEFAULT_ACTIONS.appreciation.desc[lang];

	const paceDesc =
		userMeta.pace === 'fast' && partnerMeta.pace !== 'fast'
			? lang === 'ko'
				? '모든 침묵이 거리를 뜻하는 것은 아닙니다. 상대의 감정이 정돈되는 시간임을 이해하고 기다려주세요.'
				: "Not every pause is distance. Sometimes it is care forming quietly. Don't rush their processing time."
			: DEFAULT_ACTIONS.pace.desc[lang];

	return [
		{
			title: DEFAULT_ACTIONS.appreciation.title[lang],
			desc: appreciationDesc
		},
		{
			title: DEFAULT_ACTIONS.pace.title[lang],
			desc: paceDesc
		},
		{
			title: DEFAULT_ACTIONS.ritual.title[lang],
			desc: DEFAULT_ACTIONS.ritual.desc[lang]
		}
	];
}

function paceKey(
	userMeta: (typeof CLOUD_META)[CloudType],
	partnerMeta: (typeof CLOUD_META)[CloudType]
): 'fast-fast' | 'fast-slow' | 'slow-fast' | 'slow-slow' {
	const u = userMeta.pace === 'fast' ? 'fast' : 'slow';
	const p = partnerMeta.pace === 'fast' ? 'fast' : 'slow';
	return `${u}-${p}` as 'fast-fast' | 'fast-slow' | 'slow-fast' | 'slow-slow';
}

function temperatureKey(
	userMeta: (typeof CLOUD_META)[CloudType],
	partnerMeta: (typeof CLOUD_META)[CloudType]
): keyof typeof SEASON_SETTLING {
	if (userMeta.temperature === 'intense' || partnerMeta.temperature === 'intense') {
		return 'intense-any';
	}
	const u = userMeta.temperature === 'warm' ? 'warm' : 'cool';
	const p = partnerMeta.temperature === 'warm' ? 'warm' : 'cool';
	return `${u}-${p}` as keyof typeof SEASON_SETTLING;
}

function buildSeasons(
	userMeta: (typeof CLOUD_META)[CloudType],
	partnerMeta: (typeof CLOUD_META)[CloudType],
	lang: Locale,
	seed: number
): PremiumContent['seasons'] {
	const pk = paceKey(userMeta, partnerMeta);
	const tk = temperatureKey(userMeta, partnerMeta);

	const firstMeet = pick(SEASON_FIRST_MEET[pk][lang] as string[], seed);
	const settling = pick(SEASON_SETTLING[tk][lang] as string[], seed);
	const longTerm = pick(SEASON_LONG_TERM[lang] as string[], seed, 1);

	return { firstMeet, settling, longTerm };
}

function buildDangerPhrases(
	userMeta: (typeof CLOUD_META)[CloudType],
	partnerMeta: (typeof CLOUD_META)[CloudType],
	lang: Locale
): PremiumContent['dangerPhrases'] {
	// dangerPhrases: locale-at-leaf 배열 [{ bad: { ko, en }, better: { ko, en } }]
	type DangerPhraseLeaf = { bad: Record<Locale, string>; better: Record<Locale, string> };
	const userPhrasesList = (userMeta.dangerPhrases as DangerPhraseLeaf[]).slice(0, 2);
	const partnerPhrasesList = (partnerMeta.dangerPhrases as DangerPhraseLeaf[]).slice(0, 2);
	return {
		userPhrases: userPhrasesList.map((p: DangerPhraseLeaf) => ({
			bad: p.bad[lang],
			better: p.better[lang]
		})),
		partnerPhrases: partnerPhrasesList.map((p: DangerPhraseLeaf) => ({
			bad: p.bad[lang],
			better: p.better[lang]
		}))
	};
}

function buildLoveLanguage(
	userMeta: (typeof CLOUD_META)[CloudType],
	partnerMeta: (typeof CLOUD_META)[CloudType],
	lang: Locale,
	seed: number
): PremiumContent['loveLanguage'] {
	const userExpression = userMeta.loveExpression[lang] as string;
	const partnerExpression = partnerMeta.loveExpression[lang] as string;

	// Determine misreading pattern based on pace/temperature mismatch (locale-at-leaf)
	let misreadings: Array<{ signal: string; misread: string }>;

	if (userMeta.pace !== partnerMeta.pace) {
		misreadings = getMisreadingsByLang('pace_mismatch', lang);
	} else if (userMeta.temperature !== partnerMeta.temperature) {
		misreadings = getMisreadingsByLang('temperature_mismatch', lang);
	} else if (userMeta.pace === partnerMeta.pace) {
		misreadings = getMisreadingsByLang('same_pace', lang);
	} else {
		misreadings = getMisreadingsByLang('same_temperature', lang);
	}

	return { userExpression, partnerExpression, misreadings };
}

function capitalizeFirst(s: string): string {
	if (!s) return s;
	return s.charAt(0).toUpperCase() + s.slice(1);
}
