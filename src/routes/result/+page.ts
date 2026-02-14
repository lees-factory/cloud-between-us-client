import type { PageLoad } from './$types';
import type { CloudType } from '$lib/types/cloud';

const CLOUD_TYPES: CloudType[] = [
	'sunlit',
	'mist',
	'storm',
	'dawn',
	'wild',
	'shade'
];

/**
 * Client load only adds initialPartner from URL.
 * cloudProfile comes from +page.server.ts (test-questions.json 기반 계산).
 */
export const load: PageLoad = async ({ url, data }) => {
	const partnerParam = url.searchParams.get('partner');
	const initialPartner =
		partnerParam && CLOUD_TYPES.includes(partnerParam as CloudType)
			? (partnerParam as CloudType)
			: null;

	return {
		...data,
		initialPartner
	};
};
