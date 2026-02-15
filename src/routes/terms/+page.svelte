<script lang="ts">
	import { t, locale } from '$lib/i18n';
	import { Cloud } from 'lucide-svelte';
</script>

<main class="page-container">
	<a href="/" class="home-link" aria-label="Go to Home">
		<Cloud size={24} class="text-sky-blue" />
		<span class="brand-name">Cloud Between Us</span>
	</a>

	<h1 class="page-title">{t('footer.terms')}</h1>
	<div class="content">
		{#if locale.current === 'ko'}
			<p>
				본 약관은 Cloud Between Us(이하 "서비스")의 이용 조건 및 절차, 이용자와 서비스 제공자의 권리,
				의무 및 책임사항을 규정합니다.
			</p>

			<h2>제1조 (목적)</h2>
			<p>
				본 서비스는 개인 판매자가 운영하는 엔터테인먼트 목적의 심리 테스트 서비스입니다. 제공되는
				결과는 전문적인 심리 진단이 아니며, 재미와 참고용으로만 활용되어야 합니다.
			</p>

			<h2>제2조 (서비스의 제공)</h2>
			<p>
				1. 서비스는 연중무휴 1일 24시간 제공함을 원칙으로 합니다.<br />2. 시스템 점검 등 불가피한
				사유가 발생할 경우 일시적으로 중단될 수 있습니다.
			</p>

			<h2>제3조 (유료 서비스)</h2>
			<p>
				본 서비스의 일부 결과 콘텐츠는 유료($2.99)로 제공되며, 결제는 PayPal 등의 결제 대행사를 통해
				이루어집니다. 디지털 콘텐츠 특성상 결제 후 콘텐츠가 공개된 이후에는 환불이 제한될 수 있습니다.
			</p>

			<h2>제4조 (책임의 한계)</h2>
			<p>
				서비스 제공자는 이용자가 본 서비스의 정보를 이용하여 입은 손해에 대하여 법적인 책임을 지지
				않습니다.
			</p>
		{:else}
			<p>
				These Terms and Conditions govern the conditions and procedures for using Cloud Between Us
				(hereinafter referred to as the "Service"), as well as the rights, obligations, and
				responsibilities of the users and the service provider.
			</p>

			<h2>Article 1 (Purpose)</h2>
			<p>
				This service is an entertainment-focused psychological test service operated by an
				individual seller. The results provided are not professional psychological diagnoses and
				should be used for entertainment and reference purposes only.
			</p>

			<h2>Article 2 (Service Provision)</h2>
			<p>
				1. The Service is provided 24 hours a day, 365 days a year in principle.<br />
				2. It may be temporarily suspended due to unavoidable reasons such as system maintenance.
			</p>

			<h2>Article 3 (Paid Services)</h2>
			<p>
				Some result content of this Service is provided for a fee ($2.99), and payments are processed
				through payment agencies such as PayPal. Due to the nature of digital content, refunds may
				be restricted once the content has been revealed following payment.
			</p>

			<h2>Article 4 (Limitation of Liability)</h2>
			<p>
				The service provider shall not be held legally liable for any damages incurred by the user
				using the information provided by this Service.
			</p>
		{/if}
	</div>
</main>

<style>
	.page-container {
		max-width: 800px;
		margin: 0 auto;
		padding: 4rem 1.5rem;
		min-height: 80vh;
	}

	.page-title {
		font-size: 2rem;
		font-weight: 700;
		color: var(--text-dark);
		margin-bottom: 2rem;
	}

	.content {
		line-height: 1.8;
		color: var(--text-dark);
	}

	h2 {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 2rem 0 1rem;
		color: var(--text-dark);
	}

	p {
		margin-bottom: 1rem;
		color: var(--text-gray);
	}

	.home-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 2rem;
		text-decoration: none;
		color: var(--text-dark);
		transition: opacity 0.2s;
	}

	.home-link:hover {
		opacity: 0.7;
	}

	.brand-name {
		font-weight: 600;
		font-size: 1.125rem;
	}

	:global(.text-sky-blue) {
		color: var(--sky-blue);
	}
</style>
