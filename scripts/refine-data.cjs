/**
 * data.json 중복 제거, 정규화, 정제
 * - banned_phrases: 중복 문자열 제거 (순서 유지)
 * - copy_pool: shelterClosingLines 제거 (closingLines와 동일)
 * - 모든 문자열: trim (앞뒤 공백·줄바꿈 정리)
 * - locale 키: ko/en 일관 유지
 */
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/lib/data/data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// 1) banned_phrases 중복 제거 (첫 출현 순서 유지)
if (Array.isArray(data.banned_phrases)) {
	const seen = new Set();
	data.banned_phrases = data.banned_phrases.filter((s) => {
		if (typeof s !== 'string') return true;
		const t = s.trim();
		if (seen.has(t)) return false;
		seen.add(t);
		return true;
	});
}

// 2) copy_pool: shelterClosingLines 제거 (closingLines와 완전 동일)
if (data.copy_pool) {
	if (data.copy_pool.shelterClosingLines && data.copy_pool.closingLines) {
		const a = JSON.stringify(data.copy_pool.shelterClosingLines);
		const b = JSON.stringify(data.copy_pool.closingLines);
		if (a === b) delete data.copy_pool.shelterClosingLines;
	}
}

// 3) 재귀 문자열 trim + 다중 공백/줄바꿈 정규화 (문자열 내부)
function normalizeString(s) {
	if (typeof s !== 'string') return s;
	const t = s.trim();
	return t.replace(/\s+/g, ' ').trim();
}
function trimStrings(obj) {
	if (obj === null || obj === undefined) return obj;
	if (typeof obj === 'string') return normalizeString(obj);
	if (Array.isArray(obj)) return obj.map((v) => trimStrings(v));
	if (typeof obj === 'object') {
		const out = {};
		for (const [k, v] of Object.entries(obj)) out[k] = trimStrings(v);
		return out;
	}
	return obj;
}
data.banned_phrases = trimStrings(data.banned_phrases);
data.themes = trimStrings(data.themes);
data.pair_meta = trimStrings(data.pair_meta);
data.copy_pool = trimStrings(data.copy_pool);
data.cloud_profiles = trimStrings(data.cloud_profiles);
data.cloud_meta = trimStrings(data.cloud_meta);
data.chemistry_matrix = trimStrings(data.chemistry_matrix);
data.test_questions = trimStrings(data.test_questions);
data.test_questions_en = trimStrings(data.test_questions_en);

// 4) themes 키 정규화: "1"~"12" 문자열 유지
if (data.themes && typeof data.themes === 'object') {
	const normalized = {};
	for (const [k, v] of Object.entries(data.themes)) {
		const key = String(k).trim();
		if (key && v && typeof v === 'object') normalized[key] = v;
	}
	data.themes = normalized;
}

// 5) en/ko 형식 통일: locale 객체는 항상 "ko" 먼저, "en" 다음 순서
function orderLocaleKeys(obj) {
	if (obj === null || typeof obj !== 'object') return obj;
	if (Array.isArray(obj)) return obj.map(orderLocaleKeys);

	const keys = Object.keys(obj);
	const hasKo = keys.includes('ko');
	const hasEn = keys.includes('en');
	const out = {};

	if (hasKo && hasEn) {
		out.ko = orderLocaleKeys(obj.ko);
		out.en = orderLocaleKeys(obj.en);
	}
	for (const k of keys) {
		if (k === 'ko' || k === 'en') continue;
		out[k] = orderLocaleKeys(obj[k]);
	}
	return out;
}
data.pair_meta = orderLocaleKeys(data.pair_meta);
data.copy_pool = orderLocaleKeys(data.copy_pool);
data.cloud_profiles = orderLocaleKeys(data.cloud_profiles);
data.cloud_meta = orderLocaleKeys(data.cloud_meta);
if (data.chemistry_matrix && typeof data.chemistry_matrix === 'object') {
	data.chemistry_matrix = orderLocaleKeys(data.chemistry_matrix);
}

// 6) DB/참조 경로 통일: 객체 키의 하이픈(-)을 언더스코어(_)로 변경
//    예: pair_meta.sunlit_mist, copy_pool.seasonFirstMeet.fast_slow, chemistry_matrix.sunlit_mist
//    → dot path로 참조 시 동일 형태 사용 가능 (data.pair_meta.sunlit_mist 등)
function keysHyphenToUnderscore(obj) {
	if (obj === null || typeof obj !== 'object') return obj;
	if (Array.isArray(obj)) return obj.map(keysHyphenToUnderscore);

	const out = {};
	for (const [k, v] of Object.entries(obj)) {
		const newKey =
			typeof k === 'string' && /^[a-z0-9]+(-[a-z0-9]+)+$/i.test(k) ? k.replace(/-/g, '_') : k;
		out[newKey] = keysHyphenToUnderscore(v);
	}
	return out;
}
data.pair_meta = keysHyphenToUnderscore(data.pair_meta);
data.copy_pool = keysHyphenToUnderscore(data.copy_pool);
data.chemistry_matrix = data.chemistry_matrix
	? keysHyphenToUnderscore(data.chemistry_matrix)
	: data.chemistry_matrix;

// 7) locale-at-leaf: { ko: array, en: array } → array of { field: { ko, en } } so every leaf is { ko, en }
function isLocalePair(obj) {
	if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return false;
	const keys = Object.keys(obj);
	return keys.length === 2 && keys.includes('ko') && keys.includes('en');
}
function localeAtLeaf(obj) {
	if (obj === null || typeof obj !== 'object') return obj;
	if (Array.isArray(obj)) return obj.map((v) => localeAtLeaf(v));

	if (!isLocalePair(obj)) {
		const out = {};
		for (const [k, v] of Object.entries(obj)) out[k] = localeAtLeaf(v);
		return out;
	}

	const koVal = obj.ko;
	const enVal = obj.en;

	// { ko: object, en: object } (동일 키의 객체) → 키별로 병합해 리프를 { ko, en }로
	if (
		typeof koVal === 'object' &&
		koVal !== null &&
		!Array.isArray(koVal) &&
		typeof enVal === 'object' &&
		enVal !== null &&
		!Array.isArray(enVal)
	) {
		const keys = Object.keys(koVal);
		if (keys.length > 0 && keys.every((k) => k in enVal)) {
			const out = {};
			for (const k of keys) {
				out[k] = localeAtLeaf({ ko: koVal[k], en: enVal[k] });
			}
			return out;
		}
	}

	// { ko: array, en: array } (동일 길이 배열)
	if (!Array.isArray(koVal) || !Array.isArray(enVal) || koVal.length !== enVal.length) {
		return obj;
	}
	const koArr = koVal;
	const enArr = enVal;
	const len = koArr.length;
	if (len === 0) return [];

	const firstKo = koArr[0];
	const firstEn = enArr[0];
	if (typeof firstKo === 'string' && typeof firstEn === 'string') {
		return koArr.map((_, i) => ({ text: { ko: koArr[i], en: enArr[i] } }));
	}
	if (
		typeof firstKo === 'object' &&
		firstKo !== null &&
		!Array.isArray(firstKo) &&
		typeof firstEn === 'object' &&
		firstEn !== null &&
		!Array.isArray(firstEn)
	) {
		const fieldNames = Object.keys(firstKo);
		if (fieldNames.length === 0 || !fieldNames.every((f) => f in firstEn)) return obj;
		return koArr.map((_, i) => {
			const item = {};
			for (const f of fieldNames) {
				item[f] = { ko: koArr[i][f], en: enArr[i][f] };
			}
			return item;
		});
	}
	return obj;
}
data.pair_meta = localeAtLeaf(data.pair_meta);
data.copy_pool = localeAtLeaf(data.copy_pool);
data.cloud_meta = localeAtLeaf(data.cloud_meta);
data.cloud_profiles = localeAtLeaf(data.cloud_profiles);
data.chemistry_matrix = localeAtLeaf(data.chemistry_matrix);

// 8) chemistry_matrix: skyName + skyNameKo → skyName: { ko, en }
if (data.chemistry_matrix && typeof data.chemistry_matrix === 'object') {
	for (const row of Object.values(data.chemistry_matrix)) {
		if (!row || typeof row !== 'object') continue;
		if ('skyNameKo' in row && row.skyNameKo != null) {
			row.skyName = { ko: row.skyNameKo, en: row.skyName };
			delete row.skyNameKo;
		}
	}
}

// 9) chemistry_matrix: 아직 문자열인 skyName, narrative, warning → 리프를 { ko, en }로 통일
if (data.chemistry_matrix && typeof data.chemistry_matrix === 'object') {
	for (const row of Object.values(data.chemistry_matrix)) {
		if (!row || typeof row !== 'object') continue;
		if (typeof row.skyName === 'string') {
			row.skyName = { ko: row.skyName, en: row.skyName };
		}
		if (typeof row.narrative === 'string') {
			row.narrative = { ko: row.narrative, en: row.narrative };
		}
		if (row.warning !== null && typeof row.warning === 'string') {
			row.warning = { ko: row.warning, en: row.warning };
		}
	}
}

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
console.log(
	'Refined data.json: dedup, trim, themes, en/ko order (ko first), keys hyphen→underscore, locale-at-leaf.'
);
