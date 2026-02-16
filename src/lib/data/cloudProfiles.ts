import type { CloudProfile } from '$lib/types/cloud';
import type { Locale } from '$lib/i18n/translations';
import cloudProfilesData from './cloud-profiles.json';

/** Korean cloud profiles (default, backward-compatible export). */
export const CLOUD_PROFILES: Record<string, CloudProfile> = cloudProfilesData.ko as unknown as Record<
	string,
	CloudProfile
>;

/** English cloud profiles. */
export const CLOUD_PROFILES_EN: Record<string, CloudProfile> =
	cloudProfilesData.en as unknown as Record<string, CloudProfile>;

/** Returns cloud profiles for the given locale. */
export function getCloudProfiles(locale: Locale): Record<string, CloudProfile> {
	return locale === 'ko' ? CLOUD_PROFILES : CLOUD_PROFILES_EN;
}
