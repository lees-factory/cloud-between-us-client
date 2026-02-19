<script lang="ts">
	import { goto } from '$app/navigation';
	import { fly, fade } from 'svelte/transition';
	import { t } from '$lib/i18n';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { analyzeDiagnosis } from '$lib/api/diagnosis/analyze';
	import { trackEvent } from '$lib/utils/analytics';

	type StepTheme = { bg: string; accent: string; sky: string; cloudOpacity: number };
	const STEP_THEMES: Record<number, StepTheme> = {
		1: {
			bg: '#FFF9ED',
			accent: '#FFD700',
			sky: 'linear-gradient(180deg, #FFEFBA 0%, #FFFFFF 100%)',
			cloudOpacity: 0.3
		},
		2: {
			bg: '#F0F7FF',
			accent: '#70A1FF',
			sky: 'linear-gradient(180deg, #D6EFFF 0%, #FFFFFF 100%)',
			cloudOpacity: 0.4
		},
		3: {
			bg: '#F2F2F7',
			accent: '#57606f',
			sky: 'linear-gradient(180deg, #CED6E0 0%, #F1F2F6 100%)',
			cloudOpacity: 0.8
		},
		4: {
			bg: '#FAF9F6',
			accent: '#A4B0BE',
			sky: 'linear-gradient(180deg, #E7E9ED 0%, #FFFFFF 100%)',
			cloudOpacity: 0.2
		},
		5: {
			bg: '#F8F9FA',
			accent: '#747D8C',
			sky: 'linear-gradient(180deg, #DFE4EA 0%, #FFFFFF 100%)',
			cloudOpacity: 0.1
		},
		6: {
			bg: '#F5F3FF',
			accent: '#A29BFE',
			sky: 'linear-gradient(180deg, #E0D7FF 0%, #FFFFFF 100%)',
			cloudOpacity: 0.5
		},
		7: {
			bg: '#FFF0F0',
			accent: '#FF6B6B',
			sky: 'linear-gradient(180deg, #FFDADA 0%, #FFFFFF 100%)',
			cloudOpacity: 0.6
		},
		8: {
			bg: '#FFF5F8',
			accent: '#FF8AFA',
			sky: 'linear-gradient(180deg, #FFDEF3 0%, #FFFFFF 100%)',
			cloudOpacity: 0.4
		},
		9: {
			bg: '#F1F2F6',
			accent: '#2F3542',
			sky: 'linear-gradient(180deg, #A8B2C1 0%, #F1F2F6 100%)',
			cloudOpacity: 0.9
		},
		10: {
			bg: '#FFF9F0',
			accent: '#FFA502',
			sky: 'linear-gradient(180deg, #FFE0B2 0%, #FFFFFF 100%)',
			cloudOpacity: 0.5
		},
		11: {
			bg: '#F4F7F6',
			accent: '#7BED9F',
			sky: 'linear-gradient(180deg, #D1F2EB 0%, #FFFFFF 100%)',
			cloudOpacity: 0.3
		},
		12: {
			bg: '#EDF2FF',
			accent: '#3742FA',
			sky: 'linear-gradient(180deg, #C7D2FE 0%, #FFFFFF 100%)',
			cloudOpacity: 0.2
		}
	};
	const defaultTheme = STEP_THEMES[1];

	let { data } = $props();

	let currentStep = $state(0);
	let answers = $state<Record<string, string>>({});
	/** 현재 스텝에서 선택한 값 (선택 표시·다음 버튼용, 반응성 확실히) */
	let selectedCloudType = $state<string | null>(null);
	let direction = $state<1 | -1>(1);
	let isAnalyzing = $state(false);
	let stepStartTime = $state(Date.now());

	$effect(() => {
		if (currentStep === 0) {
			trackEvent('test_start');
			stepStartTime = Date.now();
		}
	});

	// 스텝이 바뀌면 해당 스텝에 저장된 선택값으로 동기화
	$effect(() => {
		const key = String(currentStep);
		selectedCloudType = answers[key] ?? null;
	});

	const step = $derived(data?.steps?.[currentStep]);
	const theme = $derived(step ? (STEP_THEMES[step.id] ?? defaultTheme) : defaultTheme);
	const progress = $derived(
		data?.steps?.length ? ((currentStep + 1) / data.steps.length) * 100 : 0
	);
	const isLastStep = $derived(data?.steps?.length ? currentStep === data.steps.length - 1 : false);
	const hasAnswer = $derived(selectedCloudType != null && selectedCloudType !== '');

	function handleAnswer(option: { text: string; cloudType: string }) {
		if (!step) return;
		const key = String(currentStep);
		selectedCloudType = option.cloudType;
		answers = { ...answers, [key]: option.cloudType };
	}

	function trackStepCompletion() {
		if (!step) return;
		const answer = answers[String(currentStep)];
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
				// Convert answers map to array for API (key = step index "0","1",...)
				const payload = Object.entries(answers).map(([key, value]) => ({
					questionId: parseInt(key, 10) || 0,
					cloudType: value
				}));

				const result = await analyzeDiagnosis(payload);
				const personaType = result?.personaType?.trim?.();
				if (personaType) {
					trackEvent('test_complete', { result_type: personaType, method: 'api' });
					goto(`/result?type=${encodeURIComponent(personaType)}`);
					return;
				}
			} catch (e) {
				console.error('Analysis API failed, falling back to local calculation:', e);
			}
			// API 미호출/실패/빈 결과 → answers로 결과 페이지에서 서버가 집계
			const answersParam = encodeURIComponent(JSON.stringify(answers));
			trackEvent('test_complete', { method: 'fallback' });
			goto(`/result?answers=${answersParam}`);
			isAnalyzing = false;
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
			<p class="step-counter">STEP {currentStep + 1} / {data?.steps?.length ?? 0}</p>
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
								class:selected={selectedCloudType === option.cloudType}
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
		padding: 6rem 1rem 2rem;
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
