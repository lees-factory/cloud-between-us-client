<script lang="ts">
	import { Cloud, ChevronDown } from 'lucide-svelte';
	import { t, cloudNames } from '$lib/i18n';
	import type { CloudType } from '$lib/types/cloud';
	import CloudIcon from '$lib/components/result/CloudIcon.svelte';

	const CLOUD_TYPES: CloudType[] = ['sunlit', 'mist', 'storm', 'dawn', 'wild', 'shade'];

	const heroHeadline2Lines = $derived(t('home.hero.headline2').split('\n'));
	const heroSubtextLines = $derived(t('home.hero.subtext').split('\n'));
	const conceptTitleLines = $derived(t('home.concept.title').split('\n'));
	const conceptBodyLines = $derived(t('home.concept.body').split('\n'));
	const cloudsFooterLines = $derived(t('home.clouds.footer').split('\n'));
	const names = $derived(cloudNames());

	function scrollToNext() {
		document.getElementById('concept')?.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<svelte:head>
	<title>{t('home.pageTitle')}</title>
</svelte:head>

<!-- 1. Hero -->
<section class="hero-section">
	<!-- 구름 애니메이션 (살짝 흐르는) -->
	<div class="cloud-layer cloud-layer--1" aria-hidden="true"></div>
	<div class="cloud-layer cloud-layer--2" aria-hidden="true"></div>
	<div class="cloud-layer cloud-layer--3" aria-hidden="true"></div>

	<div class="relative z-10 w-full max-w-2xl space-y-6 text-center md:space-y-8">
		<h1 class="hero-headline">
			{t('home.hero.headline')}
		</h1>
		<p class="hero-headline2">
			{#each heroHeadline2Lines as line, i}
				{line}
				{#if i < heroHeadline2Lines.length - 1}<br />{/if}
			{/each}
		</p>
		<p class="hero-subtext">
			{#each heroSubtextLines as line, i}
				{line}
				{#if i < heroSubtextLines.length - 1}<br />{/if}
			{/each}
		</p>

		<div class="pt-6 md:pt-8">
			<a href="/test" class="cta-primary">
				<Cloud size={22} strokeWidth={1.8} color="var(--text-dark)" />
				{t('home.hero.cta')}
			</a>
		</div>
		<p class="hero-no-signup">
			{t('home.hero.noSignup')}
		</p>
	</div>

	<!-- 스크롤 유도 화살표 -->
	<button
		type="button"
		aria-label="Scroll down"
		class="scroll-hint"
		onclick={scrollToNext}
	>
		<ChevronDown size={28} strokeWidth={2} />
	</button>
</section>

<!-- 2. Concept Reveal -->
<section id="concept" class="concept-section">
	<div class="w-full max-w-2xl space-y-8 text-center">
		<h2 class="concept-title">
			{#each conceptTitleLines as line, i}
				{line}
				{#if i < conceptTitleLines.length - 1}<br />{/if}
			{/each}
		</h2>
		<p class="concept-body">
			{#each conceptBodyLines as line, i}
				{line}
				{#if i < conceptBodyLines.length - 1}<br />{/if}
			{/each}
		</p>
	</div>
</section>

<!-- 3. Six Clouds Teaser -->
<section class="clouds-section">
	<div class="mx-auto max-w-3xl space-y-10 text-center">
		<h2 class="clouds-title">
			{t('home.clouds.title')}
		</h2>
		<ul class="grid grid-cols-2 gap-6 sm:grid-cols-3 md:gap-8">
			{#each names as name, i}
				<li class="flex flex-col items-center gap-2">
					<div class="cloud-icon-wrap">
						<CloudIcon type={CLOUD_TYPES[i]} size={56} />
					</div>
					<span class="cloud-name">{name}</span>
				</li>
			{/each}
		</ul>
		<p class="clouds-footer">
			{#each cloudsFooterLines as line, i}
				{line}
				{#if i < cloudsFooterLines.length - 1}<br />{/if}
			{/each}
		</p>
	</div>
</section>

<!-- 4. Social Proof -->
<section class="social-section">
	<div class="mx-auto max-w-2xl text-center">
		<p class="social-stat">
			{t('home.social.stat')}
		</p>
	</div>
</section>

<!-- 5. Final CTA -->
<section class="final-cta-section">
	<div class="w-full max-w-2xl space-y-8 text-center">
		<h2 class="final-cta-title">
			{t('home.finalCta.title')}
		</h2>
		<a href="/test" class="cta-primary">
			<Cloud size={22} strokeWidth={1.8} color="var(--text-dark)" />
			{t('home.finalCta.button')}
		</a>
		<p class="final-cta-sub">
			{t('home.finalCta.sub')}
		</p>
	</div>
</section>

<style>
	.hero-section {
		position: relative;
		display: flex;
		min-height: 100vh;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		padding: 0 1rem;
		background: linear-gradient(180deg, #e8f4fc 0%, #f5fafd 50%, var(--off-white) 100%);
	}
	.hero-headline {
		font-size: 2.25rem;
		font-weight: 300;
		letter-spacing: -0.025em;
		color: var(--text-dark);
	}
	@media (min-width: 768px) {
		.hero-headline {
			font-size: 3rem;
		}
	}
	@media (min-width: 1024px) {
		.hero-headline {
			font-size: 3.75rem;
		}
	}
	.hero-headline2 {
		font-size: 1.5rem;
		font-weight: 300;
		color: var(--text-dark);
	}
	@media (min-width: 768px) {
		.hero-headline2 {
			font-size: 1.875rem;
		}
	}
	.hero-subtext {
		padding-top: 0.5rem;
		font-size: 1rem;
		color: var(--text-gray);
	}
	@media (min-width: 768px) {
		.hero-subtext {
			font-size: 1.125rem;
		}
	}
	.hero-no-signup {
		font-size: 0.875rem;
		color: var(--text-gray);
	}
	.cta-primary {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem 2rem;
		font-size: 1.125rem;
		font-weight: 500;
		border-radius: 9999px;
		background-color: var(--sky-blue);
		color: var(--text-dark);
		transition: transform var(--transition-smooth);
	}
	.cta-primary:hover {
		transform: scale(1.05);
	}
	.cta-primary:focus-visible {
		outline: 2px solid var(--text-dark);
		outline-offset: 2px;
	}
	.scroll-hint {
		position: absolute;
		bottom: 1.5rem;
		left: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0;
		transform: translateX(-50%);
		color: var(--text-dark);
		opacity: 0.6;
		transition: opacity var(--transition-smooth);
	}
	.scroll-hint:hover {
		opacity: 1;
	}
	.concept-section {
		display: flex;
		min-height: 60vh;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 5rem 1rem;
		background-color: var(--off-white);
	}
	.concept-title {
		font-size: 1.5rem;
		line-height: 1.625;
		font-weight: 300;
		color: var(--text-dark);
	}
	@media (min-width: 768px) {
		.concept-title {
			font-size: 1.875rem;
		}
	}
	@media (min-width: 1024px) {
		.concept-title {
			font-size: 2.25rem;
		}
	}
	.concept-body {
		font-size: 1.125rem;
		font-weight: 300;
		white-space: pre-line;
		color: var(--text-gray);
	}
	@media (min-width: 768px) {
		.concept-body {
			font-size: 1.25rem;
		}
	}
	.clouds-section {
		padding: 5rem 1rem;
		background: linear-gradient(180deg, var(--off-white) 0%, #f5fafd 100%);
	}
	.clouds-title {
		font-size: 1.5rem;
		font-weight: 300;
		color: var(--text-dark);
	}
	@media (min-width: 768px) {
		.clouds-title {
			font-size: 1.875rem;
		}
	}
	.cloud-icon-wrap {
		display: flex;
		height: 3.5rem;
		width: 3.5rem;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
	}
	.cloud-name {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--text-dark);
	}
	.clouds-footer {
		font-size: 1rem;
		font-weight: 300;
		color: var(--text-gray);
	}
	@media (min-width: 768px) {
		.clouds-footer {
			font-size: 1.125rem;
		}
	}
	.social-section {
		padding: 4rem 1rem;
		background-color: #f5fafd;
	}
	.social-stat {
		font-size: 1.125rem;
		font-weight: 300;
		color: var(--text-dark);
	}
	@media (min-width: 768px) {
		.social-stat {
			font-size: 1.25rem;
		}
	}
	.final-cta-section {
		display: flex;
		min-height: 70vh;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 5rem 1rem;
		background: linear-gradient(180deg, #fef9f6 0%, #fdf5f0 50%, #faf0eb 100%);
	}
	.final-cta-title {
		font-size: 1.875rem;
		font-weight: 300;
		color: var(--text-dark);
	}
	@media (min-width: 768px) {
		.final-cta-title {
			font-size: 2.25rem;
		}
	}
	.final-cta-sub {
		font-size: 0.875rem;
		color: var(--text-gray);
	}
	.cloud-layer {
		position: absolute;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.7);
		pointer-events: none;
	}
	.cloud-layer--1 {
		width: 120px;
		height: 50px;
		top: 15%;
		left: -60px;
		animation: drift 45s linear infinite;
	}
	.cloud-layer--2 {
		width: 180px;
		height: 70px;
		top: 35%;
		right: -90px;
		animation: drift 55s linear infinite reverse;
		animation-delay: -10s;
	}
	.cloud-layer--3 {
		width: 100px;
		height: 40px;
		bottom: 25%;
		left: 20%;
		animation: drift 50s linear infinite;
		animation-delay: -25s;
	}
	@keyframes drift {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(100vw);
		}
	}
</style>
