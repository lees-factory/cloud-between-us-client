<script lang="ts">
	import { t, locale } from '$lib/i18n';
	import { Cloud } from 'lucide-svelte';
</script>

<main class="page-container">
	<a href="/" class="home-link" aria-label="Go to Home">
		<Cloud size={24} class="text-sky-blue" />
		<span class="brand-name">Cloud Between Us</span>
	</a>

	<h1 class="page-title">{t('footer.privacy')}</h1>
	<div class="content">
		{#if locale.current === 'ko'}
			<p>
				Cloud Between Us(이하 "서비스")는 이용자의 개인정보를 소중히 다루며, 개인정보보호법을
				준수합니다. 본 서비스는 회원가입 없이 이용할 수 있으며, 수집하는 정보는 서비스 제공 및
				품질 개선에 필요한 범위로 최소화됩니다.
			</p>

			<h2>1. 수집하는 정보</h2>
			<p>서비스는 아래와 같은 정보를 수집할 수 있습니다.</p>
			<ul>
				<li><strong>테스트 응답 데이터</strong>: 이용자가 구름 성향 테스트에서 선택한 응답(질문별 선택값). 결과 생성 및 서비스·통계 분석 목적으로만 사용됩니다.</li>
				<li><strong>자동 수집 정보</strong>: 서비스 운영을 위한 접속 로그, 쿠키 등. 기술적 안정성 및 이용 통계 목적으로 사용됩니다.</li>
			</ul>

			<h2>2. 수집 및 이용 목적</h2>
			<p>수집한 정보는 다음 목적으로만 활용됩니다.</p>
			<ul>
				<li>테스트 결과 생성 및 제공</li>
				<li>서비스 품질·안정성 개선 및 통계적 분석</li>
			</ul>

			<h2>3. 보유 및 이용 기간</h2>
			<p>
				수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 관계 법령에서
				보존 기간을 정한 경우에는 해당 기간 동안 보관합니다.
			</p>

			<h2>4. 이용자의 권리</h2>
			<p>
				이용자는 언제든지 저장된 데이터의 삭제를 요청할 수 있습니다. 삭제 요청은
				monkeysforge@gmail.com으로 보내 주시면 되며, 영업일 기준 7일 이내에 처리합니다.
			</p>

			<h2>5. 개인정보 보호책임자</h2>
			<p>이메일: monkeysforge@gmail.com</p>
		{:else}
			<p>
				Cloud Between Us (hereinafter referred to as the "Service") values your privacy and complies
				with applicable privacy laws. The Service can be used without creating an account, and we
				minimize the information we collect to what is necessary for providing and improving the service.
			</p>

			<h2>1. Information Collected</h2>
			<p>The Service may collect the following information:</p>
			<ul>
				<li><strong>Test response data</strong>: The answers you select in the cloud personality test (your choices per question). Used only to generate your results and for service and statistical analysis.</li>
				<li><strong>Automatically collected information</strong>: Access logs, cookies, and similar data for service operation. Used for technical stability and usage statistics.</li>
			</ul>

			<h2>2. Purpose of Collection and Use</h2>
			<p>Collected information is used only for the following purposes:</p>
			<ul>
				<li>Generating and providing test results</li>
				<li>Improving service quality and stability, and for statistical analysis</li>
			</ul>

			<h2>3. Retention and Use Period</h2>
			<p>
				Information is destroyed without delay once the purpose of collection and use has been
				fulfilled. Where laws require a retention period, information is kept for that period.
			</p>

			<h2>4. User Rights</h2>
			<p>
				You may request deletion of your stored data at any time. Send your request to
				monkeysforge@gmail.com; we will process it within 7 business days.
			</p>

			<h2>5. Privacy Officer</h2>
			<p>Email: monkeysforge@gmail.com</p>
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

	ul {
		margin-bottom: 1rem;
		padding-left: 1.5rem;
		color: var(--text-gray);
	}

	li {
		margin-bottom: 0.5rem;
	}
</style>
