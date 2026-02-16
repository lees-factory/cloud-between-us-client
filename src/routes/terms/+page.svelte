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
				의무 및 책임사항을 규정합니다. 서비스를 이용하거나 유료 콘텐츠를 구매함으로써 본 약관에
				동의하는 것으로 간주됩니다.
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
				3. 무료 서비스: 구름 성향 테스트 및 기본 결과 확인은 무료로 제공됩니다.<br />
				4. 유료 서비스: 상세 리포트(Premium Sky Report)는 1회 $2.99(USD)에 제공되는 디지털 콘텐츠입니다.
			</p>

			<h2>제3조 (결제)</h2>
			<p>
				1. 유료 콘텐츠의 결제는 PayPal을 통해 처리됩니다.<br />
				2. 결제 금액은 $2.99(USD)이며, 일회성 결제입니다. 자동 갱신, 구독, 추가 과금은 일절 없습니다.<br />
				3. 결제가 완료되면 상세 리포트가 즉시 화면에 표시됩니다.<br />
				4. 결제 시 이용자는 본 약관의 환불 정책에 동의한 것으로 간주됩니다.
			</p>

			<h2>제4조 (취소 및 환불 정책)</h2>
			<p>
				본 서비스는 결제 즉시 디지털 콘텐츠가 제공되는 특성상, 서비스 진행 단계에 따라 환불
				기준을 적용합니다.
			</p>

			<h3>1) 결과 열람 전 (콘텐츠 미확인)</h3>
			<p>
				결제 후 기술적 오류 등으로 콘텐츠를 확인하지 못한 경우, 결제일로부터 7일 이내에
				monkeysforge@gmail.com으로 연락 시 전액 환불이 가능합니다.
			</p>

			<h3>2) 결과 열람 후 (콘텐츠 확인 완료)</h3>
			<p>
				디지털 콘텐츠의 특성상, 상세 리포트를 열람(확인)한 이후에는 환불이 불가합니다.
				이는 전자상거래 등에서의 소비자보호에 관한 법률 제17조 제2항 제5호에 근거하며,
				콘텐츠가 제공된 시점에서 서비스 제공이 완료된 것으로 간주합니다.
			</p>

			<h3>3) 기술적 문제로 인한 환불</h3>
			<p>다음의 경우 전액 환불을 보장합니다:</p>
			<ul>
				<li>결제가 완료되었으나 리포트가 정상적으로 표시되지 않은 경우</li>
				<li>기술적 오류로 콘텐츠에 접근할 수 없었던 경우</li>
				<li>중복 결제가 발생한 경우</li>
			</ul>

			<h3>4) 환불 절차</h3>
			<p>
				환불을 요청하시려면 결제일로부터 7일 이내에 아래 정보를 포함하여
				monkeysforge@gmail.com으로 이메일을 보내주세요:
			</p>
			<ul>
				<li>결제 시 사용한 PayPal 이메일 주소</li>
				<li>결제 일시</li>
				<li>문제에 대한 간단한 설명</li>
			</ul>
			<p>
				환불은 결제 시 사용한 동일한 수단(PayPal)으로 진행되며, 처리에 영업일 기준
				3~7일이 소요될 수 있습니다.
			</p>

			<h3>5) 결제 수수료 안내</h3>
			<p>
				단순 변심에 의한 환불(콘텐츠 미열람 시)의 경우, PayPal 결제 수수료(약 4% 내외)를
				제외한 금액이 환불될 수 있습니다. 이는 PayPal의 정책에 따른 것으로, 서비스
				제공자가 수수료를 환수받지 못하기 때문입니다.
			</p>

			<h2>제5조 (분쟁 해결)</h2>
			<p>
				1. 환불 또는 서비스 관련 문제가 있을 경우, 먼저 monkeysforge@gmail.com으로
				연락해 주세요. 대부분의 문제는 직접 소통으로 해결 가능합니다.<br />
				2. PayPal을 통한 분쟁(Dispute) 제기 전 서비스 제공자에게 먼저 문의해 주시기
				바랍니다.<br />
				3. 본 서비스는 구매 시점의 콘텐츠 제공 기록(접속 로그, 시간 등)을
				보관하며, 분쟁 발생 시 서비스 이행 증빙자료로 활용할 수 있습니다.
			</p>

			<h2>제6조 (엔터테인먼트 면책)</h2>
			<p>
				본 서비스는 오직 엔터테인먼트 목적으로만 제공됩니다. 제공되는 결과, 해석,
				궁합 평가 등은 심리학적, 의학적, 법적, 재정적 전문 조언이 아닙니다.
				결과의 정확성, 완전성, 신뢰성에 대해 어떠한 보증도 하지 않으며, 서비스
				이용은 전적으로 이용자 본인의 판단과 책임 하에 이루어집니다.
			</p>

			<h2>제7조 (개인정보 및 데이터)</h2>

			<h3>1) 회원가입</h3>
			<p>
				본 서비스는 회원가입 없이도 이용할 수 있습니다. 회원가입은 선택 사항이며,
				가입 시 제공하는 정보(이메일 등)는 결과 저장 및 서비스 개선 목적으로만
				활용됩니다.
			</p>

			<h3>2) 테스트 응답 데이터</h3>
			<p>
				이용자의 테스트 선택 데이터(응답 내역)는 결과 생성 및 서비스 품질 개선을
				위해 서버에 저장될 수 있습니다. 저장되는 데이터에는 개별 질문에 대한
				선택값이 포함되며, 이는 통계적 분석 및 서비스 개선 목적으로만 사용됩니다.
			</p>

			<h3>3) 결제 정보</h3>
			<p>
				결제 정보는 PayPal에 의해 처리되며, 서비스 제공자는 이용자의 카드 번호,
				계좌 정보 등 결제 상세를 직접 수집하거나 보관하지 않습니다.
			</p>

			<h3>4) 데이터 삭제 요청</h3>
			<p>
				이용자는 언제든지 monkeysforge@gmail.com으로 본인의 저장된 데이터 삭제를
				요청할 수 있습니다. 삭제 요청 시 영업일 기준 7일 이내에 처리됩니다.
			</p>

			<h2>제8조 (약관의 변경)</h2>
			<p>
				본 약관은 서비스 개선 및 법률 변경에 따라 수정될 수 있으며, 변경 시
				서비스 내 공지를 통해 안내합니다. 변경된 약관은 공지일로부터 효력이
				발생합니다.
			</p>

			<h2>제9조 (연락처)</h2>
			<p>
				서비스 관련 문의, 환불 요청, 기술 지원은 아래 이메일로 연락해 주세요.<br />
				이메일: monkeysforge@gmail.com
			</p>

		{:else}
			<p>
				These Terms and Conditions govern the conditions and procedures for using Cloud Between Us
				(hereinafter referred to as the "Service"), as well as the rights, obligations, and
				responsibilities of the users and the service provider. By using the Service or purchasing
				paid content, you agree to be bound by these Terms.
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
				3. Free Service: The cloud personality test and basic results are provided free of charge.<br />
				4. Paid Service: The Premium Sky Report is a digital content product available for a one-time
				payment of $2.99 (USD).
			</p>

			<h2>Article 3 (Payment)</h2>
			<p>
				1. Payments for paid content are processed through PayPal.<br />
				2. The price is $2.99 (USD) as a one-time payment. There are no automatic renewals,
				subscriptions, or additional charges of any kind.<br />
				3. Upon successful payment, the Premium Sky Report is immediately displayed on screen.<br />
				4. By completing your purchase, you acknowledge and agree to the refund policy outlined in
				these Terms.
			</p>

			<h2>Article 4 (Cancellation & Refund Policy)</h2>
			<p>
				As this Service delivers digital content immediately upon payment, the following refund
				criteria apply based on the stage of service delivery:
			</p>

			<h3>1) Before Viewing Results (Content Not Accessed)</h3>
			<p>
				If you were unable to access your content due to technical issues after payment, you may
				request a full refund within 7 days of purchase by contacting monkeysforge@gmail.com.
			</p>

			<h3>2) After Viewing Results (Content Accessed)</h3>
			<p>
				Due to the nature of digital content, refunds are not available once you have viewed
				(accessed) your Premium Sky Report. The service is considered fully delivered at the point
				the content is displayed. By completing your purchase, you acknowledge that this is a
				digital product delivered immediately, and you waive your right to cancellation once the
				content has been accessed.
			</p>

			<h3>3) Refunds for Technical Issues</h3>
			<p>We guarantee a full refund in the following cases:</p>
			<ul>
				<li>Payment was completed but the report failed to display properly</li>
				<li>Technical errors prevented access to the purchased content</li>
				<li>Duplicate charges occurred</li>
			</ul>

			<h3>4) How to Request a Refund</h3>
			<p>
				To request a refund, please email monkeysforge@gmail.com within 7 days of purchase
				with the following information:
			</p>
			<ul>
				<li>PayPal email address used for payment</li>
				<li>Date and time of purchase</li>
				<li>Brief description of the issue</li>
			</ul>
			<p>
				Refunds are processed to the original payment method (PayPal) and may take
				3–7 business days to complete.
			</p>

			<h3>5) Payment Processing Fees</h3>
			<p>
				In the case of a refund for change of mind (where content has not been accessed),
				PayPal's transaction fee (approximately 4%) may be deducted from the refund amount.
				This is due to PayPal's policy of not returning processing fees to the seller.
			</p>

			<h2>Article 5 (Dispute Resolution)</h2>
			<p>
				1. If you have any issues regarding refunds or the Service, please contact
				monkeysforge@gmail.com first. Most issues can be resolved through direct communication.<br />
				2. We kindly ask that you contact us before filing a dispute through PayPal.<br />
				3. We maintain records of content delivery (access logs, timestamps) at the time of
				purchase, which may be used as proof of service fulfillment in the event of a dispute.
			</p>

			<h2>Article 6 (Entertainment Disclaimer)</h2>
			<p>
				This Service is provided for entertainment purposes only. The results, interpretations,
				and compatibility assessments provided are not professional psychological, medical, legal,
				or financial advice. We make no guarantees regarding the accuracy, completeness, or
				reliability of any results. Your use of this Service is at your own discretion and risk.
			</p>

			<h2>Article 7 (Privacy & Data)</h2>

			<h3>1) Account Registration</h3>
			<p>
				This Service can be used without creating an account. Account registration is optional.
				If you choose to register, the information you provide (such as your email address) will
				be used solely for saving your results and improving the Service.
			</p>

			<h3>2) Test Response Data</h3>
			<p>
				Your test selection data (response history) may be stored on our servers for the purpose
				of generating results and improving service quality. The stored data includes your
				selected answers to individual questions and is used only for statistical analysis and
				service improvement purposes.
			</p>

			<h3>3) Payment Information</h3>
			<p>
				Payment information is processed by PayPal. The service provider does not directly
				collect or store your card numbers, account details, or other payment specifics.
			</p>

			<h3>4) Data Deletion Requests</h3>
			<p>
				You may request the deletion of your stored data at any time by contacting
				monkeysforge@gmail.com. Deletion requests will be processed within 7 business days.
			</p>

			<h2>Article 8 (Changes to Terms)</h2>
			<p>
				These Terms may be updated to reflect service improvements or legal changes. Any
				modifications will be announced through the Service. Updated Terms take effect from
				the date of announcement.
			</p>

			<h2>Article 9 (Contact)</h2>
			<p>
				For inquiries, refund requests, or technical support, please contact us at:<br />
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

	ul {
		margin: 0.5rem 0 1rem 1.25rem;
		color: var(--text-gray);
		line-height: 1.8;
	}

	li {
		margin-bottom: 0.25rem;
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
