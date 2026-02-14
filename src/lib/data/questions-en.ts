/**
 * English translations for test questions.
 * Server-only — never bundled to the browser.
 *
 * Key = question id (e.g. "1-1"), value = { text, options[] }.
 * Step titles are keyed by step id (e.g. "step-1").
 */

export const stepTitlesEn: Record<string, string> = {
	'step-1': 'The Beginning of Love',
	'step-2': 'Expressing Feelings',
	'step-3': 'Handling Conflict',
	'step-4': 'Love in Daily Life',
	'step-5': 'Freedom & Space',
	'step-6': 'Future & Plans',
	'step-7': 'Jealousy & Possessiveness',
	'step-8': 'Intimacy',
	'step-9': 'Facing a Crisis',
	'step-10': 'Love Language',
	'step-11': 'Alone vs. Together',
	'step-12': 'The Temperature of Love'
};

export const questionsEn: Record<string, { text: string; options: string[] }> = {
	// Step 1 — The Beginning of Love
	'1-1': {
		text: 'When you start to like someone, what do you do?',
		options: [
			'I approach them and start a conversation',
			'I watch from afar, waiting for them to come to me',
			'I express my feelings directly',
			'I naturally become friends with them first'
		]
	},
	'1-2': {
		text: 'When you meet someone for the first time, you tend to:',
		options: [
			'Lead the conversation actively',
			'Listen more, but empathize well',
			'Leave a strong impression',
			'Create a comfortable atmosphere'
		]
	},
	'1-3': {
		text: 'What matters most to you in a relationship?',
		options: [
			'Trust and future plans',
			'Emotional connection and understanding',
			'Passion and chemistry',
			'Comfort and stability'
		]
	},
	'1-4': {
		text: 'How fast do you fall in love?',
		options: [
			'Slowly, once I feel certain',
			'It deepens over time',
			'Quickly and intensely',
			'So naturally, I barely notice'
		]
	},

	// Step 2 — Expressing Feelings
	'2-1': {
		text: 'When do you say "I love you"?',
		options: [
			'I say it first, once I\'m sure',
			'After they say it first',
			'When the feeling hits me',
			'I show it through actions instead'
		]
	},
	'2-2': {
		text: 'When you\'re feeling down, you tend to:',
		options: [
			'Talk it out and find a solution',
			'Want to be alone',
			'Not hide my emotions',
			'Pretend I\'m fine and move on'
		]
	},
	'2-3': {
		text: 'How do you show affection to your partner?',
		options: [
			'Words like "I love you" and "us"',
			'Small gifts or sweet messages',
			'Physical touch and bold expressions',
			'Simply being there'
		]
	},
	'2-4': {
		text: 'When your partner is going through a hard time, you:',
		options: [
			'Offer advice and direction',
			'Listen and empathize',
			'Get angry alongside them or comfort them',
			'Quietly stay by their side'
		]
	},

	// Step 3 — Handling Conflict
	'3-1': {
		text: 'When you fight with your partner, you:',
		options: [
			'Try to resolve it through conversation',
			'Take some time to think',
			'Express my emotions right away',
			'Avoid conflict as much as possible'
		]
	},
	'3-2': {
		text: 'When a conflict arises, your first reaction is:',
		options: [
			'"Let\'s talk about this"',
			'Replay it in my head over and over',
			'Confront them directly',
			'"It\'s fine," and move on'
		]
	},
	'3-3': {
		text: 'How do you make up?',
		options: [
			'I initiate reconciliation first',
			'I accept when they come to me',
			'As fast as the fight started',
			'Naturally, with time'
		]
	},
	'3-4': {
		text: 'When your partner is in the wrong, you:',
		options: [
			'Point it out clearly',
			'Feel hurt but stay quiet',
			'Express it immediately',
			'Try to let it go'
		]
	},

	// Step 4 — Love in Daily Life
	'4-1': {
		text: 'On a weekend with your partner, you:',
		options: [
			'Plan things ahead of time',
			'Prefer staying home quietly',
			'Do something spontaneous',
			'Just want to feel at ease'
		]
	},
	'4-2': {
		text: 'Do you notice small changes in your partner?',
		options: [
			'I catch the important things',
			'I notice even the tiniest details',
			'Only the big changes',
			'Only when they tell me'
		]
	},
	'4-3': {
		text: 'When a routine forms with your partner:',
		options: [
			'I like it — it feels stable',
			'Comfortable, but sometimes stifling',
			'Boring — I need change',
			'I love it'
		]
	},
	'4-4': {
		text: 'How do you feel about anniversaries?',
		options: [
			'Important — I always celebrate',
			'I want to make it meaningful',
			'I want to make it special',
			'Being together is enough'
		]
	},

	// Step 5 — Freedom & Space
	'5-1': {
		text: 'What do you need in a relationship?',
		options: [
			'A clear definition of us',
			'Emotional security',
			'Excitement and spark',
			'Personal time'
		]
	},
	'5-2': {
		text: 'When your partner wants alone time:',
		options: [
			'I ask why',
			'I want alone time too',
			'I feel a bit hurt',
			'Of course — I respect that'
		]
	},
	'5-3': {
		text: 'If someone says "Let\'s travel spontaneously!":',
		options: [
			'I check my schedule and plan it',
			'That sounds overwhelming',
			'Yes! Let\'s go right now',
			'Let me think about it'
		]
	},
	'5-4': {
		text: 'How do you feel about being together all the time?',
		options: [
			'I love it — togetherness is great',
			'Sometimes it feels suffocating',
			'It depends on the situation',
			'We each need our own time too'
		]
	},

	// Step 6 — Future & Plans
	'6-1': {
		text: 'How much do you think about the future of your relationship?',
		options: [
			'Often, in specific detail',
			'Vaguely',
			'The present matters more',
			'Sometimes'
		]
	},
	'6-2': {
		text: '"Where do you think this is going?" — your answer:',
		options: [
			'I have a clear picture',
			'I\'m not sure',
			'I\'m happy now, that\'s enough',
			'Let\'s take it slow'
		]
	},
	'6-3': {
		text: 'How do you feel about talking about marriage?',
		options: [
			'Important — things should be clear',
			'It makes me cautious',
			'Too early for that',
			'When the time comes'
		]
	},
	'6-4': {
		text: 'Could you do a long-distance relationship?',
		options: [
			'If there\'s a plan, yes',
			'It would be hard',
			'I think feelings would fade',
			'With trust, yes'
		]
	},

	// Step 7 — Jealousy & Possessiveness
	'7-1': {
		text: 'When your partner meets a friend of the opposite sex:',
		options: [
			'Fine, but I\'d like to know',
			'I feel uneasy',
			'I get jealous',
			'I don\'t mind at all'
		]
	},
	'7-2': {
		text: 'About your partner\'s past relationships:',
		options: [
			'Curious, but I won\'t ask',
			'I\'d rather not know',
			'I\'m curious',
			'The past is the past'
		]
	},
	'7-3': {
		text: 'If your partner doesn\'t introduce you to others:',
		options: [
			'I ask why',
			'I feel hurt',
			'I get upset',
			'I understand'
		]
	},
	'7-4': {
		text: 'How possessive are you?',
		options: [
			'Moderately',
			'Quite a lot',
			'Very much',
			'Hardly at all'
		]
	},

	// Step 8 — Intimacy
	'8-1': {
		text: 'How do you feel about physical affection?',
		options: [
			'It\'s important',
			'Only when I\'m comfortable',
			'It\'s very important',
			'I can take it or leave it'
		]
	},
	'8-2': {
		text: 'How do you feel about deep conversations with your partner?',
		options: [
			'Often — it\'s necessary for the relationship',
			'I want to, but it\'s hard',
			'When emotions run high',
			'Occasionally, when needed'
		]
	},
	'8-3': {
		text: 'In front of your partner, you are:',
		options: [
			'Completely myself',
			'A bit cautious',
			'Even more honest',
			'At ease'
		]
	},
	'8-4': {
		text: 'Texting before bed:',
		options: [
			'I want to do it every day',
			'Nice, but not a must',
			'Obviously',
			'It\'s okay to skip if busy'
		]
	},

	// Step 9 — Facing a Crisis
	'9-1': {
		text: 'When your relationship is shaken, you:',
		options: [
			'Actively try to fix it',
			'Worry about it alone',
			'React emotionally',
			'Give it time'
		]
	},
	'9-2': {
		text: 'When a breakup seems near:',
		options: [
			'I fight to the end',
			'I retreat, feeling hurt',
			'I either hold on tight or leave fast',
			'I accept it calmly'
		]
	},
	'9-3': {
		text: 'When you feel your partner has changed:',
		options: [
			'I try to have a conversation',
			'I just observe quietly',
			'I ask them directly',
			'I keep watching'
		]
	},
	'9-4': {
		text: 'When trust is broken:',
		options: [
			'I try to rebuild it',
			'I\'m deeply hurt',
			'It\'s over',
			'I need time'
		]
	},

	// Step 10 — Love Language
	'10-1': {
		text: 'When do you feel most loved?',
		options: [
			'When we plan a future together',
			'When they truly understand me',
			'When they show intense passion',
			'When they\'re simply there for me'
		]
	},
	'10-2': {
		text: 'How do you express love?',
		options: [
			'Words and plans',
			'Empathy and care',
			'Actions and emotion',
			'Presence and trust'
		]
	},
	'10-3': {
		text: 'How do you feel about receiving gifts?',
		options: [
			'The meaning matters most',
			'I love it when I can feel the heart behind it',
			'I love surprises',
			'It makes me a bit uncomfortable'
		]
	},
	'10-4': {
		text: 'What do you most want to say to your partner?',
		options: [
			'"Let\'s build our future together"',
			'"I understand you"',
			'"I can\'t live without you"',
			'"I\'m right here"'
		]
	},

	// Step 11 — Alone vs. Together
	'11-1': {
		text: 'When you want to be alone on a weekend:',
		options: [
			'Only if I planned for it',
			'It happens often',
			'Almost never',
			'Whenever I need to'
		]
	},
	'11-2': {
		text: 'Sharing hobbies with your partner:',
		options: [
			'Great — we can do things together',
			'It feels like pressure',
			'It\'s fun',
			'We can each do our own thing'
		]
	},
	'11-3': {
		text: 'Should you always be reachable?',
		options: [
			'To some extent, yes',
			'That feels like pressure',
			'Of course',
			'No'
		]
	},
	'11-4': {
		text: 'Do you want to know everything about your partner?',
		options: [
			'The important things, yes',
			'Knowing too much feels heavy',
			'I want to know everything',
			'I\'ll listen when they share'
		]
	},

	// Step 12 — The Temperature of Love
	'12-1': {
		text: 'Your love is:',
		options: [
			'Warm and steady',
			'Deep and delicate',
			'Hot and intense',
			'Quiet and solid'
		]
	},
	'12-2': {
		text: 'With a long-term partner:',
		options: [
			'I feel more secure',
			'I feel more at ease',
			'Sometimes it gets boring',
			'The bond deepens'
		]
	},
	'12-3': {
		text: 'Your perfect date:',
		options: [
			'A carefully planned special day',
			'Quiet time, just the two of us',
			'An unexpected adventure',
			'An ordinary day, together'
		]
	},
	'12-4': {
		text: 'The most important thing in love:',
		options: [
			'Trust and direction',
			'Understanding and empathy',
			'Passion and attraction',
			'Comfort and consistency'
		]
	}
};
