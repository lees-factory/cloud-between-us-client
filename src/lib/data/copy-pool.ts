import copyPoolData from './copy-pool.json';

/**
 * 프리미엄 리포트 템플릿에서 사용할 문장 풀.
 * 시드 기반으로 선택하여 같은 조합이라도 약간의 변화를 준다.
 */

export const OPENING_PATTERNS = copyPoolData.openingPatterns as typeof copyPoolData.openingPatterns;
export const SOFTENING_LINES = copyPoolData.softeningLines as typeof copyPoolData.softeningLines;
export const STRENGTH_LINES = copyPoolData.strengthLines as typeof copyPoolData.strengthLines;
export const GROWTH_LINES = copyPoolData.growthLines as typeof copyPoolData.growthLines;
export const CLOSING_LINES = copyPoolData.closingLines as typeof copyPoolData.closingLines;
export const SHARE_CARD_PHRASES = copyPoolData.shareCardPhrases as typeof copyPoolData.shareCardPhrases;
export const SHELTER_CLOSING_LINES = copyPoolData.shelterClosingLines as typeof copyPoolData.shelterClosingLines;
export const SHARE_CARD_CAPTIONS = copyPoolData.shareCardCaptions as typeof copyPoolData.shareCardCaptions;
export const FRICTION_PATTERNS = copyPoolData.frictionPatterns as typeof copyPoolData.frictionPatterns;

/** ── Seasons (사랑의 계절) 템플릿 ── */
export const SEASON_FIRST_MEET = copyPoolData.seasonFirstMeet as typeof copyPoolData.seasonFirstMeet;
export const SEASON_SETTLING = copyPoolData.seasonSettling as typeof copyPoolData.seasonSettling;
export const SEASON_LONG_TERM = copyPoolData.seasonLongTerm as typeof copyPoolData.seasonLongTerm;

/** pace/temperature 미스매치 기반 misreading 패턴 */
export const MISREADING_PATTERNS = copyPoolData.misreadingPatterns as typeof copyPoolData.misreadingPatterns;

/** 기본 micro action 풀 — 조합별로 1~2개 교체 가능 */
export const DEFAULT_ACTIONS = copyPoolData.defaultActions as typeof copyPoolData.defaultActions;
