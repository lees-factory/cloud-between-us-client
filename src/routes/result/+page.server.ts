import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getCloudProfiles } from '$lib/data/cloudProfiles';
import testData from '$lib/data/test-questions.json';
import type { CloudType } from '$lib/types/cloud';
import { getLocaleFromEvent } from '$lib/i18n';

/**
 * Server-side cloud type calculation.
 * The cloudType mapping (which option maps to which cloud) never reaches the browser.
 */
export const load: PageServerLoad = async (event) => {
	const locale = getLocaleFromEvent(event);
	const answersParam = event.url.searchParams.get('answers');

	if (!answersParam) {
		throw error(400, locale === 'ko' ? '테스트 결과가 없습니다' : 'No test results found');
	}

	try {
		const answers = JSON.parse(decodeURIComponent(answersParam)) as Record<string, number>;

		// Build a lookup: questionId → options (with cloudType)
		const questionMap = new Map<string, { options: { cloudType: string }[] }>();
		for (const step of testData.steps) {
			for (const q of step.questions) {
				questionMap.set(q.id, q);
			}
		}

		// Tally cloud types from answers
		const counts: Partial<Record<CloudType, number>> = {};
		for (const [questionId, optionIndex] of Object.entries(answers)) {
			const question = questionMap.get(questionId);
			if (!question) continue;
			const option = question.options[optionIndex];
			if (!option) continue;
			const ct = option.cloudType as CloudType;
			counts[ct] = (counts[ct] ?? 0) + 1;
		}

		// Find the dominant cloud type
		const entries = Object.entries(counts) as [CloudType, number][];
		if (entries.length === 0) {
			throw error(400, locale === 'ko' ? '유효한 답변이 없습니다' : 'No valid answers found');
		}

		let bestType: CloudType = entries[0][0];
		let bestCount = entries[0][1];
		for (let i = 1; i < entries.length; i++) {
			if (entries[i][1] > bestCount) {
				bestType = entries[i][0];
				bestCount = entries[i][1];
			}
		}

		const profiles = getCloudProfiles(locale);
		const profile = profiles[bestType];
		if (!profile) {
			throw error(404, locale === 'ko' ? 'Cloud 프로필을 찾을 수 없습니다' : 'Cloud profile not found');
		}

		return { cloudProfile: profile, locale };
	} catch (err) {
		if (err && typeof err === 'object' && 'status' in err) throw err;
		throw error(500, locale === 'ko' ? '결과 처리 중 오류가 발생했습니다' : 'Error processing results');
	}
};
