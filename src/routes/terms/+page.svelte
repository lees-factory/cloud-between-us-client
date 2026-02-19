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
	<p class="last-updated">Last updated: February 16, 2026</p>
	<div class="content">
		{#if locale.current === 'ko'}
			<p>
				본 약관은 Cloud Between Us(이하 "서비스")의 이용 조건 및 절차, 이용자와 서비스 제공자의 권리,
				의무 및 책임사항을 규정합니다. 서비스를 이용함으로써 본 약관에 동의하는 것으로 간주됩니다.
			</p>

			<h2>제1조 (목적 및 서비스 성격)</h2>
			<p>
				본 서비스는 개인 판매자가 운영하는 엔터테인먼트 목적의 구름 성향 테스트 서비스입니다.
				제공되는 결과는 전문적인 심리 진단, 상담, 의학적 조언이 아니며, 재미와 참고용으로만
				활용되어야 합니다. 서비스의 결과를 근거로 한 어떠한 의사결정에 대해서도 서비스 제공자는
				책임을 지지 않습니다.
			</p>

			<h2>제2조 (서비스의 제공)</h2>
			<p>
				1. 서비스는 연중무휴 1일 24시간 제공함을 원칙으로 합니다.<br />
				2. 시스템 점검 등 불가피한 사유가 발생할 경우 일시적으로 중단될 수 있습니다.<br />
				3. 구름 성향 테스트 및 결과(상세 리포트 포함)는 무료로 제공됩니다.
			</p>

			<h2>제3조 (분쟁 해결 및 문의)</h2>
			<p>
				서비스 이용과 관련하여 문의나 불편 사항이 있을 경우, monkeysforge@gmail.com으로
				연락해 주세요. 대부분의 문제는 직접 소통으로 해결할 수 있습니다.
			</p>

			<h2>제4조 (엔터테인먼트 면책)</h2>
			<p>
				본 서비스는 오직 엔터테인먼트 목적으로만 제공됩니다. 제공되는 결과, 해석,
				궁합 평가 등은 심리학적, 의학적, 법적, 재정적 전문 조언이 아닙니다.
				결과의 정확성, 완전성, 신뢰성에 대해 어떠한 보증도 하지 않으며, 서비스
				이용은 전적으로 이용자 본인의 판단과 책임 하에 이루어집니다.
			</p>

			<h2>제5조 (개인정보 및 데이터)</h2>

			<h3>1) 테스트 응답 데이터</h3>
			<p>
				이용자의 테스트 선택 데이터(응답 내역)는 결과 생성 및 서비스 품질 개선을
				위해 서버에 저장될 수 있습니다. 저장되는 데이터에는 개별 질문에 대한
				선택값이 포함되며, 이는 통계적 분석 및 서비스 개선 목적으로만 사용됩니다.
			</p>

			<h3>2) 데이터 삭제 요청</h3>
			<p>
				이용자는 언제든지 monkeysforge@gmail.com으로 본인의 저장된 데이터 삭제를
				요청할 수 있습니다. 삭제 요청 시 영업일 기준 7일 이내에 처리됩니다.
			</p>

			<h2>제6조 (약관의 변경)</h2>
			<p>
				본 약관은 서비스 개선 및 법률 변경에 따라 수정될 수 있으며, 변경 시
				서비스 내 공지를 통해 안내합니다. 변경된 약관은 공지일로부터 효력이
				발생합니다.
			</p>

			<h2>제7조 (연락처)</h2>
			<p>
				서비스 관련 문의 및 기술 지원은 아래 이메일로 연락해 주세요.<br />
				이메일: monkeysforge@gmail.com
			</p>

		{:else}
			<p>
				These Terms and Conditions govern the conditions and procedures for using Cloud Between Us
				(hereinafter referred to as the "Service"), as well as the rights, obligations, and
				responsibilities of the users and the service provider. By using the Service, you agree
				to be bound by these Terms.
			</p>

			<h2>Article 1 (Purpose & Nature of Service)</h2>
			<p>
				This Service is an entertainment-focused cloud personality test operated by an individual
				seller. The results provided are not professional psychological diagnoses, counseling, or
				medical advice and should be used for entertainment and reference purposes only. The service
				provider accepts no responsibility for any decisions made based on the results of this Service.
			</p>

			<h2>Article 2 (Service Provision)</h2>
			<p>
				1. The Service is provided 24 hours a day, 365 days a year in principle.<br />
				2. It may be temporarily suspended due to unavoidable reasons such as system maintenance.<br />
				3. The cloud personality test and all results (including the full report) are provided free of charge.
			</p>

			<h2>Article 3 (Dispute Resolution & Inquiries)</h2>
			<p>
				If you have any questions or concerns regarding the Service, please contact
				monkeysforge@gmail.com. Most issues can be resolved through direct communication.
			</p>

			<h2>Article 4 (Entertainment Disclaimer)</h2>
			<p>
				This Service is provided for entertainment purposes only. The results, interpretations,
				and compatibility assessments provided are not professional psychological, medical, legal,
				or financial advice. We make no guarantees regarding the accuracy, completeness, or
				reliability of any results. Your use of this Service is at your own discretion and risk.
			</p>

			<h2>Article 5 (Privacy & Data)</h2>

			<h3>1) Test Response Data</h3>
			<p>
				Your test selection data (response history) may be stored on our servers for the purpose
				of generating results and improving service quality. The stored data includes your
				selected answers to individual questions and is used only for statistical analysis and
				service improvement purposes.
			</p>

			<h3>2) Data Deletion Requests</h3>
			<p>
				You may request the deletion of your stored data at any time by contacting
				monkeysforge@gmail.com. Deletion requests will be processed within 7 business days.
			</p>

			<h2>Article 6 (Changes to Terms)</h2>
			<p>
				These Terms may be updated to reflect service improvements or legal changes. Any
				modifications will be announced through the Service. Updated Terms take effect from
				the date of announcement.
			</p>

			<h2>Article 7 (Contact)</h2>
			<p>
				For inquiries or technical support, please contact us at:<br />
				Email: monkeysforge@gmail.com
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

	.last-updated {
		font-size: 0.8125rem;
		color: var(--text-gray);
		margin-bottom: 2rem;
		opacity: 0.7;
	}

	h2 {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 2.5rem 0 1rem;
		color: var(--text-dark);
	}

	h3 {
		font-size: 1.0625rem;
		font-weight: 600;
		margin: 1.5rem 0 0.75rem;
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
