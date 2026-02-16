import type { CloudType } from '$lib/types/cloud';
import cloudMetaData from './cloud-meta.json';

export interface CloudMeta {
	displayName: { en: string; ko: string };
	keywords: { en: string[]; ko: string[] };
	loveDrive: { en: string; ko: string };
	conflictReaction: { en: string; ko: string };
	pace: 'fast' | 'steady' | 'slow';
	temperature: 'warm' | 'cool' | 'intense';
	safetyNeeds: { en: string[]; ko: string[] };
	shadows: { en: string[]; ko: string[] };
	trySuggestion: { en: string; ko: string };
	dangerPhrases: {
		en: Array<{ bad: string; better: string }>;
		ko: Array<{ bad: string; better: string }>;
	};
	loveExpression: { en: string; ko: string };
	loveSignal: { en: string; ko: string };
}

export const CLOUD_META: Record<CloudType, CloudMeta> = cloudMetaData as unknown as Record<
	CloudType,
	CloudMeta
>;
