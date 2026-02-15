<script lang="ts">
	import { t } from '$lib/i18n';
	import { Cloud, ArrowLeft } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import { auth } from '$lib/firebase';
	import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
	import { goto } from '$app/navigation';

	let email = $state('');
	let password = $state('');
	let isLoading = $state(false);

	async function handleSubmit(e: Event) {
		e.preventDefault();
		isLoading = true;
		try {
			await signInWithEmailAndPassword(auth, email, password);
			goto('/');
		} catch (error: any) {
			console.error('Error logging in:', error);
			alert(error.message);
		} finally {
			isLoading = false;
		}
	}

	async function signInWithGoogle() {
		isLoading = true;
		const provider = new GoogleAuthProvider();
		try {
			await signInWithPopup(auth, provider);
			goto('/');
		} catch (error: any) {
			console.error('Error logging in:', error);
			alert(error.message);
		} finally {
			isLoading = false;
		}
	}
</script>

<svelte:head>
	<title>{t('auth.login')} — Cloud Between Us</title>
</svelte:head>

<main class="auth-page">
	<a href="/" class="back-link">
		<ArrowLeft size={20} />
	</a>

	<div class="auth-card" in:fly={{ y: 20, duration: 800 }}>
		<div class="auth-header">
			<div class="logo-wrap">
				<Cloud size={40} strokeWidth={1.5} class="text-sky-blue" />
			</div>
			<h1>{t('auth.welcome')}</h1>
			<p>{t('home.pageTitle')}</p>
		</div>

		<div class="social-auth">
			<button type="button" class="google-btn" onclick={signInWithGoogle}>
				<svg viewBox="0 0 24 24" width="20" height="24" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.18 1-.78 1.85-1.63 2.42v2.01h2.64c1.55-1.42 2.43-3.5 2.43-5.44z"
						fill="#4285F4"
					/>
					<path
						d="M12 23c2.97 0 5.46-.98 7.28-2.66l-2.64-2.01c-.73.48-1.66.76-2.64.76-2.03 0-3.74-1.37-4.35-3.22H4.18v2.06C5.99 21.57 8.81 23 12 23z"
						fill="#34A853"
					/>
					<path
						d="M7.65 15.87c-.15-.45-.24-.93-.24-1.42s.09-.97.24-1.42V10.97H4.18c-.51 1.02-.8 2.16-.8 3.38s.29 2.36.8 3.38l3.47-2.86z"
						fill="#FBBC05"
					/>
					<path
						d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 8.81 1 5.99 2.43 4.18 5.43l3.47 2.86c.61-1.85 2.32-3.22 4.35-3.22z"
						fill="#EA4335"
					/>
				</svg>
				<span>Google로 계속하기</span>
			</button>
		</div>

		<div class="divider">
			<span>or</span>
		</div>

		<form onsubmit={handleSubmit} class="auth-form">
			<div class="input-group">
				<label for="email">{t('auth.email')}</label>
				<input type="email" id="email" bind:value={email} required placeholder="sky@example.com" />
			</div>

			<div class="input-group">
				<label for="password">{t('auth.password')}</label>
				<input type="password" id="password" bind:value={password} required />
			</div>

			<button type="submit" class="auth-submit" disabled={isLoading}>
				{#if isLoading}
					<span class="loading-dots">...</span>
				{:else}
					{t('auth.loginAction')}
				{/if}
			</button>
		</form>

		<div class="auth-footer">
			<span>{t('auth.noAccount')}</span>
			<a href="/signup">{t('auth.signup')}</a>
		</div>
	</div>
</main>

<style>
	.auth-page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(180deg, #f8fafc 0%, #e8f4fc 100%);
		padding: 1.5rem;
		position: relative;
	}

	.back-link {
		position: absolute;
		top: 1.5rem;
		left: 1.5rem;
		color: var(--text-gray);
		padding: 0.5rem;
		border-radius: 50%;
		transition: background 0.2s;
	}

	.back-link:hover {
		background: rgba(0, 0, 0, 0.05);
	}

	.auth-card {
		width: 100%;
		max-width: 400px;
		background: rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(12px);
		padding: 2.5rem 2rem;
		border-radius: 2rem;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
		border: 1px solid white;
	}

	.auth-header {
		text-align: center;
		margin-bottom: 2.5rem;
	}

	.logo-wrap {
		display: inline-flex;
		padding: 1rem;
		background: #f0f9ff;
		border-radius: 1.25rem;
		margin-bottom: 1.25rem;
	}

	.auth-header h1 {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--text-dark);
		margin-bottom: 0.5rem;
	}

	.auth-header p {
		font-size: 0.875rem;
		color: var(--text-gray);
	}

	.social-auth {
		margin-bottom: 1.5rem;
	}

	.google-btn {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding: 0.875rem;
		background: white;
		border: 1px solid var(--border-light);
		border-radius: 1rem;
		color: var(--text-dark);
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.google-btn:hover {
		background: #f8fafc;
		border-color: #cbd5e1;
	}

	.divider {
		display: flex;
		align-items: center;
		text-align: center;
		margin-bottom: 1.5rem;
		color: var(--text-gray);
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.divider::before,
	.divider::after {
		content: '';
		flex: 1;
		border-bottom: 1px solid var(--border-light);
	}

	.divider::before {
		margin-right: 1rem;
	}

	.divider::after {
		margin-left: 1rem;
	}

	.auth-form {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.input-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.input-group label {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--text-gray);
		padding-left: 0.25rem;
	}

	.input-group input {
		padding: 0.875rem 1.25rem;
		border-radius: 1rem;
		border: 1px solid var(--border-light);
		background: white;
		font-size: 1rem;
		transition: all 0.2s;
	}

	.input-group input:focus {
		outline: none;
		border-color: var(--sky-blue);
		box-shadow: 0 0 0 4px rgba(167, 216, 245, 0.2);
	}

	.auth-submit {
		margin-top: 0.5rem;
		padding: 1rem;
		border-radius: 1rem;
		background: var(--sky-blue);
		color: var(--text-dark);
		font-weight: 600;
		border: none;
		cursor: pointer;
		transition:
			transform 0.2s,
			opacity 0.2s;
	}

	.auth-submit:hover:not(:disabled) {
		transform: translateY(-2px);
		opacity: 0.9;
	}

	.auth-submit:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.auth-footer {
		margin-top: 2rem;
		text-align: center;
		font-size: 0.875rem;
		color: var(--text-gray);
	}

	.auth-footer a {
		color: var(--sky-blue);
		font-weight: 600;
		margin-left: 0.5rem;
		text-decoration: none;
	}

	.auth-footer a:hover {
		text-decoration: underline;
	}
</style>
