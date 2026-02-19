import type { RequestHandler } from './$types';
import { getCloudSvgInner } from '$lib/data/cloudSvgStrings';
import type { CloudType } from '$lib/types/cloud';

const W = 1200;
const H = 630;
/** 파스텔 배경: 연한 하늘·라벤더 톤 */
const PASTEL_BG = '#e8f2f8';

/** 구름 두 개 나란히 */
function buildSvg(typeA: CloudType, typeB: CloudType): string {
	const innerA = getCloudSvgInner(typeA);
	const innerB = getCloudSvgInner(typeB);
	const scale = 2.8;
	const size = 120 * scale; // 336
	const y = (H - size) / 2;
	const gap = 80;
	const leftX = (W - size * 2 - gap) / 2;
	const rightX = leftX + size + gap;

	return `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${PASTEL_BG}"/>
  <g transform="translate(${leftX}, ${y}) scale(${scale})">${innerA}</g>
  <g transform="translate(${rightX}, ${y}) scale(${scale})">${innerB}</g>
</svg>`.trim();
}

/** 구름 하나 중앙 배치 */
function buildSingleSvg(typeA: CloudType): string {
	const innerA = getCloudSvgInner(typeA);
	const scale = 3.8;
	const size = 120 * scale; // 456
	const x = (W - size) / 2;
	const y = (H - size) / 2;

	return `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${PASTEL_BG}"/>
  <g transform="translate(${x}, ${y}) scale(${scale})">${innerA}</g>
</svg>`.trim();
}

export const GET: RequestHandler = async ({ url }) => {
	const type = url.searchParams.get('type') as CloudType | null;
	const partner = url.searchParams.get('partner') as CloudType | null;

	const typeA = type ?? 'sunlit';

	const svg = partner ? buildSvg(typeA, partner as CloudType) : buildSingleSvg(typeA);

	let png: Buffer;
	try {
		const sharp = (await import('sharp')).default;
		png = await sharp(Buffer.from(svg))
			.resize(W, H)
			.png()
			.toBuffer();
	} catch {
		return new Response(svg, {
			headers: {
				'Content-Type': 'image/svg+xml',
				'Cache-Control': 'public, max-age=86400'
			}
		});
	}

	return new Response(new Uint8Array(png), {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=86400'
		}
	});
};
