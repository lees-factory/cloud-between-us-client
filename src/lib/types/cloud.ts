export type CloudType =
	| 'sunlit' // 햇살
	| 'mist' // 안개
	| 'storm' // 천둥
	| 'dawn' // 여명
	| 'wild' // 바람
	| 'shade'; // 그늘

export type WeatherPhenomenon = 'glow' | 'rain' | 'thunder';

export interface CloudProfile {
	type: CloudType;
	emoji: string;
	name: string;
	subtitle: string;
	keywords: [string, string, string, string];
	lore: string;
	traits: {
		strengths: string[];
		shadows: string[];
	};
}

export interface PremiumContent {
	fullStory: string;
	conflict: {
		userTendency: string;
		partnerTendency: string;
		tip: string;
	};
	shelter: {
		partnerNeeds: string[];
		userNeeds: string[];
		closingLine: string;
	};
	shadows: {
		userShadows: string[];
		partnerShadows: string[];
	};
	actions: Array<{
		title: string;
		desc: string;
	}>;
	seasons: {
		firstMeet: string;
		settling: string;
		longTerm: string;
	};
	dangerPhrases: {
		userPhrases: Array<{ bad: string; better: string }>;
		partnerPhrases: Array<{ bad: string; better: string }>;
	};
	loveLanguage: {
		userExpression: string;
		partnerExpression: string;
		misreadings: Array<{ signal: string; misread: string }>;
	};
	shareCard: {
		phrase: string;
		caption: string;
	};
}

export interface CoupleChemistry {
	user: CloudType;
	partner: CloudType;
	skyName: string;
	skyNameKo?: string;
	phenomenon: WeatherPhenomenon;
	narrative: string;
	warning: string | null;
	premium?: {
		ko: PremiumContent;
		en: PremiumContent;
	};
}

export interface TestQuestion {
	id: number;
	question: string;
	options: Array<{
		text: string;
		cloudType: CloudType;
	}>;
}
