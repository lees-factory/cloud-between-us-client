import type { CloudType } from '$lib/types/cloud';

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

export const CLOUD_META: Record<CloudType, CloudMeta> = {
	sunlit: {
		displayName: { en: 'Sunlit', ko: '햇살' },
		keywords: { en: ['warmth', 'direction', 'loyalty'], ko: ['따뜻함', '방향', '충성'] },
		loveDrive: {
			en: 'love with direction — moving toward clarity and warmth',
			ko: '방향을 가지고 사랑합니다 — 따뜻함과 확신을 향해 나아갑니다'
		},
		conflictReaction: {
			en: 'try to solve issues quickly, switching into "fix it" mode before feelings fully land',
			ko: '문제를 빠르게 해결하려 합니다. 감정이 정리되기 전에 해결사 모드가 켜집니다'
		},
		pace: 'fast',
		temperature: 'warm',
		safetyNeeds: {
			en: [
				'knowing the relationship has direction',
				"hearing \"I'm here\" without hesitation",
				'being trusted to lead sometimes',
				'having plans to look forward to together'
			],
			ko: [
				'관계가 앞으로 나아가고 있다는 확신',
				'망설임 없이 "나 여기 있어"라는 말을 듣는 것',
				'가끔은 리드해도 된다는 신뢰',
				'함께 기대할 수 있는 계획이 있는 것'
			]
		},
		shadows: {
			en: [
				"may overlook a partner's quiet needs while steering forward",
				'the desire to brighten everything can leave no room for shade'
			],
			ko: [
				'앞으로 나아가느라 상대의 조용한 필요를 놓칠 수 있습니다',
				'모든 것을 밝히려는 마음이 쉴 그늘을 남기지 않을 수 있습니다'
			]
		},
		trySuggestion: {
			en: 'Before offering a solution, ask: "Do you want comfort right now, or clarity?"',
			ko: '해결책을 내놓기 전에 물어보세요: "지금 위로가 필요해, 아니면 방향이 필요해?"'
		},
		dangerPhrases: {
			en: [
				{ bad: "Why can't you just decide?", better: "Take your time — I'll be here when you're ready." },
				{ bad: "You're overthinking this.", better: "I see you're processing. Want to talk it through?" }
			],
			ko: [
				{ bad: '왜 결정을 못 해?', better: '천천히 해도 돼 — 준비되면 말해줘.' },
				{ bad: '너 너무 복잡하게 생각해.', better: '생각이 많은 거 알아. 같이 정리해볼까?' }
			]
		},
		loveExpression: {
			en: 'Plans ahead, makes things happen, shows up with solutions',
			ko: '미리 계획하고, 직접 실행하고, 답을 들고 나타나는 사람'
		},
		loveSignal: {
			en: 'Taking the lead on shared plans and protecting the direction of the relationship',
			ko: '둘의 계획을 앞장서서 세우고, 관계가 흔들리지 않게 방향을 잡아주는 것'
		}
	},

	mist: {
		displayName: { en: 'Mist', ko: '안개' },
		keywords: { en: ['sensitivity', 'intuition', 'depth'], ko: ['감수성', '직감', '깊이'] },
		loveDrive: {
			en: 'love through depth — feeling the air before speaking',
			ko: '깊이로 사랑합니다 — 말하기 전에 공기의 온도를 먼저 느낍니다'
		},
		conflictReaction: {
			en: 'withdraw into silence to process emotions, needing space before words form',
			ko: '감정을 정리하기 위해 침묵 속으로 물러납니다. 말이 만들어지기 전에 시간이 필요합니다'
		},
		pace: 'slow',
		temperature: 'cool',
		safetyNeeds: {
			en: [
				'having space to feel without being rushed',
				'knowing their silence is respected, not punished',
				'being noticed for the small things they do quietly',
				'consistent presence rather than grand gestures'
			],
			ko: [
				'재촉 없이 감정을 느낄 수 있는 여유',
				'침묵이 존중받는다는 것을 아는 것',
				'조용히 하는 작은 행동들을 알아차려주는 것',
				'큰 제스처보다 꾸준한 존재감'
			]
		},
		shadows: {
			en: [
				'may absorb too many emotions and lose their own shape',
				'silence can become a wall instead of a window'
			],
			ko: [
				'너무 많은 감정을 흡수해 자신의 형태를 잃을 수 있습니다',
				'침묵이 창이 아닌 벽이 될 수 있습니다'
			]
		},
		trySuggestion: {
			en: 'Name what you feel before it fades — even one sentence keeps the air clear.',
			ko: '감정이 흐려지기 전에 이름을 붙여보세요 — 한 문장이면 충분합니다.'
		},
		dangerPhrases: {
			en: [
				{ bad: "You never tell me what's wrong.", better: "I notice you go quiet sometimes. I want to understand." },
				{ bad: "Stop being so sensitive.", better: "Your feelings matter. Help me see what you see." }
			],
			ko: [
				{ bad: '넌 맨날 아무 말도 안 하잖아.', better: '가끔 조용해질 때가 있더라. 이해하고 싶어.' },
				{ bad: '너무 예민한 거 아니야?', better: '네 감정이 중요해. 네가 느끼는 걸 알려줘.' }
			]
		},
		loveExpression: {
			en: 'Notices small changes, remembers details, creates quiet comfort',
			ko: '작은 변화를 먼저 알아채고, 사소한 것까지 기억하고, 말없이 편안함을 만드는 사람'
		},
		loveSignal: {
			en: 'Remembering what you said weeks ago and quietly acting on it',
			ko: '몇 주 전에 한 말을 기억해두었다가, 조용히 행동으로 옮기는 것'
		}
	},

	storm: {
		displayName: { en: 'Storm', ko: '천둥' },
		keywords: { en: ['intensity', 'passion', 'honesty'], ko: ['강렬함', '열정', '솔직함'] },
		loveDrive: {
			en: 'love through intensity — arriving like lightning, all at once',
			ko: '강렬하게 사랑합니다 — 번개처럼 한 번에 도착합니다'
		},
		conflictReaction: {
			en: 'express everything at once, then calm as quickly as the outburst began',
			ko: '한꺼번에 모든 것을 쏟아낸 뒤, 터진 만큼 빠르게 가라앉습니다'
		},
		pace: 'fast',
		temperature: 'intense',
		safetyNeeds: {
			en: [
				'being met with equal honesty',
				"knowing an outburst won't end the relationship",
				'space to cool down without judgment',
				'a partner who stays after the thunder passes'
			],
			ko: [
				'같은 솔직함으로 맞아주는 것',
				'한 번의 폭발이 관계를 끝내지 않는다는 것을 아는 것',
				'판단 없이 가라앉을 수 있는 공간',
				'천둥이 지나가도 곁에 남아주는 사람'
			]
		},
		shadows: {
			en: [
				'the volume of emotion can startle those who speak softly',
				'may mistake intensity for intimacy'
			],
			ko: [
				'감정의 크기가 조용히 말하는 사람을 놀라게 할 수 있습니다',
				'강렬함을 친밀함으로 착각할 수 있습니다'
			]
		},
		trySuggestion: {
			en: 'Count to three before the second sentence — the first already landed.',
			ko: '두 번째 문장 전에 셋을 세세요 — 첫 마디는 이미 도착했습니다.'
		},
		dangerPhrases: {
			en: [
				{ bad: "If you really cared, you'd show it.", better: "I need to feel your presence. Can we find a way?" },
				{ bad: "You're always too much.", better: "Your intensity is real. Let's find a rhythm together." }
			],
			ko: [
				{ bad: '진짜 신경 쓰면 티가 나야지.', better: '네 존재감이 필요해. 같이 방법을 찾아보자.' },
				{ bad: '넌 항상 너무 과해.', better: '네 감정은 진짜야. 우리 둘의 리듬을 찾아보자.' }
			]
		},
		loveExpression: {
			en: 'Shows up with full intensity, protects fiercely, says the raw truth',
			ko: '온 힘을 다해 달려오고, 거칠게라도 지키고, 가감 없이 진실을 말하는 사람'
		},
		loveSignal: {
			en: 'Fighting for the relationship even when it would be easier to walk away',
			ko: '떠나는 게 더 편할 때도, 이 관계를 위해 버티는 것'
		}
	},

	dawn: {
		displayName: { en: 'Dawn', ko: '여명' },
		keywords: { en: ['patience', 'hope', 'gentleness'], ko: ['인내', '희망', '부드러움'] },
		loveDrive: {
			en: 'love through patience — believing things brighten slowly',
			ko: '인내로 사랑합니다 — 천천히 밝아진다고 믿습니다'
		},
		conflictReaction: {
			en: 'wait and observe, sometimes too long, hoping the tension will dissolve on its own',
			ko: '기다리며 지켜봅니다. 때로는 너무 오래, 긴장이 저절로 풀리길 바라며'
		},
		pace: 'slow',
		temperature: 'warm',
		safetyNeeds: {
			en: [
				'patience returned in kind',
				'not being rushed into decisions',
				'gentle check-ins rather than confrontations',
				'knowing there is always a next morning'
			],
			ko: [
				'같은 인내심으로 돌아오는 것',
				'결정을 재촉당하지 않는 것',
				'대면보다 부드러운 안부',
				'항상 다음 날 아침이 있다는 것을 아는 것'
			]
		},
		shadows: {
			en: [
				'waiting too long may let the right moment pass',
				'gentleness can mask unspoken needs'
			],
			ko: [
				'너무 오래 기다리면 적절한 순간을 놓칠 수 있습니다',
				'부드러움이 말하지 못한 필요를 가릴 수 있습니다'
			]
		},
		trySuggestion: {
			en: 'Set one small moment today where you speak before the other person asks.',
			ko: '오늘 하나만, 상대가 묻기 전에 먼저 말해보세요.'
		},
		dangerPhrases: {
			en: [
				{ bad: "You're too slow. I can't wait forever.", better: "I want to move forward with you. What pace feels right?" },
				{ bad: "Why don't you ever take charge?", better: "I love when you lead in your way. Show me." }
			],
			ko: [
				{ bad: '너무 느려. 계속 기다릴 수 없어.', better: '같이 나아가고 싶어. 어떤 속도가 좋아?' },
				{ bad: '왜 맨날 나한테만 맡겨?', better: '네 방식으로 이끌어줄 때 좋아. 보여줘.' }
			]
		},
		loveExpression: {
			en: 'Waits without complaint, keeps showing up, holds space gently',
			ko: '투정 없이 기다리고, 묵묵히 곁에 있고, 자리를 부드럽게 지켜주는 사람'
		},
		loveSignal: {
			en: 'Still being there after the difficult moments, unchanged and steady',
			ko: '힘든 순간이 지나도 달라지지 않고, 여전히 같은 자리에 있는 것'
		}
	},

	wild: {
		displayName: { en: 'Wild', ko: '바람' },
		keywords: { en: ['freedom', 'adventure', 'energy'], ko: ['자유', '모험', '에너지'] },
		loveDrive: {
			en: 'love through movement — shining brightest when exploring together',
			ko: '움직이며 사랑합니다 — 함께 탐험할 때 가장 빛납니다'
		},
		conflictReaction: {
			en: 'shift direction or change the topic, preferring to move past tension rather than sit in it',
			ko: '방향을 바꾸거나 화제를 돌립니다. 긴장 속에 앉아 있기보다 빠져나가려 합니다'
		},
		pace: 'fast',
		temperature: 'warm',
		safetyNeeds: {
			en: [
				'freedom to move without guilt',
				'spontaneity welcomed, not resisted',
				'a partner who can keep up — or trust the return',
				'adventures shared, not just stability'
			],
			ko: [
				'죄책감 없이 움직일 수 있는 자유',
				'즉흥이 저항이 아닌 환영을 받는 것',
				'따라올 수 있거나 돌아옴을 믿어주는 상대',
				'안정만이 아닌 함께하는 모험'
			]
		},
		shadows: {
			en: [
				'avoiding stillness can mean avoiding what needs to be felt',
				'restlessness may be read as disinterest'
			],
			ko: [
				'고요함을 피하는 것이 느껴야 할 것을 피하는 것일 수 있습니다',
				'끊임없는 움직임이 무관심으로 읽힐 수 있습니다'
			]
		},
		trySuggestion: {
			en: "Stay five minutes longer than feels comfortable — that's where the roots grow.",
			ko: '편한 것보다 5분만 더 머물러보세요 — 뿌리는 거기서 자랍니다.'
		},
		dangerPhrases: {
			en: [
				{ bad: "You never stay still.", better: "I love your energy. Can we also make space to rest?" },
				{ bad: "Do you even take this seriously?", better: "I know you care in your way. Help me see it." }
			],
			ko: [
				{ bad: '넌 한 자리에 가만히 있질 못해.', better: '네 에너지가 좋아. 쉬는 시간도 같이 만들어볼까?' },
				{ bad: '이거 진지하게 생각하는 거야?', better: '네 방식으로 신경 쓰는 거 알아. 보여줘.' }
			]
		},
		loveExpression: {
			en: 'Creates adventures, brings spontaneity, fills the air with energy',
			ko: '모험을 만들어내고, 즉흥으로 설레게 하고, 공기를 에너지로 가득 채우는 사람'
		},
		loveSignal: {
			en: 'Coming back every time — freedom chosen, but always returning to you',
			ko: '어디를 가든 결국 돌아오는 것 — 자유롭게 날아도, 늘 당신에게로'
		}
	},

	shade: {
		displayName: { en: 'Shade', ko: '그늘' },
		keywords: { en: ['comfort', 'stability', 'presence'], ko: ['편안함', '안정', '존재감'] },
		loveDrive: {
			en: 'love through presence — showing up quietly and consistently',
			ko: '존재로 사랑합니다 — 조용하고 꾸준하게 곁에 있습니다'
		},
		conflictReaction: {
			en: 'stay still and absorb, rarely raising their voice, sometimes at the cost of being heard',
			ko: '가만히 받아들입니다. 목소리를 높이는 일이 드물고, 때로는 들리지 않는 대가를 치릅니다'
		},
		pace: 'steady',
		temperature: 'cool',
		safetyNeeds: {
			en: [
				'silence accepted as care, not coldness',
				"a routine that isn't called boring",
				'being chosen without having to perform',
				'space to recharge without explanation'
			],
			ko: [
				'침묵이 차가움이 아닌 돌봄으로 받아들여지는 것',
				'일상이 지루하다고 불리지 않는 것',
				'연기하지 않아도 선택받는 것',
				'설명 없이 충전할 수 있는 공간'
			]
		},
		shadows: {
			en: [
				'too much quiet may leave a partner guessing',
				'stability can become stagnation if never stirred'
			],
			ko: [
				'너무 많은 고요함이 상대를 추측하게 만들 수 있습니다',
				'흔들림이 없으면 안정이 정체가 될 수 있습니다'
			]
		},
		trySuggestion: {
			en: 'Once a week, say out loud what you usually only show through action.',
			ko: '일주일에 한 번, 행동으로만 보여주던 것을 소리 내어 말해보세요.'
		},
		dangerPhrases: {
			en: [
				{ bad: "You're so boring.", better: "I feel safe with you. Can we also try something new together?" },
				{ bad: "You never show how you feel.", better: "I know you show love through action. I'd love to hear it too." }
			],
			ko: [
				{ bad: '좀 지루하지 않아?', better: '네 곁이 편안해. 같이 새로운 것도 해볼까?' },
				{ bad: '감정 표현을 왜 안 해?', better: '행동으로 보여주는 거 알아. 가끔 말로도 들려줘.' }
			]
		},
		loveExpression: {
			en: 'Shows up consistently, provides stability, protects through presence',
			ko: '매일 빠짐없이 곁에 있고, 흔들리지 않는 안정감을 주고, 있는 것만으로 지켜주는 사람'
		},
		loveSignal: {
			en: 'The daily rituals that never change — coffee made, door held, space kept',
			ko: '매일 바뀌지 않는 작은 의식들 — 커피를 내려놓고, 문을 잡아주고, 자리를 비워두는 것'
		}
	}
};
