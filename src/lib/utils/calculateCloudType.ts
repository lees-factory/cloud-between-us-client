import type { CloudType } from '$lib/types/cloud';
import { questions } from '$lib/data/questions';

/**
 * Given answers (question id -> option index), tally cloud types from chosen options
 * and return the most frequent one. Ties break by first occurrence.
 */
export function calculateCloudType(answers: Record<number, number>): CloudType {
	const counts: Partial<Record<CloudType, number>> = {};

	for (const q of questions) {
		const optionIndex = answers[q.id];
		if (optionIndex === undefined) continue;
		const option = q.options[optionIndex];
		if (!option) continue;
		const t = option.cloudType;
		counts[t] = (counts[t] ?? 0) + 1;
	}

	const entries = Object.entries(counts) as [CloudType, number][];
	if (entries.length === 0) return 'sunlit';

	let best: CloudType = entries[0][0];
	let bestCount = entries[0][1];
	for (let i = 1; i < entries.length; i++) {
		if (entries[i][1] > bestCount) {
			best = entries[i][0];
			bestCount = entries[i][1];
		}
	}
	return best;
}
