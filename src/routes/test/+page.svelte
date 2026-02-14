<script lang="ts">
	import { goto } from '$app/navigation';
	import { t } from '$lib/i18n';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	let { data } = $props();

	let currentStep = $state(0);
	let answers = $state<Record<string, number>>({});
	let direction = $state<1 | -1>(1);

	const step = $derived(data.steps[currentStep]);
	const progress = $derived(((currentStep + 1) / data.steps.length) * 100);
	const isLastStep = $derived(currentStep === data.steps.length - 1);
	const hasAnswer = $derived(step !== undefined && answers[step.question.id] !== undefined);

	function handleAnswer(optionIndex: number) {
		if (!step) return;
		answers = { ...answers, [step.question.id]: optionIndex };
	}

	function handleNext() {
		if (!step || !hasAnswer) return;
		if (isLastStep) {
			const answersParam = encodeURIComponent(JSON.stringify(answers));
			goto(`/result?answers=${answersParam}`);
		} else {
			direction = 1;
			currentStep += 1;
		}
	}

	function handleBack() {
		if (currentStep > 0) {
			direction = -1;
			currentStep -= 1;
		}
	}
</script>

<svelte:head>
	<title>{t('test.pageTitle')}</title>
</svelte:head>

<div class="test-page">
	<!-- Progress Bar -->
	<div class="progress-track">
		<div class="progress-fill" style="width: {progress}%"></div>
	</div>

	<!-- Content -->
	<div class="test-content">
		<div class="test-inner">
			<!-- Step Counter -->
			<div class="step-counter">
				{currentStep + 1} / {data.steps.length}
			</div>

			{#if step}
				{#key currentStep}
					<div
						class="step-block"
						class:slide-in-right={direction === 1}
						class:slide-in-left={direction === -1}
					>
						<!-- Step Header -->
						<div class="step-header">
							<span class="step-emoji">{step.emoji}</span>
							<h2 class="step-title">{step.title}</h2>
						</div>

						<!-- Question Text -->
						<p class="question-text">
							{step.question.text}
						</p>

						<!-- Options -->
						<div class="options-list">
							{#each step.question.options as option, index}
								<button
									type="button"
									onclick={() => handleAnswer(index)}
									class="option-btn"
									class:selected={answers[step.question.id] === index}
								>
									{option.text}
								</button>
							{/each}
						</div>
					</div>
				{/key}
			{/if}

			<!-- Navigation -->
			<div class="nav-row">
				<button
					type="button"
					onclick={handleBack}
					disabled={currentStep === 0}
					class="nav-btn nav-back"
				>
					<ChevronLeft size={20} />
					{t('test.back')}
				</button>

				<button
					type="button"
					onclick={handleNext}
					disabled={!hasAnswer}
					class="nav-btn nav-next"
					class:disabled={!hasAnswer}
				>
					{isLastStep ? t('test.seeResult') : t('test.next')}
					<ChevronRight size={20} />
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	.test-page {
		display: flex;
		min-height: 100vh;
		flex-direction: column;
		background-color: var(--off-white);
	}

	.progress-track {
		height: 6px;
		width: 100%;
		background-color: var(--border-light);
		position: sticky;
		top: 0;
		z-index: 10;
	}

	.progress-fill {
		height: 100%;
		background: linear-gradient(to right, var(--sky-blue), var(--warm-peach));
		transition: width var(--transition-smooth);
	}

	.test-content {
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem 1rem;
	}

	.test-inner {
		width: 100%;
		max-width: 560px;
	}

	.step-counter {
		text-align: center;
		font-size: 0.8rem;
		color: var(--text-gray);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		margin-bottom: 2rem;
	}

	.step-block {
		animation-duration: 0.4s;
		animation-timing-function: ease-out;
		animation-fill-mode: both;
	}

	.slide-in-right {
		animation-name: slideInRight;
	}

	.slide-in-left {
		animation-name: slideInLeft;
	}

	@keyframes slideInRight {
		from {
			opacity: 0;
			transform: translateX(40px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes slideInLeft {
		from {
			opacity: 0;
			transform: translateX(-40px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.step-header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.step-emoji {
		font-size: 2.5rem;
		display: block;
		margin-bottom: 0.5rem;
	}

	.step-title {
		font-size: 1rem;
		font-weight: 500;
		color: var(--text-gray);
		letter-spacing: 0.04em;
	}

	.question-text {
		text-align: center;
		font-size: 1.375rem;
		font-weight: 500;
		color: var(--text-dark);
		line-height: 1.6;
		margin-bottom: 2rem;
	}

	@media (min-width: 768px) {
		.question-text {
			font-size: 1.625rem;
		}
	}

	.options-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.option-btn {
		width: 100%;
		padding: 1rem 1.25rem;
		text-align: left;
		border-radius: var(--radius-sm);
		border: 2px solid var(--border-light);
		background: white;
		color: var(--text-gray);
		font-size: 1rem;
		line-height: 1.4;
		cursor: pointer;
		transition: all var(--transition-smooth);
	}

	.option-btn:hover {
		border-color: var(--sky-blue);
		transform: translateY(-1px);
		box-shadow: var(--shadow-soft);
	}

	.option-btn.selected {
		background: var(--sky-blue);
		border-color: var(--sky-blue);
		color: var(--text-dark);
		font-weight: 500;
	}

	.nav-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 2.5rem;
	}

	.nav-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		border-radius: 9999px;
		cursor: pointer;
		transition: all var(--transition-smooth);
	}

	.nav-back {
		padding: 0.5rem 1rem;
		color: var(--text-gray);
		background: none;
		border: none;
	}

	.nav-back:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}

	.nav-next {
		padding: 0.75rem 1.5rem;
		background: var(--sky-blue);
		color: var(--text-dark);
		font-weight: 500;
		border: none;
	}

	.nav-next:hover:not(:disabled) {
		transform: scale(1.05);
		box-shadow: var(--shadow-soft);
	}

	.nav-next.disabled,
	.nav-next:disabled {
		opacity: 0.4;
		background: var(--border-light);
		cursor: not-allowed;
	}
</style>
