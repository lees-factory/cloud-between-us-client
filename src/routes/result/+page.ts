import type { PageLoad } from './$types';
import type { CloudType } from '$lib/types/cloud';
import { error } from '@sveltejs/kit';
import { CLOUD_PROFILES } from '$lib/data/cloudProfiles';
import { calculateCloudType } from '$lib/utils/calculateCloudType';

const CLOUD_TYPES: CloudType[] = [
	'sunlit',
	'mist',
	'storm',
	'dawn',
	'wild',
	'shade'
];

export const load: PageLoad = async ({ url }) => {
	const answersParam = url.searchParams.get('answers');

	if (!answersParam) {
		throw error(400, '테스트 결과가 없습니다');
	}

	try {
		const answers = JSON.parse(decodeURIComponent(answersParam)) as Record<
			number,
			number
		>;
		const cloudType = calculateCloudType(answers);
		const profile = CLOUD_PROFILES[cloudType];

		if (!profile) {
			throw error(404, 'Cloud 프로필을 찾을 수 없습니다');
		}

		const partnerParam = url.searchParams.get('partner');
		const initialPartner =
			partnerParam && CLOUD_TYPES.includes(partnerParam as CloudType)
				? (partnerParam as CloudType)
				: null;

		return {
			cloudProfile: profile,
			initialPartner
		};
	} catch (err) {
		throw error(500, '결과 처리 중 오류가 발생했습니다');
	}
};
