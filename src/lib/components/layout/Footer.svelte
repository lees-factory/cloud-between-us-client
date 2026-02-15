<script lang="ts">
	import { t } from '$lib/i18n';
	import { Cloud, Mail, Instagram, Twitter } from 'lucide-svelte';
</script>

<footer class="footer">
	<div class="footer-content">
		<!-- Brand & Disclaimer -->
		<div class="footer-section brand">
			<div class="brand-logo">
				<Cloud size={20} class="text-sky-blue" />
				<span class="brand-name">Cloud Between Us</span>
			</div>
			<p class="disclaimer">
				{t('footer.disclaimer')}
			</p>
			<p class="team-info">
				{t('footer.team')}
			</p>
		</div>

		<!-- Links -->
		<div class="footer-section links">
			<a href="/terms">{t('footer.terms')}</a>
			<a href="/privacy">{t('footer.privacy')}</a>
			<a href="mailto:monkeysforge@gmail.com">{t('footer.contact')}</a>
		</div>

		<!-- Socials -->
		<div class="footer-section socials">
			<a
				href="https://instagram.com"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Instagram"
			>
				<Instagram size={20} />
			</a>
			<a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
				<Twitter size={20} />
			</a>
			<a href="mailto:monkeysforge@gmail.com" aria-label="Email">
				<Mail size={20} />
			</a>
		</div>
	</div>

	<div class="footer-bottom">
		<p class="copyright">© {new Date().getFullYear()} {t('footer.copyright')}</p>
	</div>
</footer>

<style>
	.footer {
		background-color: #f8fafc;
		border-top: 1px solid var(--border-light);
		padding: 3rem 1.5rem 1.5rem;
		margin-top: auto;
	}

	.footer-content {
		max-width: 1024px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	@media (min-width: 768px) {
		.footer-content {
			flex-direction: row;
			justify-content: space-between;
			align-items: flex-start;
		}
	}

	.footer-section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.brand {
		max-width: 320px;
	}

	.brand-logo {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--text-dark);
		font-weight: 600;
		font-size: 1rem;
	}

	.disclaimer {
		font-size: 0.8125rem;
		color: var(--text-gray);
		line-height: 1.5;
		margin: 0;
	}

	.team-info {
		font-size: 0.75rem;
		color: var(--text-gray);
		opacity: 0.8;
		margin: 0;
	}

	.links {
		align-items: flex-start;
	}

	.links a {
		font-size: 0.875rem;
		color: var(--text-gray);
		text-decoration: none;
		transition: color 0.2s;
	}

	.links a:hover {
		color: var(--sky-blue);
	}

	.socials {
		flex-direction: row;
		gap: 1rem;
	}

	.socials a {
		color: var(--text-gray);
		transition:
			transform 0.2s,
			color 0.2s;
	}

	.socials a:hover {
		color: var(--sky-blue);
		transform: translateY(-2px);
	}

	.footer-bottom {
		max-width: 1024px;
		margin: 3rem auto 0;
		padding-top: 1.5rem;
		border-top: 1px solid rgba(0, 0, 0, 0.05);
		text-align: center;
	}

	.copyright {
		font-size: 0.75rem;
		color: var(--text-gray);
		opacity: 0.7;
		margin: 0;
	}
</style>
