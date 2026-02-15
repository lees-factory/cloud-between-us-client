<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { locale, t } from '$lib/i18n';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { auth } from '$lib/firebase';
	import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { removeToken } from '$lib/utils/token';
	import { PUBLIC_FIREBASE_MEASUREMENT_ID } from '$env/static/public';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { untrack } from 'svelte';

	let { children, data } = $props();
	let user = $state<User | null>(untrack(() => data.user));

	$effect(() => {
		if (user !== data.user) {
			user = data.user;
		}
	});

	const isResultPage = $derived($page.url.pathname === '/result');

	// Google Analytics 4
	$effect(() => {
		if (browser && PUBLIC_FIREBASE_MEASUREMENT_ID) {
			// Initialize dataLayer
			window.dataLayer = window.dataLayer || [];
			function gtag(...args: any[]) {
				window.dataLayer.push(args);
			}
			window.gtag = gtag;
			gtag('js', new Date());
			gtag('config', PUBLIC_FIREBASE_MEASUREMENT_ID, {
				page_path: $page.url.pathname + $page.url.search
			});
		}
	});

	// Track page views on route change
	$effect(() => {
		if (browser && PUBLIC_FIREBASE_MEASUREMENT_ID) {
			window.gtag('config', PUBLIC_FIREBASE_MEASUREMENT_ID, {
				page_path: $page.url.pathname + $page.url.search
			});
		}
	});

	async function handleLogout() {
		await signOut(auth);
		removeToken();
		await goto('/', { invalidateAll: true });
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

<svelte:head>
	<link rel="icon" href={favicon} />
	{#if PUBLIC_FIREBASE_MEASUREMENT_ID}
		<script async src="https://www.googletagmanager.com/gtag/js?id={PUBLIC_FIREBASE_MEASUREMENT_ID}"></script>
	{/if}
</svelte:head>
<div class="relative min-h-screen">
	{#if !isResultPage}
		<nav class="absolute top-0 right-0 z-50 flex items-center gap-4 p-4">
			{#if user}
				<button
					type="button"
					onclick={handleLogout}
					class="cursor-pointer text-sm font-medium transition-opacity hover:opacity-70"
					style="color: #2c3e50"
				>
					{t('auth.logout', locale.current)}
				</button>
			{:else}
				<a
					href="/login"
					class="text-sm font-medium transition-opacity hover:opacity-70"
					style="color: #2c3e50"
				>
					{t('auth.login', locale.current)}
				</a>
			{/if}
			<button
				type="button"
				aria-label="Language"
				class="flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors hover:opacity-80"
				style="color: #2c3e50; background-color: rgba(167, 216, 245, 0.5)"
				onclick={() => {
					console.log('Toggling locale, current:', locale.current);
					locale.toggle();
				}}
			>
				<span class="font-medium">{locale.current === 'ko' ? t('lang.ko', locale.current) : t('lang.en', locale.current)}</span>
				<span class="opacity-60">{locale.current === 'ko' ? 'EN' : 'KO'}</span>
			</button>
		</nav>
	{/if}
	{@render children()}
	{#if !isResultPage}
		<Footer />
	{/if}
</div>
