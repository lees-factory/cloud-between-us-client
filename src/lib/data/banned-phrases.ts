/**
 * 금칙어 리스트.
 * 프리미엄 리포트에 포함되면 안 되는 단어/패턴.
 * 진단/수치/과장/치료 뉘앙스를 걸러낸다.
 */

export const BANNED_PHRASES: string[] = [
	// 심리 진단 톤
	'회피형',
	'불안형',
	'안정형',
	'성격유형',
	'성격 유형',
	'MBTI',
	'mbti',
	'유형론',
	'avoidant',
	'anxious attachment',
	'attachment style',
	'personality type',
	'personality test',

	// 수치/측정
	'궁합도',
	'궁합 점수',
	'점수',
	'퍼센트',
	'%',
	'compatibility score',
	'score',
	'percent',
	'rating',

	// 과장/단정
	'운명',
	'영원히',
	'영원',
	'100%',
	'절대',
	'완벽한 커플',
	'destiny',
	'forever',
	'soulmate',
	'soul mate',
	'perfect match',
	'meant to be',
	'absolutely',

	// 치료/상담 과다 뉘앙스
	'치료',
	'진단',
	'처방',
	'상담사',
	'therapy',
	'diagnosis',
	'prescription',
	'therapist',
	'clinical'
];

/** 금칙어가 포함되어 있는지 검사 */
export function containsBannedPhrase(text: string): boolean {
	const lower = text.toLowerCase();
	return BANNED_PHRASES.some((phrase) => lower.includes(phrase.toLowerCase()));
}
