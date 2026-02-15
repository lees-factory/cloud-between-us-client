<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { locale, t } from '$lib/i18n';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { auth } from '$lib/firebase';
	import { onAuthStateChanged, signOut } from 'firebase/auth';

	let { children, data } = $props();
	let user = $state(data.user);

	const isResultPage = $derived($page.url.pathname === '/result');

	async function handleLogout() {
		await signOut(auth);
	}

	$effect(() => {
		if (browser) {
			const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
				user = firebaseUser;
			});
			return unsubscribe;
		}
	});

	$effect(() => {
		if (browser && locale.current) {
			document.documentElement.lang = locale.current;
		}
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="relative min-h-screen">
	{#if !isResultPage}
		<nav class="absolute top-0 right-0 z-10 flex items-center gap-4 p-4">
			{#if user}
				<button
					type="button"
					onclick={handleLogout}
					class="text-sm font-medium transition-opacity hover:opacity-70"
					style="color: #2c3e50"
				>
					{t('auth.logout')}
				</button>
			{:else}
				<a
					href="/login"
					class="text-sm font-medium transition-opacity hover:opacity-70"
					style="color: #2c3e50"
				>
					{t('auth.login')}
				</a>
			{/if}
			<button
				type="button"
				aria-label="Language"
				class="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors hover:opacity-80"
				style="color: #2c3e50; background-color: rgba(167, 216, 245, 0.5)"
				onclick={() => locale.toggle()}
			>
				<span class="font-medium">{locale.current === 'ko' ? t('lang.ko') : t('lang.en')}</span>
				<span class="opacity-60">{locale.current === 'ko' ? 'EN' : 'KO'}</span>
			</button>
		</nav>
	{/if}
	{@render children()}
</div>
