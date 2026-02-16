import themesData from './themes.json';

/**
 * Step id(1–12)별 기후 테마.
 * 테스트 페이지에서 스텝에 맞는 배경·포인트 컬러·하늘 그라데이션·구름 투명도를 적용.
 */
export const stepThemes: Record<
	number,
	{ bg: string; accent: string; sky: string; cloudOpacity: number }
> = themesData as unknown as Record<
	number,
	{ bg: string; accent: string; sky: string; cloudOpacity: number }
>;
