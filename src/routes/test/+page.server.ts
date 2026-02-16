import type { PageServerLoad } from './$types';
import testData from '$lib/data/test-questions.json';
import testDataEn from '$lib/data/test-questions-en.json';
import { getLocaleFromEvent } from '$lib/i18n';
import { getQuestions } from '$lib/api/diagnosis/questions';

export const load: PageServerLoad = async (event) => {
	const locale = getLocaleFromEvent(event);

	try {
		const apiSteps = await getQuestions(locale);

		// The API returns steps (themes) containing questions.
		// We randomly pick 1 question per step to match the existing frontend logic (12 steps total).
		const steps = apiSteps.map((theme) => {
			const randomIndex = Math.floor(Math.random() * theme.questions.length);
			const q = theme.questions[randomIndex];

			return {
				id: theme.id, // Keep the theme ID for styling/backgrounds
				title: theme.title,
				emoji: theme.emoji,
				question: {
					id: q.id,
					text: q.text,
					options: q.options.map((opt) => ({
						text: opt.text,
						cloudType: opt.cloudType
					}))
				}
			};
		});

		return { steps };
	} catch (error) {
		console.error('Failed to fetch questions from API, falling back to local data', error);

		const currentTestData = locale === 'en' ? testDataEn : testData;

		// Fallback: Pick 1 random question per step from local data to let the app function
		const steps = currentTestData.steps.map((step) => {
			const randomIndex = Math.floor(Math.random() * step.questions.length);
			const q = step.questions[randomIndex];

			return {
				id: step.id,
				title: step.title,
				emoji: step.emoji,
				question: {
					id: q.id,
					text: q.text,
					options: q.options.map((opt) => ({
						text: opt.text,
						cloudType: opt.cloudType
					}))
				}
			};
		});

		return { steps };
	}
};
