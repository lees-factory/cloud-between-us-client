/**
 * data.json 객체 참조 유틸
 * - DB에 넣었을 때와 동일한 dot path로 참조 가능.
 * - 키 규칙: 하이픈 없이 언더스코어 사용 (sunlit_mist, fast_slow, warm_cool 등).
 *
 * 예:
 *   getByPath(data, 'pair_meta.sunlit_mist.phenomenonName.ko')
 *   getByPath(data, 'copy_pool.seasonFirstMeet.fast_slow.ko')
 *   getByPath(data, 'chemistry_matrix.sunlit_mist.skyName')
 */

import data from './data.json';

export type Data = typeof data;

/** type pair 문자열을 data 키 형태로 변환 (sunlit-mist → sunlit_mist) */
export function toDataKey(pair: string): string {
	return pair.replace(/-/g, '_');
}

/** dot path로 값 조회. DB에서 같은 path로 참조할 때와 동일. */
export function getByPath<T = unknown>(obj: object, path: string): T | undefined {
	const keys = path.split('.');
	let current: unknown = obj;
	for (const key of keys) {
		if (current === null || current === undefined || typeof current !== 'object') return undefined;
		current = (current as Record<string, unknown>)[key];
	}
	return current as T;
}

/** data.json 루트 객체 */
export { data };
