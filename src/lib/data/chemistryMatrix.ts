import type { CloudType, CoupleChemistry, PremiumContent } from '$lib/types/cloud';
import { buildPremiumReport } from '$lib/utils/premium/build-premium-report';
import chemistryMatrixData from './chemistry-matrix.json';

export interface PairMetaOverride {
	phenomenonName?: { en: string; ko: string };
	vibeTags?: { en: string[]; ko: string[] };
	storyBeats?: {
		openingImage?: { en: string; ko: string };
		emotionalDynamic?: { en: string; ko: string };
		hiddenStrength?: { en: string; ko: string };
		growthArc?: { en: string; ko: string };
	};
	fightOverride?: {
		frictionTruth?: { en: string; ko: string };
		tryThisInstead?: { en: string; ko: string };
	};
	premium?: {
		ko: Partial<PremiumContent>;
		en: Partial<PremiumContent>;
	};
}

export const PAIR_META: Record<string, PairMetaOverride> = chemistryMatrixData as unknown as Record<
	string,
	PairMetaOverride
>;

type ChemistryKey = `${CloudType}-${CloudType}`;

/**
 * Stored chemistry data allows partial premium content (overrides).
 * Missing sections will be filled by the rule-based generator.
 */
interface StoredCoupleChemistry extends Omit<CoupleChemistry, 'user' | 'partner' | 'premium'> {
	premium?: {
		ko: Partial<PremiumContent>;
		en: Partial<PremiumContent>;
	};
}

export const CHEMISTRY_MATRIX: Partial<Record<ChemistryKey, StoredCoupleChemistry>> =
	chemistryMatrixData as unknown as Partial<Record<ChemistryKey, StoredCoupleChemistry>>;

export function getChemistry(user: CloudType, partner: CloudType): CoupleChemistry {
	const key: ChemistryKey = `${user}-${partner}`;
	const reverseKey: ChemistryKey = `${partner}-${user}`;
	const data = CHEMISTRY_MATRIX[key] ?? CHEMISTRY_MATRIX[reverseKey];

	if (!data) {
		throw new Error(`Chemistry data not found for ${user} and ${partner}`);
	}

	// 1. Generate full report using rules
	const generatedKo = buildPremiumReport(user, partner, 'ko');
	const generatedEn = buildPremiumReport(user, partner, 'en');

	// 2. Merge with manual overrides
	// Since overrides are Partial<PremiumContent>, we merge them into the generated full content.
	// Note: This is a shallow merge. If overrides provide a section (e.g. 'conflict'),
	// they must provide the FULL section, or use a deep merge utility if partial section overrides are needed.
	// Currently chemistry-matrix.json provides full sections when overriding.
	const premium = data.premium
		? {
				ko: { ...generatedKo, ...data.premium.ko } as PremiumContent,
				en: { ...generatedEn, ...data.premium.en } as PremiumContent
			}
		: {
				ko: generatedKo,
				en: generatedEn
			};

	return {
		user,
		partner,
		...data,
		premium
	};
}
