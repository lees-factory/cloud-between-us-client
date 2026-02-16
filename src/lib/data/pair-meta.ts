import type { CloudType } from '$lib/types/cloud';
import pairMetaData from './pair-meta.json';

type PairKey = `${CloudType}-${CloudType}`;

export interface PairMetaOverride {
	phenomenonName: { en: string; ko: string };
	vibeTags?: { en: string[]; ko: string[] };
	storyBeats?: Partial<{
		openingImage: { en: string; ko: string };
		emotionalDynamic: { en: string; ko: string };
		hiddenStrength: { en: string; ko: string };
		growthArc: { en: string; ko: string };
	}>;
	fightOverride?: Partial<{
		frictionTruth: { en: string; ko: string };
		tryThisInstead: { en: string; ko: string };
	}>;
}

/**
 * 36조합 메타데이터.
 * S-tier 12개는 storyBeats 수동 보강.
 * 나머지는 phenomenonName만.
 */
export const PAIR_META: Partial<Record<PairKey, PairMetaOverride>> =
	pairMetaData as unknown as Partial<Record<PairKey, PairMetaOverride>>;
