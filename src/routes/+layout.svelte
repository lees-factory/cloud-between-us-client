<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { locale, t } from '$lib/i18n';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	let { children } = $props();

	const isResultPage = $derived($page.url.pathname === '/result');

	$effect(() => {
		if (browser && $locale) {
			document.documentElement.lang = $locale;
		}
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="relative min-h-screen">
	{#if !isResultPage}
		<nav class="absolute top-0 right-0 z-10 flex items-center gap-2 p-4">
			<button
				type="button"
				aria-label="Language"
				class="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors hover:opacity-80"
				style="color: #2c3e50; background-color: rgba(167, 216, 245, 0.5)"
				onclick={() => locale.toggle()}
			>
				<span class="font-medium">{$locale === 'ko' ? t('lang.ko') : t('lang.en')}</span>
				<span class="opacity-60">{$locale === 'ko' ? 'EN' : 'KO'}</span>
			</button>
		</nav>
	{/if}
	{@render children()}
</div>
