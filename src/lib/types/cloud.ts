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

export interface CoupleChemistry {
	user: CloudType;
	partner: CloudType;
	skyName: string;
	phenomenon: WeatherPhenomenon;
	narrative: string;
	warning: string | null;
}

export interface TestQuestion {
	id: number;
	question: string;
	options: Array<{
		text: string;
		cloudType: CloudType;
	}>;
}
