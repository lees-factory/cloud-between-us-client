import type { CloudType, CoupleChemistry, WeatherPhenomenon } from '$lib/types/cloud';

type ChemistryKey = `${CloudType}-${CloudType}`;

export const CHEMISTRY_MATRIX: Record<
	ChemistryKey,
	Omit<CoupleChemistry, 'user' | 'partner'>
> = {
	'sunlit-mist': {
		skyName: 'Morning Light Through Fog',
		phenomenon: 'glow',
		narrative: `
      햇살의 따뜻한 빛이 안개의 감정을 천천히 녹인다.
      안개는 이해받는다고 느끼고,
      햇살은 보호하고 싶어진다.
    `,
		warning: '빛이 너무 강하면 안개는 사라진다.'
	},
	'sunlit-storm': {
		skyName: 'Lightning at Noon',
		phenomenon: 'thunder',
		narrative: `
      둘 다 강하다.
      햇살은 방향을 잡고, 천둥은 속도를 올린다.
      케미는 강렬하다.
      충돌도 강렬하다.
    `,
		warning: null
	},
	'sunlit-dawn': {
		skyName: 'First Light',
		phenomenon: 'glow',
		narrative: `
      햇살이 여명에게 기다림의 보답을 준다.
      서로의 시간을 존중할 때 하늘이 가장 아름답다.
    `,
		warning: null
	},
	'sunlit-wild': {
		skyName: 'Wind in the Sun',
		phenomenon: 'glow',
		narrative: `
      바람이 햇살을 데리고 간다.
      함께 움직일 때 둘 다 빛난다.
    `,
		warning: '방향이 다르면 흩어질 수 있다.'
	},
	'sunlit-shade': {
		skyName: 'Sun and Shadow',
		phenomenon: 'glow',
		narrative: `
      햇살이 그늘에게 쉼을 주고, 그늘이 햇살에게 안정을 준다.
      균형이 맞는 하늘.
    `,
		warning: null
	},
	'mist-storm': {
		skyName: 'After the Thunder',
		phenomenon: 'rain',
		narrative: `
      천둥이 지나간 뒤 안개가 피어오른다.
      감정이 터진 뒤에 오는 이해.
    `,
		warning: null
	},
	'mist-dawn': {
		skyName: 'Dawn Mist',
		phenomenon: 'glow',
		narrative: `
      여명과 안개는 같은 고요함을 안다.
      말하지 않아도 통한다.
    `,
		warning: null
	},
	'mist-wild': {
		skyName: 'Mist in the Wind',
		phenomenon: 'rain',
		narrative: `
      바람이 안개를 흩뜨린다.
      함께하면 새로운 풍경이 된다.
    `,
		warning: '안개는 흩어지길 두려워할 수 있다.'
	},
	'mist-shade': {
		skyName: 'Quiet Sky',
		phenomenon: 'glow',
		narrative: `
      안개와 그늘. 말 없이 곁에 있는 사랑.
      조용한 하늘이 편하다.
    `,
		warning: null
	},
	'storm-dawn': {
		skyName: 'Storm Before Dawn',
		phenomenon: 'thunder',
		narrative: `
      천둥이 치고 여명이 온다.
      여명의 인내가 천둥을 풀어준다.
    `,
		warning: null
	},
	'storm-wild': {
		skyName: 'Thunderstorm',
		phenomenon: 'thunder',
		narrative: `
      천둥과 바람. 에너지가 폭발한다.
      함께할 때 세상이 움직인다.
    `,
		warning: '너무 세면 둘 다 지칠 수 있다.'
	},
	'storm-shade': {
		skyName: 'Shelter from the Storm',
		phenomenon: 'rain',
		narrative: `
      그늘이 천둥에게 쉼을 준다.
      천둥이 그늘에게 생기를 준다.
    `,
		warning: null
	},
	'dawn-wild': {
		skyName: 'Wind at Dawn',
		phenomenon: 'glow',
		narrative: `
      여명이 바람을 만나면 하늘이 열린다.
      기다림과 움직임이 만난다.
    `,
		warning: null
	},
	'dawn-shade': {
		skyName: 'Soft Morning',
		phenomenon: 'glow',
		narrative: `
      여명과 그늘. 부드러운 아침.
      서로를 재촉하지 않는다.
    `,
		warning: null
	},
	'wild-shade': {
		skyName: 'Breeze in the Shade',
		phenomenon: 'glow',
		narrative: `
      바람이 그늘을 찾고, 그늘이 바람에게 쉼을 준다.
      자유와 안정이 공존한다.
    `,
		warning: null
	},
	'sunlit-sunlit': {
		skyName: 'Double Sun',
		phenomenon: 'glow',
		narrative: '두 햇살이 만나면 하늘이 두 배로 밝아진다.',
		warning: '서로의 그림자를 보지 못할 수 있다.'
	},
	'mist-mist': {
		skyName: 'Deep Fog',
		phenomenon: 'glow',
		narrative: '두 안개. 말 없이도 깊이 통한다.',
		warning: '너무 흐려지면 길을 잃을 수 있다.'
	},
	'storm-storm': {
		skyName: 'Thunder and Lightning',
		phenomenon: 'thunder',
		narrative: '두 천둥. 열정이 맞닿으면 번개가 친다.',
		warning: '폭발이 잦으면 지칠 수 있다.'
	},
	'dawn-dawn': {
		skyName: 'Eternal Dawn',
		phenomenon: 'glow',
		narrative: '두 여명. 함께 기다리면 하늘이 열린다.',
		warning: null
	},
	'wild-wild': {
		skyName: 'Hurricane',
		phenomenon: 'thunder',
		narrative: '두 바람. 함께 돌면 세상이 돈다.',
		warning: '멈출 줄 모르면 흩어질 수 있다.'
	},
	'shade-shade': {
		skyName: 'Deep Shade',
		phenomenon: 'glow',
		narrative: '두 그늘. 고요함이 깊어진다.',
		warning: '말이 너무 없으면 멀어질 수 있다.'
	}
};

export function getChemistry(user: CloudType, partner: CloudType): CoupleChemistry {
	const key: ChemistryKey = `${user}-${partner}`;
	const reverseKey: ChemistryKey = `${partner}-${user}`;
	const data = CHEMISTRY_MATRIX[key] ?? CHEMISTRY_MATRIX[reverseKey];

	if (!data) {
		throw new Error(`Chemistry data not found for ${user} and ${partner}`);
	}

	return {
		user,
		partner,
		...data
	};
}
