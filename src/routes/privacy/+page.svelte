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
				준수합니다.
			</p>

			<h2>1. 수집하는 개인정보 항목</h2>
			<p>서비스는 회원가입, 상담, 서비스 신청 등을 위해 아래와 같은 개인정보를 수집할 수 있습니다.</p>
			<ul>
				<li>필수항목: 이메일 주소 (로그인 식별용)</li>
				<li>선택항목: 닉네임 (결과 페이지 표시용)</li>
				<li>자동수집: 접속 로그, 쿠키, 결제 기록</li>
			</ul>

			<h2>2. 개인정보의 수집 및 이용목적</h2>
			<p>수집한 개인정보는 다음의 목적을 위해 활용합니다.</p>
			<ul>
				<li>서비스 제공: 심리 테스트 결과 저장 및 조회</li>
				<li>회원 관리: 본인 확인, 부정 이용 방지</li>
			</ul>

			<h2>3. 개인정보의 보유 및 이용기간</h2>
			<p>
				원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단,
				관계 법령에 의하여 보존할 필요가 있는 경우 법령에서 정한 기간 동안 보관합니다.
			</p>

			<h2>4. 이용자의 권리</h2>
			<p>
				이용자는 언제든지 자신의 개인정보를 조회하거나 수정할 수 있으며, 회원 탈퇴를 통해 개인정보
				이용 동의를 철회할 수 있습니다.
			</p>

			<h2>5. 개인정보 보호책임자</h2>
			<p>이메일: monkeysfor@gmail.com</p>
		{:else}
			<p>
				Cloud Between Us (hereinafter referred to as the "Service") values your privacy and complies
				with applicable privacy laws.
			</p>

			<h2>1. Information Collected</h2>
			<p>
				The Service may collect the following personal information for registration, consultation, and
				service application purposes:
			</p>
			<ul>
				<li>Required: Email address (for login identification)</li>
				<li>Optional: Nickname (for result page display)</li>
				<li>Automatically collected: Access logs, cookies, payment records</li>
			</ul>

			<h2>2. Purpose of Collection and Use</h2>
			<p>The collected personal information is used for the following purposes:</p>
			<ul>
				<li>
					Service Provision: Storage and retrieval of psychological test results
				</li>
				<li>Member Management: Identity verification, prevention of fraudulent use</li>
			</ul>

			<h2>3. Retention and Use Period</h2>
			<p>
				In principle, personal information is destroyed without delay after the purpose of collection
				and use is achieved. However, if preservation is required by relevant laws, it will be kept
				for the period specified by law.
			</p>

			<h2>4. User Rights</h2>
			<p>
				Users may view or modify their personal information at any time and may withdraw their consent
				to use personal information by deleting their account.
			</p>

			<h2>5. Privacy Officer</h2>
			<p>Email: monkeysfor@gmail.com</p>
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
