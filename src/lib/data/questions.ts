import type { TestQuestion } from '$lib/types/cloud';

export const questions: TestQuestion[] = [
	{
		id: 1,
		question: 'When you wake up next to your partner, what do you notice first?',
		options: [
			{ text: 'The way the light hits their face', cloudType: 'sunlit' },
			{ text: 'The quiet calm of the room', cloudType: 'mist' },
			{ text: 'The energy between you', cloudType: 'storm' },
			{ text: 'The soft change in the air', cloudType: 'dawn' },
			{ text: 'The urge to move and start the day', cloudType: 'wild' },
			{ text: 'The comfort of being close', cloudType: 'shade' }
		]
	},
	{
		id: 2,
		question: 'How do you prefer to spend a free day together?',
		options: [
			{ text: 'Leading the plan and making it special', cloudType: 'sunlit' },
			{ text: 'Feeling the mood and going with it', cloudType: 'mist' },
			{ text: 'Something intense or adventurous', cloudType: 'storm' },
			{ text: 'Waiting for the right moment', cloudType: 'dawn' },
			{ text: 'Exploring somewhere new, no plan', cloudType: 'wild' },
			{ text: 'Simple comfort at home', cloudType: 'shade' }
		]
	},
	{
		id: 3,
		question: 'When you disagree, you tend to:',
		options: [
			{ text: 'Talk it through until we both feel heard', cloudType: 'sunlit' },
			{ text: 'Need a little space, then come back', cloudType: 'mist' },
			{ text: 'Feel it strongly but get over it quickly', cloudType: 'storm' },
			{ text: 'Give it time and see how it unfolds', cloudType: 'dawn' },
			{ text: 'Want to move on and do something else', cloudType: 'wild' },
			{ text: 'Stay quiet and let it settle', cloudType: 'shade' }
		]
	}
];
