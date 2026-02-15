<script lang="ts">
	import { goto } from '$app/navigation';
	import { fly, fade } from 'svelte/transition';
	import { t } from '$lib/i18n';
	import { stepThemes } from '$lib/data/themes';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { analyzeDiagnosis } from '$lib/api/diagnosis/analyze';
	import { trackEvent } from '$lib/utils/analytics';

	let { data } = $props();

	let currentStep = $state(0);
	let answers = $state<Record<string, string>>({});
	let direction = $state<1 | -1>(1);
	let isAnalyzing = $state(false);
	let stepStartTime = $state(Date.now());

	$effect(() => {
		if (currentStep === 0) {
			trackEvent('test_start');
			stepStartTime = Date.now();
		}
	});

	const step = $derived(data.steps[currentStep]);
	const theme = $derived(step ? (stepThemes[step.id] ?? stepThemes[1]) : stepThemes[1]);
	const progress = $derived(((currentStep + 1) / data.steps.length) * 100);
	const isLastStep = $derived(currentStep === data.steps.length - 1);
	const hasAnswer = $derived(step !== undefined && answers[step.question.id] !== undefined);

	function handleAnswer(option: { text: string; cloudType: string }) {
		if (!step) return;
		answers = { ...answers, [step.question.id]: option.cloudType };
	}

	function trackStepCompletion() {
		if (!step) return;
		const answer = answers[step.question.id];
		const option = step.question.options.find((o) => o.cloudType === answer);

		trackEvent('question_answered', {
			step: currentStep + 1,
			question_id: step.question.id,
			answer_cloud: answer,
			answer_text: option?.text,
			duration_ms: Date.now() - stepStartTime
		});
	}

	async function handleNext() {
		if (!step || !hasAnswer || isAnalyzing) return;

		trackStepCompletion();

		if (isLastStep) {
			isAnalyzing = true;
			try {
				// Convert answers map to array for API
				const payload = Object.entries(answers).map(([key, value]) => ({
					questionId: parseInt(key) || 0,
					cloudType: value
				}));

				const result = await analyzeDiagnosis(payload);
				trackEvent('test_complete', {
					result_type: result.personaType,
					method: 'api'
				});
				goto(`/result?type=${result.personaType}`);
			} catch (error) {
				console.error('Analysis API failed, falling back to local calculation:', error);
				// Fallback to client-side calc using answers param
				const answersParam = encodeURIComponent(JSON.stringify(answers));
				trackEvent('test_complete', {
					method: 'fallback'
				});
				goto(`/result?answers=${answersParam}`);
			} finally {
				isAnalyzing = false;
			}
		} else {
			direction = 1;
			currentStep += 1;
			stepStartTime = Date.now();
		}
	}

	function handleBack() {
		if (currentStep > 0) {
			direction = -1;
			currentStep -= 1;
			stepStartTime = Date.now();
		}
	}
</script>

<svelte:head>
	<title>{t('test.pageTitle')}</title>
</svelte:head>

<main
	class="sky-wrapper"
	style:--sky-bg={theme.bg}
	style:--sky-gradient={theme.sky}
	style:--accent={theme.accent}
>
	<div class="atmosphere" style:opacity={theme.cloudOpacity} aria-hidden="true"></div>

	<div class="content-container">
		<div class="progress-section">
			<div class="bar-container">
				<div class="bar-fill" style="width: {progress}%"></div>
			</div>
			<p class="step-counter">STEP {currentStep + 1} / {data.steps.length}</p>
		</div>

		{#if step}
			{#key step.question.id}
				<section
					class="question-box"
					in:fly={{ y: 20, duration: 600, delay: 200 }}
					out:fade={{ duration: 200 }}
				>
					<span class="emoji-indicator">{step.emoji}</span>
					<h2 class="step-title">{step.title}</h2>
					<h1 class="question-text">{step.question.text}</h1>

					<div class="options-grid">
						{#each step.question.options as option, index}
							<button
								type="button"
								class="option-btn"
								class:selected={answers[step.question.id] === option.cloudType}
								onclick={() => handleAnswer(option)}
							>
								{option.text}
							</button>
						{/each}
					</div>
				</section>
			{/key}
		{/if}

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
				disabled={!hasAnswer || isAnalyzing}
				class="nav-btn nav-next"
				class:disabled={!hasAnswer || isAnalyzing}
			>
				{#if isAnalyzing}
					Running...
				{:else}
					{isLastStep ? t('test.seeResult') : t('test.next')}
				{/if}
				{#if !isAnalyzing}
					<ChevronRight size={20} />
				{/if}
			</button>
		</div>
	</div>
</main>

<style>
	:global(html),
	:global(body) {
		scrollbar-width: none; /* Firefox */
		-ms-overflow-style: none; /* IE/Edge */
	}

	:global(html::-webkit-scrollbar),
	:global(body::-webkit-scrollbar) {
		display: none; /* Chrome, Safari, Opera */
	}

	.sky-wrapper {
		position: relative;
		min-height: 100vh;
		width: 100%;
		background-color: var(--sky-bg);
		background: var(--sky-gradient);
		transition: background 1.5s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.atmosphere {
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8) 0%, transparent 70%);
		pointer-events: none;
		transition: opacity 2s ease;
	}

	.content-container {
		position: relative;
		z-index: 10;
		width: 100%;
		max-width: 500px;
		padding: 2rem 1rem;
	}

	.progress-section {
		margin-bottom: 3rem;
		text-align: center;
	}

	.bar-container {
		height: 6px;
		background: rgba(0, 0, 0, 0.05);
		border-radius: 10px;
		overflow: hidden;
	}

	.bar-fill {
		height: 100%;
		background: var(--accent);
		transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.step-counter {
		font-size: 0.75rem;
		margin-top: 0.75rem;
		letter-spacing: 0.1em;
		color: var(--accent);
		font-weight: 600;
		opacity: 0.7;
	}

	.question-box {
		margin-bottom: 2rem;
	}

	.emoji-indicator {
		font-size: 2.5rem;
		display: block;
		margin-bottom: 0.5rem;
	}

	.step-title {
		font-size: 1rem;
		font-weight: 500;
		color: var(--text-gray);
		letter-spacing: 0.04em;
		margin-bottom: 1rem;
	}

	.question-text {
		font-size: 1.5rem;
		font-weight: 700;
		line-height: 1.4;
		color: var(--text-dark);
		margin-bottom: 2.5rem;
		word-break: keep-all;
	}

	@media (min-width: 768px) {
		.question-text {
			font-size: 1.625rem;
		}
	}

	.options-grid {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.option-btn {
		background: rgba(255, 255, 255, 0.7);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.3);
		padding: 1.2rem 1.5rem;
		border-radius: 1.25rem;
		text-align: left;
		font-size: 1rem;
		line-height: 1.4;
		color: var(--text-gray);
		transition: all 0.2s ease;
		cursor: pointer;
	}

	.option-btn:hover {
		background: rgba(255, 255, 255, 0.95);
		transform: translateY(-3px);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
		border-color: var(--accent);
		color: var(--text-dark);
	}

	.option-btn:active {
		transform: scale(0.98);
	}

	.option-btn.selected {
		background: color-mix(in srgb, var(--accent) 18%, white);
		border-color: var(--accent);
		color: var(--text-dark);
		font-weight: 500;
	}

	.nav-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 2rem;
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
		background: var(--accent);
		color: var(--text-dark);
		font-weight: 500;
		border: none;
	}

	.nav-next:hover:not(:disabled):not(.disabled) {
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
