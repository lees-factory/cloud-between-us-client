import type { CloudProfile } from '$lib/types/cloud';
import type { Locale } from '$lib/i18n/translations';

/** Korean cloud profiles (default, backward-compatible export). */
export const CLOUD_PROFILES: Record<string, CloudProfile> = {
	sunlit: {
		type: 'sunlit',
		emoji: '☀️',
		name: '햇살',
		subtitle: '따뜻한 리더',
		keywords: ['따뜻함', '방향', '충성', '빛남'],
		lore: `
      햇살은 해를 가장 오래 품고 있는 구름이다.<br>
      이 구름은 빛을 통과시키지 않는다.<br>
      빛을 머금고 주변을 밝힌다.<br>
      사랑에 빠지면 길을 잃지 않게 하려 한다.<br>
      관계를 앞으로 움직이게 만든다.
    `,
		traits: {
			strengths: ['솔직함', '추진력', '밝은 에너지'],
			inLove: [
				'재지 않고 직진한다',
				'우리의 미래를 자주 이야기한다',
				'사랑하는 사람을 자랑하고 싶어한다'
			],
			shadows: [
				'빛이 강해질수록 상대의 그림자를 보지 못할 수 있다',
				'리드하려는 마음이 통제가 될 위험'
			]
		}
	},

	mist: {
		type: 'mist',
		emoji: '🌫',
		name: '안개',
		subtitle: '섬세한 영혼',
		keywords: ['감수성', '직감', '깊이', '연약함'],
		lore: `
      안개는 해 뜨기 전 공기를 떠다닌다.<br>
      보이지 않지만 가장 많은 감정을 품고 있다.<br>
      사랑은 말보다 분위기다.<br>
      눈빛과 공기의 온도다.
    `,
		traits: {
			strengths: ['공감 능력', '직관', '세심함'],
			inLove: [
				'상대의 기분을 누구보다 먼저 알아챈다',
				'둘만의 깊은 세계를 만든다',
				'섬세하게 배려한다'
			],
			shadows: ['감정을 너무 많이 흡수해 스스로 흐려질 수 있다']
		}
	},

	storm: {
		type: 'storm',
		emoji: '⛈️',
		name: '천둥',
		subtitle: '천둥의 심장',
		keywords: ['강렬함', '열정', '명확함', '해방'],
		lore: `
      천둥 구름은 잠잠하다가 한 번 터진다.<br>
      말하지 않아도 감정이 쌓인다.<br>
      사랑도 한순간에 번개처럼 내리친다.<br>
      진실은 때로 요란하다.
    `,
		traits: {
			strengths: ['솔직함', '열정', '결단력'],
			inLove: ['한순간에 강렬하게 빠져든다', '밀당 없이 감정을 표현한다', '거짓 없는 사랑을 한다'],
			shadows: ['감정이 폭발하면 상대를 놀라게 할 수 있다']
		}
	},

	dawn: {
		type: 'dawn',
		emoji: '🌅',
		name: '여명',
		subtitle: '고요한 전환',
		keywords: ['희망', '인내', '변화', '고요'],
		lore: `
      여명은 밤과 낮 사이에 선 구름이다.<br>
      모든 것이 바뀌기 직전의 고요함을 안다.<br>
      사랑도 서서히 밝아오는 것이라 믿는다.<br>
      기다리는 것만으로도 관계는 변한다.
    `,
		traits: {
			strengths: ['인내심', '희망', '포용력'],
			inLove: [
				'서두르지 않고 스며든다',
				'상대가 준비될 때까지 기다려준다',
				'한결같은 마음을 보여준다'
			],
			shadows: ['너무 기다리기만 해 타이밍을 놓칠 수 있다']
		}
	},

	wild: {
		type: 'wild',
		emoji: '🌪️',
		name: '바람',
		subtitle: '자유로운 영혼',
		keywords: ['자유', '모험', '즉흥', '에너지'],
		lore: `
      바람 구름은 한 곳에 머물지 않는다.<br>
      사랑도 함께 움직일 때 가장 빛난다.<br>
      예측 불가능함이 재미다.<br>
      새로움을 잃지 않으려 한다.
    `,
		traits: {
			strengths: ['자유로움', '유연성', '도전 정신'],
			inLove: [
				'함께 새로운 것을 경험하길 원한다',
				'구속받지 않는 사랑을 꿈꾼다',
				'지루할 틈을 주지 않는다'
			],
			shadows: ['한곳에 묶이면 숨이 막힐 수 있다']
		}
	},

	shade: {
		type: 'shade',
		emoji: '☁️',
		name: '그늘',
		subtitle: '조용한 쉼터',
		keywords: ['편안함', '안정', '존재감', '쉼'],
		lore: `
      그늘은 뜨거운 햇살 아래 쉼을 준다.<br>
      말없이 곁에 있는 사랑을 안다.<br>
      관계는 할 말이 많을 때만 깊어지는 게 아니다.<br>
      함께 조용히 있어도 된다.
    `,
		traits: {
			strengths: ['안정감', '신뢰', '차분함'],
			inLove: [
				'말보다 행동으로 챙겨준다',
				'힘들 때 조용히 쉴 곳이 되어준다',
				'변함없이 그 자리에 있는다'
			],
			shadows: ['너무 조용해 상대가 답답해할 수 있다']
		}
	}
};

/** English cloud profiles. */
export const CLOUD_PROFILES_EN: Record<string, CloudProfile> = {
	sunlit: {
		type: 'sunlit',
		emoji: '☀️',
		name: 'Sunlit',
		subtitle: 'The Warm Leader',
		keywords: ['Warmth', 'Direction', 'Loyalty', 'Radiance'],
		lore: `
      Sunlit is the cloud that holds the sun the longest.<br>
      It doesn't let light pass through.<br>
      It absorbs it and brightens everything around.<br>
      In love, it tries to keep you from losing your way.<br>
      It makes the relationship move forward.
    `,
		traits: {
			strengths: ['Honesty', 'Drive', 'Bright Energy'],
			inLove: [
				'Straightforward in love, no games',
				'Talks often about "our" future',
				'Loves to show off their partner'
			],
			shadows: [
				"The stronger the light, the harder it is to see your partner's shadow",
				'The desire to lead may become a need to control'
			]
		}
	},

	mist: {
		type: 'mist',
		emoji: '🌫',
		name: 'Mist',
		subtitle: 'The Sensitive Soul',
		keywords: ['Sensitivity', 'Intuition', 'Depth', 'Fragility'],
		lore: `
      Mist drifts through the air before the sun rises.<br>
      Invisible, yet holding the most emotions.<br>
      Love is not about words — it's about the atmosphere.<br>
      It's in the gaze and the temperature of the air.
    `,
		traits: {
			strengths: ['Empathy', 'Intuition', 'Attentiveness'],
			inLove: [
				"Notices partner's mood first",
				'Creates a deep, private world',
				'Cares delicately for others'
			],
			shadows: ['May absorb too many emotions and lose clarity']
		}
	},

	storm: {
		type: 'storm',
		emoji: '⛈️',
		name: 'Storm',
		subtitle: 'The Thunder',
		keywords: ['Intensity', 'Passion', 'Clarity', 'Release'],
		lore: `
      The storm cloud stays quiet, then erupts all at once.<br>
      Emotions pile up even without words.<br>
      Love strikes like lightning in an instant.<br>
      Truth is sometimes loud.
    `,
		traits: {
			strengths: ['Honesty', 'Passion', 'Decisiveness'],
			inLove: [
				'Falls in love intensely',
				'Expresses feelings without holding back',
				'Loves without lies'
			],
			shadows: ['An emotional outburst may startle the other person']
		}
	},

	dawn: {
		type: 'dawn',
		emoji: '🌅',
		name: 'Dawn',
		subtitle: 'The Gentle Transition',
		keywords: ['Hope', 'Patience', 'Transformation', 'Calm'],
		lore: `
      Dawn is the cloud that stands between night and day.<br>
      It knows the stillness just before everything changes.<br>
      It believes love brightens slowly.<br>
      Sometimes, just waiting is enough to change a relationship.
    `,
		traits: {
			strengths: ['Patience', 'Hope', 'Inclusiveness'],
			inLove: [
				'Permeates slowly without rushing',
				'Waits until the partner is ready',
				'Shows a consistent heart'
			],
			shadows: ['May wait too long and miss the moment']
		}
	},

	wild: {
		type: 'wild',
		emoji: '🌪️',
		name: 'Wild',
		subtitle: 'The Free Spirit',
		keywords: ['Freedom', 'Adventure', 'Spontaneity', 'Energy'],
		lore: `
      The wild cloud never stays in one place.<br>
      Love shines brightest when you move together.<br>
      The unpredictable is the fun part.<br>
      It never wants to lose the newness.
    `,
		traits: {
			strengths: ['Freedom', 'Flexibility', 'Adventurous Spirit'],
			inLove: [
				'Wants to experience new things together',
				'Dreams of love without restrictions',
				'Never leaves room for boredom'
			],
			shadows: ['May feel suffocated when tied down']
		}
	},

	shade: {
		type: 'shade',
		emoji: '☁️',
		name: 'Shade',
		subtitle: 'The Quiet Shelter',
		keywords: ['Comfort', 'Stability', 'Presence', 'Rest'],
		lore: `
      Shade offers rest under the blazing sun.<br>
      It understands the love of simply being there.<br>
      A relationship doesn't only deepen with many words.<br>
      It's okay to be quiet together.
    `,
		traits: {
			strengths: ['Stability', 'Trust', 'Calmness'],
			inLove: [
				'Cares through actions rather than words',
				'Becomes a quiet resting place when things are hard',
				'Stays by your side unchangingly'
			],
			shadows: ['Too much silence may frustrate the other person']
		}
	}
};

/** Returns cloud profiles for the given locale. */
export function getCloudProfiles(locale: Locale): Record<string, CloudProfile> {
	return locale === 'ko' ? CLOUD_PROFILES : CLOUD_PROFILES_EN;
}
