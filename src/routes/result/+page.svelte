<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import type { CloudType } from '$lib/types/cloud';
	import { CLOUD_PROFILES } from '$lib/data/cloudProfiles';
	import { getChemistry } from '$lib/data/chemistryMatrix';
	import CloudCard from '$lib/components/result/CloudCard.svelte';
	import CloudIcon from '$lib/components/result/CloudIcon.svelte';
	import { Cloud, Lock, ArrowLeft, Share2 } from 'lucide-svelte';
	import { t, locale } from '$lib/i18n';

	const CLOUD_TYPES: CloudType[] = ['sunlit', 'mist', 'storm', 'dawn', 'wild', 'shade'];

	let { data }: { data: PageData } = $props();

	const myCloud = $derived(data.cloudProfile);
	const myType = $derived(myCloud.type);
	const profiles = $derived(CLOUD_PROFILES);
	const initialPartner = $derived(data.initialPartner ?? null);

	let userPartner = $state<CloudType | null>(null);
	const partnerType = $derived(userPartner ?? initialPartner);
	let isPremium = $state(false);

	const partnerCloud = $derived(partnerType ? (profiles[partnerType] ?? null) : null);
	const skyStory = $derived(partnerType ? getChemistry(myType, partnerType) : null);

	/** 무료 공개용: 서사 처음 3~4줄만 (감정 최고점 후 클리프행거) */
	const freeNarrativeLines = $derived(
		skyStory?.narrative
			? skyStory.narrative
					.trim()
					.split('\n')
					.map((l) => l.trim())
					.filter(Boolean)
					.slice(0, 4)
			: []
	);
	const freeNarrative = $derived(freeNarrativeLines.join('\n'));

	function handlePartnerSelect(type: CloudType) {
		userPartner = type;
		const url = new URL(page.url);
		url.searchParams.set('partner', type);
		goto(url.toString(), { replaceState: true });
	}

	function handleUnlock() {
		isPremium = true;
	}

	/** 현재 결과 페이지 전체 URL = 내 결과로 바로 열리는 공유 링크 (answers + partner 포함) */
	function getShareUrl(): string {
		if (typeof window === 'undefined') return '';
		return window.location.origin + page.url.pathname + page.url.search;
	}

	let shareFeedback = $state<'idle' | 'copied' | 'shared'>('idle');

	async function handleShare() {
		const url = getShareUrl();
		const title = t('result.shareTitle');
		const text = t('result.shareText').replace('{cloudName}', myCloud.name);

		try {
			if (typeof navigator !== 'undefined' && navigator.share) {
				await navigator.share({ title, text, url });
				shareFeedback = 'shared';
			} else {
				await navigator.clipboard.writeText(url);
				shareFeedback = 'copied';
			}
		} catch (err) {
			if ((err as Error).name === 'AbortError') return;
			try {
				await navigator.clipboard.writeText(url);
				shareFeedback = 'copied';
			} catch {
				// fallback: open mailto or do nothing
			}
		}
		setTimeout(() => {
			shareFeedback = 'idle';
		}, 2500);
	}
</script>

<svelte:head>
	<title>{myCloud.name} - Cloud Between Us</title>
	<meta name="description" content={myCloud.subtitle} />
</svelte:head>

<div class="result-min-h" style="background-color: var(--off-white)">
	<!-- Header -->
	<header class="result-header">
		<a href="/" class="header-link">
			<ArrowLeft size={20} />
			<span class="header-link-text">{t('result.back')}</span>
		</a>
		<div class="header-brand">
			<Cloud size={24} />
			<span class="header-brand-text">Cloud Between Us</span>
		</div>
		<div class="header-actions">
			<button
				type="button"
				class="header-lang"
				aria-label="Language"
				onclick={() => locale.toggle()}
			>
				<span class="header-lang-current">{$locale === 'ko' ? t('lang.ko') : t('lang.en')}</span>
				<span class="header-lang-switch">{$locale === 'ko' ? 'EN' : 'KO'}</span>
			</button>
			<div class="header-share-wrap">
				<button type="button" class="header-share" aria-label="Share" onclick={handleShare}>
					<Share2 size={16} />
					<span class="header-share-text">{t('result.share')}</span>
				</button>
				{#if shareFeedback === 'copied'}
					<span class="share-toast">{t('result.linkCopied')}</span>
				{/if}
			</div>
		</div>
	</header>

	<div class="result-main">
		<!-- My Cloud Type -->
		<section class="result-section">
			<h2 class="section-label">{t('result.yourCloudType')}</h2>
			<CloudCard cloud={myCloud} />
		</section>

		<!-- Partner Selection -->
		{#if !partnerType}
			<section class="result-section">
				<h2 class="section-title">{t('result.partnerQuestion')}</h2>
				<p class="section-sub">{t('result.partnerSub')}</p>
				<div class="partner-grid">
					{#each CLOUD_TYPES as type}
						<button type="button" class="partner-btn" onclick={() => handlePartnerSelect(type)}>
							<div class="partner-btn-icon">
								<CloudIcon {type} size={60} />
							</div>
							<span class="partner-btn-name">
								{profiles[type].name}
							</span>
						</button>
					{/each}
				</div>
			</section>
		{/if}

		<!-- Sky Story Section -->
		{#if partnerType && partnerCloud && skyStory}
			<!-- Partner Cloud -->
			<section class="result-section">
				<h2 class="section-label">{t('result.theirCloudType')}</h2>
				<CloudCard cloud={partnerCloud} size="small" />
				<button
					type="button"
					class="change-partner"
					onclick={() => {
						userPartner = null;
						const url = new URL(page.url);
						url.searchParams.delete('partner');
						goto(url.toString(), { replaceState: true });
					}}
				>
					{t('result.changePartner')}
				</button>
			</section>

			<!-- 무료 결과: 하늘 이름 + 짧은 서사(3~4줄) + 감정 트리거 (Soft Paywall 직전) -->
			<section class="chemistry-section">
				<div class="chemistry-circle">
					<div class="chemistry-circle-inner">
						<span class="chemistry-sky-name">{skyStory.skyName}</span>
						<span class="chemistry-label">{t('result.yourSky')}</span>
					</div>
				</div>
				<h3 class="chemistry-title">{skyStory.skyName}</h3>
				<p class="chemistry-tagline">{t('result.chemistryTagline')}</p>
				{#if freeNarrative}
					<p class="chemistry-free-story">{freeNarrative}</p>
				{/if}
				<p class="chemistry-emotional-trigger">
					{t('result.emotionalTrigger')}<br />
					{t('result.emotionalTrigger2')}
				</p>
			</section>

			<!-- 블러 영역 (Soft Paywall): 4섹션 미리보기 + $2.99 CTA -->
			{#if !isPremium}
				<section class="premium-wrap">
					<div class="premium-blurred">
						<div class="paywall-sections">
							<div class="paywall-section">
								<h4 class="paywall-section-title">{t('result.paywallFightTitle')}</h4>
								<p class="paywall-section-preview">{t('result.paywallFightPreview')}</p>
							</div>
							<div class="paywall-section">
								<h4 class="paywall-section-title">{t('result.paywallSafeTitle')}</h4>
								<p class="paywall-section-preview">{t('result.paywallSafePreview')}</p>
							</div>
							<div class="paywall-section">
								<h4 class="paywall-section-title">{t('result.paywallCollideTitle')}</h4>
								<p class="paywall-section-preview">{t('result.paywallCollidePreview')}</p>
							</div>
							<div class="paywall-section">
								<h4 class="paywall-section-title">{t('result.paywallBrighterTitle')}</h4>
								<p class="paywall-section-preview">{t('result.paywallBrighterPreview')}</p>
							</div>
						</div>
					</div>
					<div class="premium-overlay">
						<div class="premium-cta-box">
							<div class="premium-lock">
								<Lock size={40} aria-hidden="true" />
							</div>
							<h3 class="premium-cta-title">{t('result.paywallHeadline')}</h3>
							<ul class="paywall-bullets">
								<li>✔ {t('result.paywallBullet1')}</li>
								<li>✔ {t('result.paywallBullet2')}</li>
								<li>✔ {t('result.paywallBullet3')}</li>
								<li>✔ {t('result.paywallBullet4')}</li>
							</ul>
							<button type="button" class="premium-unlock-btn" onclick={handleUnlock}>
								☁️ {t('result.paywallBtn')}
							</button>
							<p class="premium-cta-sub">{t('result.paywallSub')}</p>
						</div>
					</div>
				</section>
			{:else}
				<section class="premium-unlocked">
					<div class="premium-card">
						<h4 class="premium-card-title">{t('result.longTermTitle')}</h4>
						<p class="premium-card-story unlocked">{skyStory.narrative}</p>
						{#if skyStory.warning}
							<div class="premium-warning">
								<p>⚠️ {skyStory.warning}</p>
							</div>
						{/if}

						<div class="premium-extra">
							<h5 class="premium-extra-label">{t('result.watchForTitle')}</h5>
							<p class="premium-extra-p">
								{myCloud.name} tends to {myCloud.keywords[0].toLowerCase()}. {partnerCloud.name}
								tends to {partnerCloud.keywords[0].toLowerCase()}. Try giving space before
								solving—and say appreciation out loud.
							</p>
						</div>

						<div class="premium-extra">
							<h5 class="premium-extra-label">{t('result.premiumBrighterTitle')}</h5>
							<ul class="premium-list">
								<li>{t('result.premiumTip1')}</li>
								<li>{t('result.premiumTip2')}</li>
								<li>{t('result.premiumTip3')}</li>
							</ul>
						</div>
					</div>
				</section>
			{/if}
		{/if}

		<!-- CTA -->
		<section class="result-cta">
			<p class="result-cta-tagline">{t('result.ctaTagline')}</p>
			<a href="/" class="result-cta-btn">{t('result.ctaBtn')}</a>
		</section>
	</div>
</div>

<style>
	.result-min-h {
		min-height: 100vh;
	}

	.result-header {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		padding: 1rem 1.5rem;
		border-bottom: 1px solid var(--border-light);
	}

	.header-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--text-gray);
		text-decoration: none;
		justify-self: start;
	}

	.header-link-text {
		display: none;
	}
	@media (min-width: 768px) {
		.header-link-text {
			display: inline;
		}
	}

	.header-brand {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		color: var(--sky-blue);
		justify-self: center;
	}

	.header-brand-text {
		font-weight: 300;
	}

	.header-actions {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 0.5rem;
		justify-self: end;
	}

	.header-lang {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.4rem 0.75rem;
		border-radius: 9999px;
		font-size: 0.8125rem;
		background: color-mix(in srgb, var(--sky-blue) 25%, transparent);
		color: var(--text-dark);
		border: none;
		cursor: pointer;
		transition: opacity var(--transition-smooth);
	}

	.header-lang:hover {
		opacity: 0.85;
	}

	.header-lang-current {
		font-weight: 500;
	}

	.header-lang-switch {
		opacity: 0.7;
	}

	.header-share-wrap {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.share-toast {
		position: absolute;
		top: 100%;
		right: 0;
		margin-top: 0.25rem;
		padding: 0.25rem 0.5rem;
		font-size: 0.75rem;
		color: var(--text-gray);
		background: var(--off-white);
		border-radius: var(--radius-sm);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
		white-space: nowrap;
		animation: fadeIn 0.2s ease;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.header-share {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		border-radius: 9999px;
		background: var(--sky-blue);
		color: var(--text-dark);
		border: none;
		cursor: pointer;
		transition: transform var(--transition-smooth);
	}

	.header-share:hover {
		transform: scale(1.05);
	}

	.header-share-text {
		display: none;
	}
	@media (min-width: 768px) {
		.header-share-text {
			display: inline;
		}
	}

	.result-main {
		max-width: 56rem;
		margin: 0 auto;
		padding: 2rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 3rem;
	}

	.result-section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.section-label {
		text-align: center;
		font-size: 0.875rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-gray);
		margin: 0;
	}

	.section-title {
		text-align: center;
		font-size: 1.5rem;
		color: var(--text-dark);
		margin: 0;
	}

	.section-sub {
		text-align: center;
		color: var(--text-gray);
		margin: 0;
	}

	.partner-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		padding-top: 1rem;
	}

	@media (min-width: 768px) {
		.partner-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.partner-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem;
		border-radius: var(--radius-sm);
		background: white;
		border: 2px solid var(--border-light);
		transition: transform var(--transition-smooth);
	}

	.partner-btn:hover {
		transform: scale(1.05);
	}

	.partner-btn-icon {
		display: flex;
		justify-content: center;
		margin-bottom: 0.5rem;
	}

	.partner-btn-name {
		font-size: 0.875rem;
		color: var(--text-dark);
	}

	.change-partner {
		width: 100%;
		text-align: center;
		font-size: 0.875rem;
		text-decoration: underline;
		color: var(--text-gray);
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.25rem;
	}

	.chemistry-section {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding: 2rem 0;
	}

	.chemistry-circle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 8rem;
		height: 8rem;
		border-radius: 50%;
		background: var(--sky-blue);
	}

	.chemistry-circle-inner {
		text-align: center;
	}

	.chemistry-sky-name {
		display: block;
		font-size: 0.875rem;
		color: var(--text-dark);
		line-height: 1.2;
		padding: 0 0.5rem;
	}

	.chemistry-label {
		display: block;
		font-size: 0.75rem;
		color: var(--text-dark);
		opacity: 0.8;
	}

	.chemistry-title {
		font-size: 1.875rem;
		font-weight: 300;
		color: var(--text-dark);
		margin: 0;
	}

	.chemistry-tagline {
		font-size: 1.125rem;
		font-style: italic;
		color: var(--text-gray);
		margin: 0;
	}

	.chemistry-free-story {
		font-size: 1rem;
		line-height: 1.7;
		color: var(--text-gray);
		margin: 0;
		white-space: pre-line;
		max-width: 28rem;
	}

	.chemistry-emotional-trigger {
		font-size: 1rem;
		font-style: italic;
		color: var(--text-dark);
		margin: 1rem 0 0;
		opacity: 0.9;
	}

	.paywall-sections {
		background: white;
		border-radius: var(--radius-lg);
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.paywall-section-title {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-dark);
		margin: 0 0 0.25rem;
	}

	.paywall-section-preview {
		font-size: 0.9375rem;
		color: var(--text-gray);
		margin: 0;
		line-height: 1.5;
	}

	.paywall-bullets {
		list-style: none;
		margin: 0;
		padding: 0;
		text-align: left;
		font-size: 0.9375rem;
		color: var(--text-dark);
		line-height: 1.6;
	}

	.paywall-bullets li {
		margin-bottom: 0.35rem;
	}

	.premium-wrap {
		position: relative;
	}

	.premium-blurred {
		filter: blur(6px);
		pointer-events: none;
		user-select: none;
		opacity: 0.6;
	}

	.premium-card {
		background: white;
		border-radius: var(--radius-lg);
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.premium-card-title {
		font-size: 1.25rem;
		color: var(--text-dark);
		margin: 0;
	}

	.premium-card-story {
		color: var(--text-gray);
		margin: 0;
		white-space: pre-line;
	}

	.premium-card-story.unlocked {
		line-height: 1.8;
	}

	.premium-warning {
		padding: 1rem;
		border-radius: var(--radius-sm);
		background: color-mix(in srgb, var(--warm-peach) 20%, transparent);
	}

	.premium-warning p {
		font-size: 0.875rem;
		color: var(--text-gray);
		margin: 0;
	}

	.premium-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.premium-cta-box {
		text-align: center;
		background: color-mix(in srgb, white 90%, transparent);
		backdrop-filter: blur(8px);
		padding: 2rem;
		border-radius: var(--radius-lg);
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.premium-lock {
		color: var(--sky-blue);
		margin: 0 auto;
		display: flex;
		justify-content: center;
	}

	.premium-cta-title {
		font-size: 1.5rem;
		color: var(--text-dark);
		margin: 0;
	}

	.premium-unlock-btn {
		padding: 1rem 2rem;
		border-radius: 9999px;
		font-size: 1.125rem;
		background: var(--warm-peach);
		color: var(--text-dark);
		border: none;
		cursor: pointer;
		transition: transform var(--transition-smooth);
	}

	.premium-unlock-btn:hover {
		transform: scale(1.05);
	}

	.premium-cta-sub {
		font-size: 0.875rem;
		color: var(--text-gray);
		margin: 0;
	}

	.premium-unlocked .premium-card {
		gap: 1.5rem;
	}

	.premium-extra {
		padding-top: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.premium-extra-label {
		font-size: 0.875rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-gray);
		margin: 0;
	}

	.premium-extra-p {
		color: var(--text-gray);
		line-height: 1.8;
		margin: 0;
	}

	.premium-list {
		margin: 0;
		padding-left: 1.25rem;
		color: var(--text-gray);
		line-height: 1.6;
	}

	.premium-list li {
		margin-bottom: 0.5rem;
	}

	.result-cta {
		text-align: center;
		padding: 2rem 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.result-cta-tagline {
		font-size: 0.875rem;
		color: var(--text-gray);
		margin: 0;
	}

	.result-cta-btn {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		border-radius: 9999px;
		background: var(--border-light);
		color: var(--text-dark);
		text-decoration: none;
		transition: transform var(--transition-smooth);
	}

	.result-cta-btn:hover {
		transform: scale(1.05);
	}
</style>
