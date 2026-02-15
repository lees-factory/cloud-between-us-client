<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import type { CloudProfile } from '$lib/types/cloud';
	import { t, locale } from '$lib/i18n';

	interface Props {
		cloudProfile: CloudProfile;
	}

	let { cloudProfile }: Props = $props();

	let revealed = $state(false);

	$effect(() => {
		const timerId = setTimeout(() => (revealed = true), 300);
		return () => clearTimeout(timerId);
	});
</script>

<section class="cloud-reveal-container">
	{#if revealed}
		<div class="cloud-icon-wrapper" in:fly={{ y: -50, duration: 600, delay: 200 }}>
			<span class="cloud-icon" aria-hidden="true">{cloudProfile.emoji}</span>
		</div>

		<div class="cloud-info" in:fade={{ duration: 600, delay: 400 }}>
			<h1 class="cloud-name">{cloudProfile.name}</h1>
			<p class="cloud-subtitle">{cloudProfile.subtitle}</p>

			<div class="cloud-keywords">
				{#each cloudProfile.keywords as keyword, i}
					<span class="keyword" in:fade={{ delay: 600 + i * 100 }}>
						{keyword}
					</span>
					{#if i < cloudProfile.keywords.length - 1}
						<span class="separator">·</span>
					{/if}
				{/each}
			</div>
		</div>

		<blockquote class="sky-lore" in:fade={{ duration: 600, delay: 800 }}>
			{@html cloudProfile.lore}
		</blockquote>

		<p class="chemistry-hint">
			"{locale.current && t('result.hint')}<br />{t('result.hintLine2')}"
		</p>
	{/if}
</section>

<style>
	.cloud-reveal-container {
		text-align: center;
		padding: 4rem 2rem;
		background: linear-gradient(to bottom, var(--sky-blue), var(--off-white));
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-soft);
	}

	.cloud-icon-wrapper {
		margin-bottom: 2rem;
	}

	.cloud-icon {
		font-size: 6rem;
		display: block;
	}

	.cloud-name {
		font-size: 2.5rem;
		font-weight: 500;
		letter-spacing: 0.02em;
		margin: 0;
		color: var(--text-dark);
	}

	.cloud-subtitle {
		font-size: 1.25rem;
		font-style: italic;
		color: var(--text-gray);
		margin-top: 0.5rem;
	}

	.cloud-keywords {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		margin-top: 2rem;
		flex-wrap: wrap;
	}

	.keyword {
		font-size: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--text-gray);
	}

	.separator {
		color: var(--text-gray);
		opacity: 0.5;
	}

	.sky-lore {
		margin-top: 3rem;
		font-style: italic;
		line-height: 1.8;
		color: #555;
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
		border-left: 3px solid var(--warm-peach);
		padding-left: 1.5rem;
		text-align: left;
	}

	.chemistry-hint {
		text-align: center;
		font-size: 1.25rem;
		line-height: 1.6;
		color: var(--text-dark);
		margin-top: 3rem;
	}

	@media (max-width: 768px) {
		.cloud-icon {
			font-size: 4rem;
		}

		.cloud-name {
			font-size: 2rem;
		}

		.cloud-subtitle {
			font-size: 1.125rem;
		}
	}
</style>
