import type { RequestHandler } from './$types';
import { getChemistry } from '$lib/data/chemistryMatrix';
import type { CloudType } from '$lib/types/cloud';
import type { Locale } from '$lib/i18n/translations';

const W = 1200;
const H = 630;
const SKY_BLUE = '#a7d8f5';
const TEXT_DARK = '#111827';
const OFF_WHITE = '#fafaf8';

function escapeXml(s: string): string {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

function buildSvg(skyName: string, label: string): string {
	const escapedName = escapeXml(skyName);
	const escapedLabel = escapeXml(label);
	const cx = W / 2;
	const cy = H / 2 - 20;
	const r = 140;

	return `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${OFF_WHITE}"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="${SKY_BLUE}"/>
  <text x="${cx}" y="${cy - 12}" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="600" fill="${TEXT_DARK}">${escapedName}</text>
  <text x="${cx}" y="${cy + 20}" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="${TEXT_DARK}" opacity="0.85">${escapedLabel}</text>
  <text x="${cx}" y="${H - 48}" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="22" fill="${TEXT_DARK}" opacity="0.7">Cloud Between Us</text>
</svg>`.trim();
}

export const GET: RequestHandler = async ({ url }) => {
	const type = url.searchParams.get('type') as CloudType | null;
	const partner = url.searchParams.get('partner') as CloudType | null;
	const locale = (url.searchParams.get('locale') || 'ko') as Locale;

	const skyName =
		type && partner
			? getChemistry(type, partner, locale).skyName
			: locale === 'ko'
				? '우리의 하늘'
				: 'Our Sky';
	const label = locale === 'ko' ? '우리 사이의 하늘' : 'The Sky Between You';

	const svg = buildSvg(skyName, label);

	let png: Buffer;
	try {
		const sharp = (await import('sharp')).default;
		png = await sharp(Buffer.from(svg))
			.resize(W, H)
			.png()
			.toBuffer();
	} catch {
		// sharp 미사용 시 SVG 그대로 반환 (일부 플랫폼은 SVG 미지원)
		return new Response(svg, {
			headers: {
				'Content-Type': 'image/svg+xml',
				'Cache-Control': 'public, max-age=86400'
			}
		});
	}

	return new Response(png, {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=86400'
		}
	});
};
