import type { PageServerLoad } from './$types';
import testData from '$lib/data/test-questions.json';
import { stepTitlesEn, questionsEn } from '$lib/data/questions-en';
import { getLocaleFromEvent } from '$lib/i18n';

export const load: PageServerLoad = async (event) => {
	const locale = getLocaleFromEvent(event);

	// For each step, randomly pick 1 of 4 questions
	// Strip cloudType from options — browser must never see the mapping
	const steps = testData.steps.map((step) => {
		const randomIndex = Math.floor(Math.random() * step.questions.length);
		const q = step.questions[randomIndex];

		let title = step.title;
		let questionText = q.text;
		let optionTexts = q.options.map((opt) => opt.text);

		if (locale === 'en') {
			title = stepTitlesEn[`step-${step.id}`] ?? step.title;
			const enQ = questionsEn[q.id];
			if (enQ) {
				questionText = enQ.text;
				optionTexts = enQ.options;
			}
		}

		return {
			id: step.id,
			title,
			emoji: step.emoji,
			question: {
				id: q.id,
				text: questionText,
				options: optionTexts.map((text) => ({ text }))
			}
		};
	});

	return { steps };
};
