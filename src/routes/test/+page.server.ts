import type { PageServerLoad } from './$types';
import testData from '$lib/data/test-questions.json';
import testDataEn from '$lib/data/test-questions-en.json';
import { getLocaleFromEvent } from '$lib/i18n';
import { getQuestions } from '$lib/api/diagnosis/questions';

export const load: PageServerLoad = async (event) => {
	const locale = getLocaleFromEvent(event);

	try {
		const apiQuestions = await getQuestions(locale);

		const steps = apiQuestions.map((q, index) => {
			// Use local metadata for decoration
			const currentTestData = locale === 'en' ? testDataEn : testData;
			const localStep = currentTestData.steps[index % currentTestData.steps.length];

			return {
				id: localStep.id,
				title: localStep.title,
				emoji: localStep.emoji,
				question: {
					id: q.id,
					text: q.questionText,
					options: q.options.map((opt) => ({
						text: opt.text,
						cloudType: opt.personaType
					}))
				}
			};
		});

		return { steps };
	} catch (error) {
		console.error('Failed to fetch questions from API, falling back to local data', error);

		const currentTestData = locale === 'en' ? testDataEn : testData;

		// Fallback: For each step, randomly pick 1 of 4 questions
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
