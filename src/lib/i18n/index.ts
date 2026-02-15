import { locale } from './locale.svelte';
import { translations } from './translations';
import type { Locale } from './translations';
import type { RequestEvent } from '@sveltejs/kit';

export type TranslationKey =
	| 'home.pageTitle'
	| 'home.hero.headline'
	| 'home.hero.headline2'
	| 'home.hero.subtext'
	| 'home.hero.cta'
	| 'home.hero.noSignup'
	| 'home.concept.title'
	| 'home.concept.body'
	| 'home.clouds.title'
	| 'home.clouds.footer'
	| 'home.social.stat'
	| 'home.social.alt'
	| 'home.finalCta.title'
	| 'home.finalCta.button'
	| 'home.finalCta.sub'
	| 'test.pageTitle'
	| 'test.back'
	| 'test.next'
	| 'test.seeResult'
	| 'result.yourCloudType'
	| 'result.partnerQuestion'
	| 'result.partnerSub'
	| 'result.theirCloudType'
	| 'result.changePartner'
	| 'result.yourSky'
	| 'result.chemistryTagline'
	| 'result.skyStoryTitle'
	| 'result.emotionalTrigger'
	| 'result.emotionalTrigger2'
	| 'result.conflictPreviewTitle'
	| 'result.conflictPreviewLockedTip'
	| 'result.paywallFightTitle'
	| 'result.paywallFightPreview'
	| 'result.paywallSafeTitle'
	| 'result.paywallSafePreview'
	| 'result.paywallCollideTitle'
	| 'result.paywallCollidePreview'
	| 'result.paywallBrighterTitle'
	| 'result.paywallBrighterPreview'
	| 'result.paywallHeadline'
	| 'result.paywallSub'
	| 'result.unlockTitle'
	| 'result.unlockSub'
	| 'result.longTermTitle'
	| 'result.watchForTitle'
	| 'result.premiumBrighterTitle'
	| 'result.premiumTip1'
	| 'result.premiumTip2'
	| 'result.premiumTip3'
	| 'result.ctaTagline'
	| 'result.ctaBtn'
	| 'result.back'
	| 'result.share'
	| 'result.linkCopied'
	| 'result.shareTitle'
	| 'result.shareText'
	| 'result.shareModalTitle'
	| 'result.copyLink'
	| 'result.hint'
	| 'result.hintLine2'
	| 'result.watchForDesc'
	| 'result.premiumShelterTitle'
	| 'result.premiumShelterPartner'
	| 'result.premiumShelterUser'
	| 'result.premiumShadowsTitle'
	| 'result.premiumShadowsUser'
	| 'result.premiumShadowsPartner'
	| 'result.seasonsTitle'
	| 'result.seasonFirstMeet'
	| 'result.seasonSettling'
	| 'result.seasonLongTerm'
	| 'result.dangerPhrasesTitle'
	| 'result.dangerPhrasesSubtitle'
	| 'result.dangerBad'
	| 'result.dangerBetter'
	| 'result.dangerForYou'
	| 'result.dangerForThem'
	| 'result.loveLanguageTitle'
	| 'result.loveYourWay'
	| 'result.loveTheirWay'
	| 'result.misreadingTitle'
	| 'result.misreadingSignal'
	| 'result.misreadingRead'
	| 'result.myNamePlaceholder'
	| 'result.partnerNamePlaceholder'
	| 'lang.ko'
	| 'lang.en'
	| 'auth.login'
	| 'auth.signup'
	| 'auth.email'
	| 'auth.password'
	| 'auth.confirmPassword'
	| 'auth.noAccount'
	| 'auth.hasAccount'
	| 'auth.loginAction'
	| 'auth.signupAction'
	| 'auth.logout'
	| 'auth.welcome'
	| 'auth.createAccount'
	| 'auth.loginToUnlock';

function getNested(obj: Record<string, unknown>, path: string): unknown {
	return path
		.split('.')
		.reduce((acc: unknown, key) => (acc as Record<string, unknown>)?.[key], obj);
}

/** 현재 locale에 맞는 번역 문자열 반환. \n은 줄바꿈으로 유지됨. */
export function t(key: TranslationKey, lang?: Locale): string {
	const loc = lang ?? locale.current;
	const value = getNested(translations[loc] as Record<string, unknown>, key);
	if (typeof value === 'string') return value;
	const fallback = getNested(translations.en as Record<string, unknown>, key);
	return typeof fallback === 'string' ? fallback : key;
}

/** 현재 locale의 cloud names 배열 (6개). */
export function cloudNames(lang?: Locale): string[] {
	const loc = lang ?? locale.current;
	const names = (translations[loc] as { home: { clouds: { names: readonly string[] } } }).home
		?.clouds?.names;
	const fallback = (translations.en as { home: { clouds: { names: readonly string[] } } }).home
		.clouds.names;
	return Array.isArray(names) ? [...names] : [...fallback];
}

/** Server-side: detect locale from cookie or Accept-Language header. */
export function getLocaleFromEvent(event: RequestEvent): Locale {
	const cookie = event.cookies.get('locale');
	if (cookie === 'ko' || cookie === 'en') return cookie;

	const accept = event.request.headers.get('accept-language') ?? '';
	if (accept.startsWith('ko')) return 'ko';

	return 'en';
}

export { locale } from './locale.svelte';
export { translations } from './translations';
export type { Locale } from './translations';
