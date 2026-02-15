import type { CloudType, PremiumContent } from '$lib/types/cloud';
import type { Locale } from '$lib/i18n/translations';
import { CLOUD_META } from '$lib/data/cloud-meta';
import { PAIR_META } from '$lib/data/pair-meta';
import {
	OPENING_PATTERNS,
	SOFTENING_LINES,
	STRENGTH_LINES,
	GROWTH_LINES,
	CLOSING_LINES,
	SHARE_CARD_PHRASES,
	SHARE_CARD_CAPTIONS,
	SHELTER_CLOSING_LINES,
	FRICTION_PATTERNS,
	DEFAULT_ACTIONS,
	SEASON_FIRST_MEET,
	SEASON_SETTLING,
	SEASON_LONG_TERM,
	MISREADING_PATTERNS
} from '$lib/data/copy-pool';

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
	const pairMeta = PAIR_META[pairKey];
	const seed = seedHash(user, partner);

	const lang = locale;

	// ── 1. Full Story (4단락) ──

	const openingImage = pairMeta?.storyBeats?.openingImage?.[lang]
		?? pick(OPENING_PATTERNS[lang], seed)
			.replace('{userCloud}', userMeta.displayName[lang])
			.replace('{partnerCloud}', partnerMeta.displayName[lang])
		+ ' ' + pick(SOFTENING_LINES[lang], seed);

	const emotionalDynamic = pairMeta?.storyBeats?.emotionalDynamic?.[lang]
		?? buildEmotionalDynamic(userMeta, partnerMeta, lang);

	const hiddenStrength = pairMeta?.storyBeats?.hiddenStrength?.[lang]
		?? buildHiddenStrength(userMeta, partnerMeta, lang, seed);

	const growthArc = pairMeta?.storyBeats?.growthArc?.[lang]
		?? pick(GROWTH_LINES[lang], seed);

	const fullStory = [openingImage, emotionalDynamic, hiddenStrength, growthArc].join('\n\n');

	// ── 2. Conflict (When You Fight) ──

	const userTendency = userMeta.conflictReaction[lang];
	const partnerTendency = partnerMeta.conflictReaction[lang];

	const frictionTruth = pairMeta?.fightOverride?.frictionTruth?.[lang]
		?? buildFrictionTruth(userMeta, partnerMeta, lang);

	const tryThis = pairMeta?.fightOverride?.tryThisInstead?.[lang]
		?? userMeta.trySuggestion[lang];

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
		phrase: pick(SHARE_CARD_PHRASES[lang], seed),
		caption: pick(SHARE_CARD_CAPTIONS[lang], seed)
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
	const strengthLine = pick(STRENGTH_LINES[lang], seed);
	const closingLine = pick(CLOSING_LINES[lang], seed, 1);

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
	// safetyNeeds에서 3개씩 추출
	const partnerNeeds = partnerMeta.safetyNeeds[lang].slice(0, 3);
	const userNeeds = userMeta.safetyNeeds[lang].slice(0, 3);
	const closingLine = pick(SHELTER_CLOSING_LINES[lang], seed, 2);

	return { partnerNeeds, userNeeds, closingLine };
}

function buildShadows(
	userMeta: (typeof CLOUD_META)[CloudType],
	partnerMeta: (typeof CLOUD_META)[CloudType],
	lang: Locale
): PremiumContent['shadows'] {
	return {
		userShadows: [...userMeta.shadows[lang]],
		partnerShadows: [...partnerMeta.shadows[lang]]
	};
}

function buildActions(
	userMeta: (typeof CLOUD_META)[CloudType],
	partnerMeta: (typeof CLOUD_META)[CloudType],
	lang: Locale,
	seed: number
): PremiumContent['actions'] {
	const appreciationDesc = partnerMeta.pace === 'slow'
		? (lang === 'ko'
			? `${partnerMeta.displayName.ko} 구름은 깊이 느끼지만 확신이 필요할 때가 많습니다. 무엇을 알아차렸는지 구체적으로 말해주세요.`
			: `${partnerMeta.displayName.en} clouds feel deeply but need to know you notice. Be specific about what you value in them.`)
		: DEFAULT_ACTIONS.appreciation.desc[lang];

	const paceDesc = userMeta.pace === 'fast' && partnerMeta.pace !== 'fast'
		? (lang === 'ko'
			? '모든 침묵이 거리를 뜻하는 것은 아닙니다. 상대의 감정이 정돈되는 시간임을 이해하고 기다려주세요.'
			: "Not every pause is distance. Sometimes it is care forming quietly. Don't rush their processing time.")
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

	const firstMeet = pick(SEASON_FIRST_MEET[pk][lang], seed);
	const settling = pick(SEASON_SETTLING[tk][lang], seed);
	const longTerm = pick(SEASON_LONG_TERM[lang], seed, 1);

	return { firstMeet, settling, longTerm };
}

function buildDangerPhrases(
	userMeta: (typeof CLOUD_META)[CloudType],
	partnerMeta: (typeof CLOUD_META)[CloudType],
	lang: Locale
): PremiumContent['dangerPhrases'] {
	return {
		userPhrases: userMeta.dangerPhrases[lang].slice(0, 2),
		partnerPhrases: partnerMeta.dangerPhrases[lang].slice(0, 2)
	};
}

function buildLoveLanguage(
	userMeta: (typeof CLOUD_META)[CloudType],
	partnerMeta: (typeof CLOUD_META)[CloudType],
	lang: Locale,
	seed: number
): PremiumContent['loveLanguage'] {
	const userExpression = userMeta.loveExpression[lang];
	const partnerExpression = partnerMeta.loveExpression[lang];

	// Determine misreading pattern based on pace/temperature mismatch
	let misreadings: Array<{ signal: string; misread: string }>;

	if (userMeta.pace !== partnerMeta.pace) {
		misreadings = [...MISREADING_PATTERNS.pace_mismatch[lang]];
	} else if (userMeta.temperature !== partnerMeta.temperature) {
		misreadings = [...MISREADING_PATTERNS.temperature_mismatch[lang]];
	} else if (userMeta.pace === partnerMeta.pace) {
		misreadings = [...MISREADING_PATTERNS.same_pace[lang]];
	} else {
		misreadings = [...MISREADING_PATTERNS.same_temperature[lang]];
	}

	return { userExpression, partnerExpression, misreadings };
}

function capitalizeFirst(s: string): string {
	if (!s) return s;
	return s.charAt(0).toUpperCase() + s.slice(1);
}
