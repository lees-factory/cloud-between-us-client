import bannedPhrasesData from './banned-phrases.json';

/**
 * 금칙어 리스트.
 * 프리미엄 리포트에 포함되면 안 되는 단어/패턴.
 * 진단/수치/과장/치료 뉘앙스를 걸러낸다.
 */
export const BANNED_PHRASES: string[] = bannedPhrasesData;

/** 금칙어가 포함되어 있는지 검사 */
export function containsBannedPhrase(text: string): boolean {
	const lower = text.toLowerCase();
	return BANNED_PHRASES.some((phrase) => lower.includes(phrase.toLowerCase()));
}
