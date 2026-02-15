<script lang="ts">
	import type { CloudProfile, CloudType } from '$lib/types/cloud';
	import CloudIcon from './CloudIcon.svelte';

	interface Props {
		cloud: CloudProfile;
		size?: 'small' | 'large';
	}

	let { cloud, size = 'large' }: Props = $props();

	const isLarge = $derived(size === 'large');
	const iconSize = $derived(isLarge ? 120 : 80);

	const CLOUD_COLORS: Record<CloudType, string> = {
		sunlit: '#FFD700',
		mist: '#7B9DB5',
		storm: '#8B7DB8',
		dawn: '#5AACCE',
		wild: '#C084C0',
		shade: '#9B9B9F'
	};

	const color = $derived(CLOUD_COLORS[cloud.type] ?? '#A7D8F5');
	const borderColor = $derived(`${color}20`);
	const pillBg = $derived(`${color}20`);
</script>

<div
	class="cloud-card"
	class:large={isLarge}
	class:small={!isLarge}
	style="border-color: {borderColor}"
>
	<!-- Cloud Icon & Title -->
	<div class="cloud-card-header">
		<div class="cloud-card-icon">
			<CloudIcon type={cloud.type} size={iconSize} />
		</div>
		<div>
			<h3 class="cloud-card-name" class:name-large={isLarge} class:name-small={!isLarge}>
				{cloud.name}
			</h3>
			<p class="cloud-card-title" style="color: {color}">
				{cloud.subtitle}
			</p>
		</div>
	</div>

	<!-- Keywords -->
	<div class="cloud-card-keywords">
		{#each cloud.keywords as keyword}
			<span class="cloud-card-pill" style="background-color: {pillBg}; color: var(--text-dark)">
				{keyword}
			</span>
		{/each}
	</div>

	{#if isLarge}
		<!-- Description -->
		<div class="cloud-card-description">
			{@html cloud.lore.trim()}
		</div>

		<!-- In Love -->
		<div class="cloud-card-section">
			<h4 class="cloud-card-section-label">In Love</h4>
			<ul class="cloud-card-list">
				{#each cloud.traits.inLove as style}
					<li class="cloud-card-list-item">
						<span class="cloud-card-bullet" style="color: {color}">•</span>
						<span>{style}</span>
					</li>
				{/each}
			</ul>
		</div>

		<!-- Strengths -->
		<div class="cloud-card-section">
			<h4 class="cloud-card-section-label">Strengths</h4>
			<ul class="cloud-card-list">
				{#each cloud.traits.strengths as strength}
					<li class="cloud-card-list-item">
						<span class="cloud-card-bullet" style="color: {color}">✓</span>
						<span>{strength}</span>
					</li>
				{/each}
			</ul>
		</div>

		<!-- Shadows -->
		<div class="cloud-card-section">
			<h4 class="cloud-card-section-label">Shadows</h4>
			<ul class="cloud-card-list">
				{#each cloud.traits.shadows as shadow}
					<li class="cloud-card-list-item">
						<span class="cloud-card-bullet shadow">⚠</span>
						<span>{shadow}</span>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>

<style>
	.cloud-card {
		background: white;
		border: 2px solid;
		border-radius: var(--radius-lg);
		padding: 1.5rem;
		text-align: center;
	}

	@media (min-width: 768px) {
		.cloud-card.large {
			padding: 2rem;
		}
	}

	.cloud-card-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	.cloud-card-icon {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.cloud-card-name {
		margin: 0;
		color: var(--text-dark);
		font-weight: 300;
	}

	.cloud-card-name.name-large {
		font-size: 1.875rem;
	}

	@media (min-width: 768px) {
		.cloud-card-name.name-large {
			font-size: 1.875rem;
		}
	}

	.cloud-card-name.name-small {
		font-size: 1.5rem;
	}

	.cloud-card-title {
		margin: 0.25rem 0 0;
		font-size: 0.875rem;
	}

	.cloud-card-keywords {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		justify-content: center;
		margin-bottom: 1.5rem;
	}

	.cloud-card-pill {
		padding: 0.25rem 0.75rem;
		border-radius: 9999px;
		font-size: 0.75rem;
	}

	.cloud-card-description {
		text-align: center;
		margin: 0 0 1.5rem;
		color: var(--text-gray);
		line-height: 1.6;
		font-size: 0.9375rem;
	}

	.cloud-card-section {
		text-align: left;
		margin-top: 1.5rem;
	}

	.cloud-card-section-label {
		font-size: 0.875rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-gray);
		margin: 0 0 0.5rem;
	}

	.cloud-card-list {
		margin: 0;
		padding-left: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.cloud-card-list-item {
		display: flex;
		align-items: flex-start;
		gap: 0.5rem;
		color: var(--text-gray);
		font-size: 0.9375rem;
		line-height: 1.5;
	}

	.cloud-card-bullet {
		flex-shrink: 0;
	}

	.cloud-card-bullet.shadow {
		color: var(--text-gray);
		opacity: 0.8;
	}
</style>
