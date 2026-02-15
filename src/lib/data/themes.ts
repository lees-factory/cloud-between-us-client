/**
 * Step id(1–12)별 기후 테마.
 * 테스트 페이지에서 스텝에 맞는 배경·포인트 컬러·하늘 그라데이션·구름 투명도를 적용.
 */
export const stepThemes: Record<
	number,
	{ bg: string; accent: string; sky: string; cloudOpacity: number }
> = {
	1: {
		bg: '#FFF9ED',
		accent: '#FFD700',
		sky: 'linear-gradient(180deg, #FFEFBA 0%, #FFFFFF 100%)',
		cloudOpacity: 0.3
	}, // 첫 빛
	2: {
		bg: '#F0F7FF',
		accent: '#70A1FF',
		sky: 'linear-gradient(180deg, #D6EFFF 0%, #FFFFFF 100%)',
		cloudOpacity: 0.4
	}, // 마음의 언어
	3: {
		bg: '#F2F2F7',
		accent: '#57606f',
		sky: 'linear-gradient(180deg, #CED6E0 0%, #F1F2F6 100%)',
		cloudOpacity: 0.8
	}, // 폭풍우
	4: {
		bg: '#FAF9F6',
		accent: '#A4B0BE',
		sky: 'linear-gradient(180deg, #E7E9ED 0%, #FFFFFF 100%)',
		cloudOpacity: 0.2
	}, // 일상
	5: {
		bg: '#F8F9FA',
		accent: '#747D8C',
		sky: 'linear-gradient(180deg, #DFE4EA 0%, #FFFFFF 100%)',
		cloudOpacity: 0.1
	}, // 여백
	6: {
		bg: '#F5F3FF',
		accent: '#A29BFE',
		sky: 'linear-gradient(180deg, #E0D7FF 0%, #FFFFFF 100%)',
		cloudOpacity: 0.5
	}, // 미래
	7: {
		bg: '#FFF0F0',
		accent: '#FF6B6B',
		sky: 'linear-gradient(180deg, #FFDADA 0%, #FFFFFF 100%)',
		cloudOpacity: 0.6
	}, // 질투
	8: {
		bg: '#FFF5F8',
		accent: '#FF8AFA',
		sky: 'linear-gradient(180deg, #FFDEF3 0%, #FFFFFF 100%)',
		cloudOpacity: 0.4
	}, // 친밀감
	9: {
		bg: '#F1F2F6',
		accent: '#2F3542',
		sky: 'linear-gradient(180deg, #A8B2C1 0%, #F1F2F6 100%)',
		cloudOpacity: 0.9
	}, // 위기
	10: {
		bg: '#FFF9F0',
		accent: '#FFA502',
		sky: 'linear-gradient(180deg, #FFE0B2 0%, #FFFFFF 100%)',
		cloudOpacity: 0.5
	}, // 사랑의 빛깔
	11: {
		bg: '#F4F7F6',
		accent: '#7BED9F',
		sky: 'linear-gradient(180deg, #D1F2EB 0%, #FFFFFF 100%)',
		cloudOpacity: 0.3
	}, // 혼자와 둘
	12: {
		bg: '#EDF2FF',
		accent: '#3742FA',
		sky: 'linear-gradient(180deg, #C7D2FE 0%, #FFFFFF 100%)',
		cloudOpacity: 0.2
	} // 영원
};
