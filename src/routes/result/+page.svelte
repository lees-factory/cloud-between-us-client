<script lang="ts">
	import { page } from '$app/state';
	import { goto, invalidateAll } from '$app/navigation';
	import { browser, dev } from '$app/environment';
	import type { PageData } from './$types';
	import type { CloudType, CloudProfile } from '$lib/types/cloud';
	import { CLOUD_PROFILES, CLOUD_PROFILES_EN } from '$lib/data/cloudProfiles';
	import { getChemistry } from '$lib/data/chemistryMatrix';
	import { toPng } from 'html-to-image';
	import CloudCard from '$lib/components/result/CloudCard.svelte';
	import CloudIcon from '$lib/components/result/CloudIcon.svelte';
	import {
		Cloud,
		ArrowLeft,
		Share2,
		X,
		Copy,
		Check,
		MessageSquare,
		Zap,
		Sparkles,
		Download,
		Instagram,
		Shield,
		Eye,
		Heart,
		Calendar,
		MessageCircle,
		AlertTriangle,
		Sunrise,
		Sun,
		Moon
	} from 'lucide-svelte';
	import { t, locale } from '$lib/i18n';
	import { auth } from '$lib/firebase';
	import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
	import { trackEvent } from '$lib/utils/analytics';

	const CLOUD_TYPES: CloudType[] = ['sunlit', 'mist', 'storm', 'dawn', 'wild', 'shade'];

	let { data }: { data: PageData } = $props();
	let user = $state<User | null>(null);

	async function handleLogout() {
		await signOut(auth);
	}

	$effect(() => {
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			user = firebaseUser;
		});
		return unsubscribe;
	});

	const myCloud = $derived(data.cloudProfile as CloudProfile);
	const myType = $derived(myCloud.type);
	const profiles = $derived(
		(locale.current === 'ko' ? CLOUD_PROFILES : CLOUD_PROFILES_EN) as Record<CloudType, CloudProfile>
	);
	const initialPartner = $derived(data.initialPartner ?? null);

	$effect(() => {
		trackEvent('view_result', {
			cloud_type: myType,
			locale: locale.current
		});
	});

	let userPartner = $state<CloudType | null>(null);
	const partnerType = $derived(userPartner ?? initialPartner);
	let isCapturing = $state(false);
	let showToast = $state(false);

	let myName = $state('');
	let partnerName = $state('');
	const coupleDisplayName = $derived(
		(myName || (locale.current === 'ko' ? '나' : 'Me')) +
			' & ' +
			(partnerName || (locale.current === 'ko' ? '상대' : 'Partner')) +
			(locale.current === 'ko' ? '의 하늘' : "'s Sky")
	);

	const partnerCloud = $derived(partnerType ? (profiles[partnerType] ?? null) : null);
	const skyStory = $derived(partnerType ? getChemistry(myType, partnerType, locale.current) : null);

	/** 공유 시 OG: 서버 locale 기준으로 번역 (크롤러/미리보기에 맞게) */
	const ogLocale = $derived((data as { locale?: 'ko' | 'en' }).locale ?? locale.current);
	/** 공유 시 OG용: 결과를 살짝 보여주며 관심 유도 */
	const ogTitle = $derived(
		skyStory
			? (ogLocale === 'ko'
					? `우리 하늘은 '${skyStory.skyName}' — Cloud Between Us`
					: `Our sky: "${skyStory.skyName}" — Cloud Between Us`)
			: (ogLocale === 'ko'
					? `${myCloud.name} 결과 — Cloud Between Us`
					: `${myCloud.name} Result — Cloud Between Us`)
	);
	const ogDescription = $derived(
		skyStory?.narrative
			? (() => {
					const plain = skyStory.narrative.trim().replace(/\n+/g, ' ').slice(0, 155);
					return plain.length < skyStory.narrative.trim().length ? plain + '…' : plain;
				})()
			: ogLocale === 'ko'
				? '나와 상대의 구름 궁합을 확인했어요. 우리만의 하늘 이름이 궁금하다면?'
				: 'We checked our cloud chemistry. Curious what sky we share?'
	);
	const baseUrl = $derived((data as { baseUrl?: string }).baseUrl ?? '');
	const ogUrl = $derived(baseUrl + page.url.pathname + page.url.search);
	/** 상대 선택 시: 중앙 구름(chemistry circle) 이미지 API. 미선택 시 기본 이미지 */
	const ogImage = $derived(
		partnerType
			? `${baseUrl}/result/og-image?type=${myType}&partner=${partnerType}&locale=${ogLocale}`
			: baseUrl + '/og-result.png'
	);

	/** 무료 공개용: 서사 처음 3~4줄만 (감정 최고점 후 클리프행거) */
	const freeNarrativeLines = $derived(
		skyStory?.narrative
			? skyStory.narrative
					.trim()
					.split('\n')
					.map((l) => l.trim())
					.filter(Boolean)
					.slice(0, 4)
			: []
	);
	const freeNarrative = $derived(freeNarrativeLines.join('\n'));

	function handlePartnerSelect(type: CloudType) {
		userPartner = type;
		const url = new URL(page.url);
		url.searchParams.set('partner', type);
		goto(url.toString(), { replaceState: true });
	}

	/** 현재 결과 페이지 전체 URL = 내 결과로 바로 열리는 공유 링크 (answers + partner 포함) */
	function getShareUrl(): string {
		if (typeof window === 'undefined') return '';
		return window.location.origin + page.url.pathname + page.url.search;
	}

	let showShareModal = $state(false);
	let shareCopied = $state(false);

	function openShareModal() {
		showShareModal = true;
		shareCopied = false;
	}

	function closeShareModal() {
		showShareModal = false;
	}

	async function handleShare() {
		const url = getShareUrl();
		const title = t('result.shareTitle');
		const text = t('result.shareText').replace('{cloudName}', myCloud.name);

		trackEvent('share', { method: 'navigator_share', cloud_type: myType });

		if (typeof navigator !== 'undefined' && navigator.share) {
			try {
				await navigator.share({ title, text, url });
				return;
			} catch (err) {
				if ((err as Error).name === 'AbortError') return;
			}
		}
		openShareModal();
	}

	async function copyShareLink() {
		const url = getShareUrl();
		trackEvent('share', { method: 'copy_link', cloud_type: myType });
		try {
			await navigator.clipboard.writeText(url);
			shareCopied = true;
			showToast = true;
			setTimeout(() => {
				shareCopied = false;
				showToast = false;
			}, 2500);
		} catch {
			// ignore
		}
	}

	/** 프리미엄 공유 카드 캡처 */
	async function captureCard(): Promise<string | null> {
		if (isCapturing) return null;
		const node = document.querySelector('.share-card-canvas') as HTMLElement;
		if (!node) return null;

		isCapturing = true;
		try {
			// 고해상도를 위해 pixelRatio 상향 및 폰트 렌더링 대기
			const dataUrl = await toPng(node, {
				cacheBust: true,
				pixelRatio: 2,
				backgroundColor: '#fdfcfb'
			});
			isCapturing = false;
			return dataUrl;
		} catch (err) {
			console.error('Image capture failed:', err);
			isCapturing = false;
			return null;
		}
	}

	/** 이미지 다운로드 */
	async function handleDownloadCard() {
		trackEvent('share', { method: 'download_card', cloud_type: myType });
		const dataUrl = await captureCard();
		if (!dataUrl) return;

		const link = document.createElement('a');
		link.download = `cloud-between-us-sky.png`;
		link.href = dataUrl;
		link.click();
	}

	/** 인스타그램 공유 (Web Share API 활용) */
	async function handleInstagramShare() {
		trackEvent('share', { method: 'instagram', cloud_type: myType });
		const dataUrl = await captureCard();
		if (!dataUrl) return;

		// 모바일 등 파일 공유 지원 기기
		if (navigator.share && navigator.canShare) {
			try {
				const res = await fetch(dataUrl);
				const blob = await res.blob();
				const file = new File([blob], 'sky.png', { type: 'image/png' });

				if (navigator.canShare({ files: [file] })) {
					await navigator.share({
						files: [file],
						title: t('result.shareTitle'),
						text: t('result.shareText').replace('{cloudName}', myCloud.name)
					});
					return;
				}
			} catch (err) {
				console.error('Instagram share failed:', err);
			}
		}

		// PC 등 미지원 환경은 다운로드로 안내
		handleDownloadCard();
		const msg =
			locale.current === 'ko'
				? '이미지가 저장되었습니다. 인스타그램에서 불러와 공유해주세요!'
				: 'Image saved. Please open Instagram and share the saved photo!';
		alert(msg);
	}

	$effect(() => {
		if (!browser || !showShareModal) return;
		const onEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') closeShareModal();
		};
		window.addEventListener('keydown', onEscape);
		return () => window.removeEventListener('keydown', onEscape);
	});
</script>

<svelte:head>
	<title>{ogTitle}</title>
	<meta name="description" content={ogDescription} />
	<!-- Open Graph: 공유 시 결과 살짝 보여주며 관심 유도 -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={ogTitle} />
	<meta property="og:description" content={ogDescription} />
	<meta property="og:url" content={ogUrl} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:site_name" content="Cloud Between Us" />
	<meta property="og:locale" content={ogLocale === 'ko' ? 'ko_KR' : 'en_US'} />
	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={ogTitle} />
	<meta name="twitter:description" content={ogDescription} />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>

<div class="result-min-h" style="background-color: var(--off-white)">
	<!-- Share Modal -->
	{#if showShareModal}
		<div
			class="share-modal-backdrop"
			role="dialog"
			aria-modal="true"
			aria-labelledby="share-modal-title"
			tabindex="-1"
			onclick={(e) => e.target === e.currentTarget && closeShareModal()}
			onkeydown={(e) =>
				(e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') && closeShareModal()}
		>
			<div class="share-modal">
				<button
					type="button"
					class="share-modal-close"
					aria-label="Close"
					onclick={closeShareModal}
				>
					<X size={22} />
				</button>
				<div class="share-modal-icon">
					<Cloud size={40} strokeWidth={1.5} />
				</div>
				<h2 id="share-modal-title" class="share-modal-title">
					{t('result.shareModalTitle')}
				</h2>
				<div class="share-modal-url-wrap">
					<code class="share-modal-url">{getShareUrl()}</code>
				</div>
				<button type="button" class="share-modal-copy" onclick={copyShareLink}>
					{#if shareCopied}
						<Check size={18} />
						<span>{t('result.linkCopied')}</span>
					{:else}
						<Copy size={18} />
						<span>{t('result.copyLink')}</span>
					{/if}
				</button>
			</div>
		</div>
	{/if}

	<!-- Header -->
	<header class="result-header">
		<a href="/" class="header-link">
			<ArrowLeft size={20} />
			<span class="header-link-text">{t('result.back')}</span>
		</a>
		<div class="header-brand">
			<Cloud size={24} />
			<span class="header-brand-text">Cloud Between Us</span>
		</div>
		<div class="header-actions">
			<button
				type="button"
				class="header-lang"
				aria-label="Language"
				onclick={async () => {
					locale.toggle();
					await invalidateAll();
				}}
			>
				<span class="header-lang-current"
					>{locale.current === 'ko' ? t('lang.ko') : t('lang.en')}</span
				>
				<span class="header-lang-switch">{locale.current === 'ko' ? 'EN' : 'KO'}</span>
			</button>
			<button
				type="button"
				class="header-action-btn"
				aria-label="Copy Link"
				onclick={copyShareLink}
			>
				<Copy size={16} />
			</button>
			<button
				type="button"
				class="header-action-btn share-primary"
				aria-label="Share"
				onclick={handleShare}
			>
				<Share2 size={16} />
				<span class="header-share-text">{t('result.share')}</span>
			</button>
		</div>
	</header>

	{#if showToast}
		<div class="toast-overlay">
			<div class="toast-message">
				<Check size={16} />
				<span>{t('result.linkCopied')}</span>
			</div>
		</div>
	{/if}

	<div class="result-main">
		<!-- My Cloud Type -->
		<section class="result-section">
			<h2 class="section-label">{t('result.yourCloudType')}</h2>
			<CloudCard cloud={myCloud} />
		</section>

		<!-- Partner Selection -->
		{#if !partnerType}
			<section class="result-section">
				<h2 class="section-title">{t('result.partnerQuestion')}</h2>
				<p class="section-sub">{t('result.partnerSub')}</p>
				<div class="partner-grid">
					{#each CLOUD_TYPES as type}
						<button type="button" class="partner-btn" onclick={() => handlePartnerSelect(type)}>
							<div class="partner-btn-icon">
								<CloudIcon {type} size={60} />
							</div>
							<span class="partner-btn-name">
								{profiles[type].name}
							</span>
						</button>
					{/each}
				</div>
			</section>
		{/if}

		<!-- Sky Story Section -->
		{#if partnerType && partnerCloud && skyStory}
			<!-- Partner Cloud -->
			<section class="result-section">
				<h2 class="section-label">{t('result.theirCloudType')}</h2>
				<CloudCard cloud={partnerCloud} size="large" />
				<button
					type="button"
					class="change-partner"
					onclick={() => {
						userPartner = null;
						const url = new URL(page.url);
						url.searchParams.delete('partner');
						goto(url.toString(), { replaceState: true });
					}}
				>
					{t('result.changePartner')}
				</button>
			</section>

			<!-- 무료 결과: 하늘 이름 + 짧은 서사(3~4줄) + 감정 트리거 (Soft Paywall 직전) -->
			<section class="chemistry-section">
				<div class="chemistry-circle">
					<div class="chemistry-circle-inner">
						<span class="chemistry-sky-name">{skyStory.skyName}</span>
						<span class="chemistry-label">{t('result.yourSky')}</span>
					</div>
				</div>
				<h3 class="chemistry-title">{skyStory.skyName}</h3>
				<p class="chemistry-tagline">{t('result.chemistryTagline')}</p>
				{#if freeNarrative}
					<p class="chemistry-free-story">{freeNarrative}</p>
				{/if}
				<p class="chemistry-emotional-trigger">
					{t('result.emotionalTrigger')}<br />
					{t('result.emotionalTrigger2')}
				</p>
			</section>

			<!-- 프리미엄 콘텐츠: 전체 스토리·시즌·갈등·피난처 등 -->
			<section class="premium-unlocked">
					{#if skyStory.premium}
						{@const p = locale.current === 'ko' ? skyStory.premium.ko : skyStory.premium.en}

						<!-- 1. Full Story -->
						<div class="unlocked-story">
							<div class="unlocked-story-header">
								<Sparkles size={24} class="text-sky-blue" />
								<h4 class="unlocked-title">{t('result.longTermTitle')}</h4>
							</div>
							<div class="unlocked-narrative">
								{#each p.fullStory.split('\n\n') as paragraph}
									<p>{paragraph}</p>
								{/each}
							</div>
						</div>

						<!-- 2. Seasons -->
						<div class="unlocked-seasons">
							<div class="unlocked-section-header">
								<Calendar size={20} />
								<h5>{t('result.seasonsTitle')}</h5>
							</div>
							<div class="seasons-timeline">
								<div class="season-card">
									<div class="season-icon"><Sunrise size={20} /></div>
									<div class="season-phase">{t('result.seasonFirstMeet')}</div>
									<p class="season-text">{p.seasons.firstMeet}</p>
								</div>
								<div class="season-card">
									<div class="season-icon"><Sun size={20} /></div>
									<div class="season-phase">{t('result.seasonSettling')}</div>
									<p class="season-text">{p.seasons.settling}</p>
								</div>
								<div class="season-card">
									<div class="season-icon"><Moon size={20} /></div>
									<div class="season-phase">{t('result.seasonLongTerm')}</div>
									<p class="season-text">{p.seasons.longTerm}</p>
								</div>
							</div>
						</div>

						<!-- 3. When You Fight -->
						<div class="unlocked-conflict">
							<div class="unlocked-section-header">
								<Zap size={20} />
								<h5>{t('result.paywallFightTitle')}</h5>
							</div>

							<div class="conflict-cards">
								<div class="conflict-card user">
									<span class="card-label">You</span>
									<p>{p.conflict.userTendency}</p>
								</div>
								<div class="conflict-card partner">
									<span class="card-label">Partner</span>
									<p>{p.conflict.partnerTendency}</p>
								</div>
							</div>

							<div class="conflict-tip">
								<h6 class="tip-label">Try this instead</h6>
								<p>{p.conflict.tip}</p>
							</div>
						</div>

						<!-- 3. Shelter -->
						<div class="unlocked-shelter">
							<div class="unlocked-section-header">
								<Shield size={20} />
								<h5>{t('result.premiumShelterTitle')}</h5>
							</div>

							<div class="shelter-columns">
								<div class="shelter-column">
									<div class="shelter-column-header">
										<Heart size={14} />
										<span>{t('result.premiumShelterPartner')}</span>
									</div>
									<ul class="shelter-list">
										{#each p.shelter.partnerNeeds as need}
											<li>{need}</li>
										{/each}
									</ul>
								</div>
								<div class="shelter-column">
									<div class="shelter-column-header">
										<Heart size={14} />
										<span>{t('result.premiumShelterUser')}</span>
									</div>
									<ul class="shelter-list">
										{#each p.shelter.userNeeds as need}
											<li>{need}</li>
										{/each}
									</ul>
								</div>
							</div>

							<p class="shelter-closing">{p.shelter.closingLine}</p>
						</div>

						<!-- 5. Love Language -->
						<div class="unlocked-love-language">
							<div class="unlocked-section-header">
								<MessageCircle size={20} />
								<h5>{t('result.loveLanguageTitle')}</h5>
							</div>
							<div class="love-language-columns">
								<div class="love-language-card">
									<div class="love-language-label">{t('result.loveYourWay')}</div>
									<p class="love-language-text">{p.loveLanguage.userExpression}</p>
								</div>
								<div class="love-language-card">
									<div class="love-language-label">{t('result.loveTheirWay')}</div>
									<p class="love-language-text">{p.loveLanguage.partnerExpression}</p>
								</div>
							</div>
							{#if p.loveLanguage.misreadings.length > 0}
								<div class="misreading-section">
									<h6 class="misreading-title">{t('result.misreadingTitle')}</h6>
									{#each p.loveLanguage.misreadings as mr}
										<div class="misreading-item">
											<div class="misreading-signal">
												<span class="misreading-label">{t('result.misreadingSignal')}</span>
												<p>{mr.signal}</p>
											</div>
											<div class="misreading-arrow">→</div>
											<div class="misreading-read">
												<span class="misreading-label">{t('result.misreadingRead')}</span>
												<p>{mr.misread}</p>
											</div>
										</div>
									{/each}
								</div>
							{/if}
						</div>

						<!-- 6. Shadows -->
						<div class="unlocked-shadows">
							<div class="unlocked-section-header">
								<Eye size={20} />
								<h5>{t('result.premiumShadowsTitle')}</h5>
							</div>

							<div class="shadows-columns">
								<div class="shadows-column">
									<span class="shadows-label">{t('result.premiumShadowsUser')}</span>
									{#each p.shadows.userShadows as shadow}
										<p class="shadow-item">{shadow}</p>
									{/each}
								</div>
								<div class="shadows-column">
									<span class="shadows-label">{t('result.premiumShadowsPartner')}</span>
									{#each p.shadows.partnerShadows as shadow}
										<p class="shadow-item">{shadow}</p>
									{/each}
								</div>
							</div>
						</div>

						<!-- 7. Danger Phrases -->
						<div class="unlocked-danger-phrases">
							<div class="unlocked-section-header">
								<AlertTriangle size={20} />
								<h5>{t('result.dangerPhrasesTitle')}</h5>
							</div>
							<p class="danger-subtitle">{t('result.dangerPhrasesSubtitle')}</p>

							<div class="danger-columns">
								<div class="danger-column">
									<div class="danger-column-label">{t('result.dangerForYou')}</div>
									{#each p.dangerPhrases.userPhrases as phrase}
										<div class="danger-pair">
											<div class="danger-bad">
												<span class="danger-tag bad">{t('result.dangerBad')}</span>
												<p>"{phrase.bad}"</p>
											</div>
											<div class="danger-better">
												<span class="danger-tag better">{t('result.dangerBetter')}</span>
												<p>"{phrase.better}"</p>
											</div>
										</div>
									{/each}
								</div>
								<div class="danger-column">
									<div class="danger-column-label">{t('result.dangerForThem')}</div>
									{#each p.dangerPhrases.partnerPhrases as phrase}
										<div class="danger-pair">
											<div class="danger-bad">
												<span class="danger-tag bad">{t('result.dangerBad')}</span>
												<p>"{phrase.bad}"</p>
											</div>
											<div class="danger-better">
												<span class="danger-tag better">{t('result.dangerBetter')}</span>
												<p>"{phrase.better}"</p>
											</div>
										</div>
									{/each}
								</div>
							</div>
						</div>

						<!-- 8. Micro Actions -->
						<div class="unlocked-actions">
							<div class="unlocked-section-header">
								<MessageSquare size={20} />
								<h5>{t('result.premiumBrighterTitle')}</h5>
							</div>

							<div class="actions-list">
								{#each p.actions as action, i}
									<div class="action-item">
										<div class="action-check">
											<Check size={16} />
										</div>
										<div class="action-content">
											<strong>{action.title}</strong>
											<p>{action.desc}</p>
										</div>
									</div>
								{/each}
							</div>
						</div>

						<!-- 6. Premium Share Card -->
						<div class="premium-share-preview">
							<div class="share-card-canvas" style:background-color="var(--sky-blue)">
								<div class="card-phenomenon">
									{locale.current === 'ko'
										? skyStory.skyNameKo || skyStory.skyName
										: skyStory.skyName}
								</div>
								<div class="card-couple">{coupleDisplayName}</div>
								<div class="card-phrase">"{p.shareCard.phrase}"</div>
								<div class="card-logo">Cloud Between Us</div>
							</div>

							<!-- Name Inputs -->
							<div class="share-card-inputs">
								<input
									type="text"
									bind:value={myName}
									placeholder={t('result.myNamePlaceholder')}
									maxlength="10"
									class="name-input"
								/>
								<span class="name-separator">&</span>
								<input
									type="text"
									bind:value={partnerName}
									placeholder={t('result.partnerNamePlaceholder')}
									maxlength="10"
									class="name-input"
								/>
							</div>

							<div class="share-card-actions">
								<button
									class="share-btn-premium inst"
									onclick={handleInstagramShare}
									disabled={isCapturing}
								>
									<Instagram size={18} />
									{isCapturing ? '...' : 'Instagram'}
								</button>
								<button
									class="share-btn-premium dl"
									onclick={handleDownloadCard}
									disabled={isCapturing}
								>
									<Download size={18} />
									{isCapturing ? '...' : 'Download'}
								</button>
							</div>
						</div>
					{:else}
						<!-- Fallback for combinations without premium content yet -->
						<div class="premium-card">
							<h4 class="premium-card-title">{t('result.longTermTitle')}</h4>
							<p class="premium-card-story unlocked">{skyStory.narrative}</p>
							{#if skyStory.warning}
								<div class="premium-warning">
									<p>⚠️ {skyStory.warning}</p>
								</div>
							{/if}
						</div>
					{/if}
				</section>
		{/if}

		<!-- CTA -->
		<section class="result-cta">
			<p class="result-cta-tagline">{t('result.ctaTagline')}</p>
			<a href="/" class="result-cta-btn">{t('result.ctaBtn')}</a>
		</section>
	</div>
</div>

<style>
	.result-min-h {
		min-height: 100vh;
	}

	.result-header {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 0.5rem;
		border-bottom: 1px solid var(--border-light);
		min-width: 0;
	}
	@media (min-width: 768px) {
		.result-header {
			padding: 1rem 1.5rem;
			gap: 0;
		}
	}

	.header-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--text-gray);
		text-decoration: none;
		justify-self: start;
	}

	.header-link-text {
		display: none;
	}
	@media (min-width: 768px) {
		.header-link-text {
			display: inline;
		}
	}

	.header-brand {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		color: var(--sky-blue);
		justify-self: center;
		min-width: 0;
	}

	.header-brand-text {
		font-weight: 300;
		white-space: nowrap;
		display: none;
	}
	@media (min-width: 480px) {
		.header-brand-text {
			display: block;
		}
	}

	.header-actions {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 0.35rem;
		justify-self: end;
		flex-shrink: 0;
	}

	@media (min-width: 768px) {
		.header-actions {
			gap: 0.5rem;
		}
	}

	.header-lang {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.35rem;
		padding: 0.4rem 0.6rem;
		min-width: 2.25rem;
		border-radius: 9999px;
		font-size: 0.8125rem;
		background: color-mix(in srgb, var(--sky-blue) 25%, transparent);
		color: var(--text-dark);
		border: none;
		cursor: pointer;
		transition: opacity var(--transition-smooth);
		white-space: nowrap;
	}
	@media (min-width: 768px) {
		.header-lang {
			padding: 0.4rem 0.75rem;
			min-width: 0;
		}
	}

	.header-lang:hover {
		opacity: 0.85;
	}

	.header-lang-current {
		display: none;
		font-weight: 500;
	}
	@media (min-width: 768px) {
		.header-lang-current {
			display: inline;
		}
	}

	.header-lang-switch {
		opacity: 0.9;
	}
	@media (min-width: 768px) {
		.header-lang-switch {
			opacity: 0.7;
		}
	}

	/* Share modal */
	.share-modal-backdrop {
		position: fixed;
		inset: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		background: rgba(17, 24, 39, 0.4);
		backdrop-filter: blur(6px);
		animation: shareModalFadeIn 0.2s ease;
	}

	@keyframes shareModalFadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.share-modal {
		position: relative;
		width: 100%;
		max-width: 24rem;
		padding: 2rem 1.75rem;
		background: var(--off-white);
		border-radius: var(--radius-lg);
		box-shadow:
			var(--shadow-soft),
			0 24px 48px rgba(0, 0, 0, 0.12);
		text-align: center;
		animation: shareModalSlide 0.25s ease;
	}

	@keyframes shareModalSlide {
		from {
			opacity: 0;
			transform: scale(0.96) translateY(8px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	.share-modal-close {
		position: absolute;
		top: 1rem;
		right: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.25rem;
		height: 2.25rem;
		border: none;
		border-radius: 50%;
		background: transparent;
		color: var(--text-gray);
		cursor: pointer;
		transition:
			background 0.2s,
			color 0.2s;
	}

	.share-modal-close:hover {
		background: color-mix(in srgb, var(--sky-blue) 20%, transparent);
		color: var(--text-dark);
	}

	.share-modal-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 4rem;
		height: 4rem;
		margin-bottom: 1rem;
		border-radius: 50%;
		background: color-mix(in srgb, var(--sky-blue) 25%, transparent);
		color: var(--sky-blue);
	}

	.share-modal-title {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--text-dark);
		margin: 0 0 1rem;
	}

	.share-modal-url-wrap {
		padding: 0.75rem 1rem;
		margin-bottom: 1.25rem;
		background: color-mix(in srgb, var(--border-light) 60%, transparent);
		border-radius: var(--radius-sm);
		text-align: left;
	}

	.share-modal-url {
		display: block;
		font-size: 0.8125rem;
		color: var(--text-gray);
		word-break: break-all;
		line-height: 1.4;
	}

	.share-modal-copy {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		border: none;
		border-radius: 9999px;
		background: var(--sky-blue);
		color: var(--text-dark);
		font-size: 0.9375rem;
		font-weight: 500;
		cursor: pointer;
		transition:
			transform var(--transition-smooth),
			opacity 0.2s;
	}

	.share-modal-copy:hover {
		transform: scale(1.03);
	}

	.share-modal-copy:active {
		transform: scale(0.98);
	}

	.header-share-text {
		display: none;
	}
	@media (min-width: 480px) {
		.header-share-text {
			display: inline;
		}
	}

	.header-action-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.5rem;
		min-width: 2.5rem;
		height: 2.5rem;
		border-radius: 9999px;
		background: white;
		border: 1px solid var(--border-light);
		color: var(--text-dark);
		cursor: pointer;
		transition: all var(--transition-smooth);
		white-space: nowrap;
	}

	@media (min-width: 768px) {
		.header-action-btn {
			padding: 0.5rem 0.75rem;
		}
	}

	.header-action-btn:hover {
		background: var(--off-white);
		transform: translateY(-1px);
	}

	.header-action-btn.share-primary {
		background: var(--sky-blue);
		border-color: var(--sky-blue);
	}

	.header-action-btn.share-primary:hover {
		opacity: 0.9;
		transform: scale(1.03);
	}

	/* Toast Notification */
	.toast-overlay {
		position: fixed;
		bottom: 2rem;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
		z-index: 1000;
		pointer-events: none;
		padding: 0 1rem;
	}

	.toast-message {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.875rem 1.5rem;
		background: rgba(44, 62, 80, 0.9);
		backdrop-filter: blur(8px);
		color: white;
		border-radius: 9999px;
		font-size: 0.9375rem;
		font-weight: 500;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
		animation: toastPopUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}

	@keyframes toastPopUp {
		from {
			opacity: 0;
			transform: translateY(1rem) scale(0.9);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	.result-main {
		max-width: 56rem;
		margin: 0 auto;
		padding: 2.5rem 1rem; /* 상단 여백 소폭 증가 */
		display: flex;
		flex-direction: column;
		gap: 3.5rem; /* 섹션 간격 조정 */
	}

	.result-section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.section-label {
		text-align: center;
		font-size: 0.875rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-gray);
		margin: 0;
	}

	.section-title {
		text-align: center;
		font-size: 1.5rem;
		color: var(--text-dark);
		margin: 0;
	}

	.section-sub {
		text-align: center;
		color: var(--text-gray);
		margin: 0;
	}

	.partner-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		padding-top: 1rem;
	}

	@media (min-width: 768px) {
		.partner-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.partner-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem;
		border-radius: var(--radius-sm);
		background: white;
		border: 2px solid var(--border-light);
		transition: transform var(--transition-smooth);
	}

	.partner-btn:hover {
		transform: scale(1.05);
	}

	.partner-btn-icon {
		display: flex;
		justify-content: center;
		margin-bottom: 0.5rem;
	}

	.partner-btn-name {
		font-size: 0.875rem;
		color: var(--text-dark);
	}

	.change-partner {
		width: 100%;
		text-align: center;
		font-size: 0.875rem;
		text-decoration: underline;
		color: var(--text-gray);
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.25rem;
	}

	.chemistry-section {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding: 2rem 0;
	}

	.chemistry-circle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 8rem;
		height: 8rem;
		border-radius: 50%;
		background: var(--sky-blue);
	}

	.chemistry-circle-inner {
		text-align: center;
	}

	.chemistry-sky-name {
		display: block;
		font-size: 0.875rem;
		color: var(--text-dark);
		line-height: 1.2;
		padding: 0 0.5rem;
	}

	.chemistry-label {
		display: block;
		font-size: 0.75rem;
		color: var(--text-dark);
		opacity: 0.8;
	}

	.chemistry-title {
		font-size: 1.875rem;
		font-weight: 300;
		color: var(--text-dark);
		margin: 0;
	}

	.chemistry-tagline {
		font-size: 1.125rem;
		font-style: italic;
		color: var(--text-gray);
		margin: 0;
	}

	.chemistry-free-story {
		font-size: 1rem;
		line-height: 1.7;
		color: var(--text-gray);
		margin: 0;
		white-space: pre-line;
		max-width: 28rem;
	}

	.chemistry-emotional-trigger {
		font-size: 1rem;
		font-style: italic;
		color: var(--text-dark);
		margin: 1rem 0 0;
		opacity: 0.9;
	}

	.premium-card {
		background: white;
		border-radius: var(--radius-lg);
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.premium-card-title {
		font-size: 1.25rem;
		color: var(--text-dark);
		margin: 0;
	}

	.premium-card-story {
		color: var(--text-gray);
		margin: 0;
		white-space: pre-line;
	}

	.premium-card-story.unlocked {
		line-height: 1.8;
	}

	.premium-warning {
		padding: 1rem;
		border-radius: var(--radius-sm);
		background: color-mix(in srgb, var(--warm-peach) 20%, transparent);
	}

	.premium-warning p {
		font-size: 0.875rem;
		color: var(--text-gray);
		margin: 0;
	}

	.premium-unlocked {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
		animation: premiumReveal 1s ease-out;
	}

	@keyframes premiumReveal {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.unlocked-story {
		text-align: center;
		padding: 2rem 0;
	}

	.unlocked-story-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 2rem;
	}

	.unlocked-title {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--text-dark);
		letter-spacing: -0.01em;
	}

	.unlocked-narrative {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		max-width: 32rem;
		margin: 0 auto;
	}

	.unlocked-narrative p {
		font-size: 1.0625rem;
		line-height: 1.8;
		color: var(--text-dark);
		opacity: 0.85;
		word-break: keep-all;
	}

	.unlocked-conflict,
	.unlocked-actions,
	.unlocked-shelter,
	.unlocked-shadows {
		background: white;
		border-radius: var(--radius-lg);
		padding: 2.25rem;
		box-shadow: var(--shadow-soft);
	}

	.unlocked-section-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
		color: var(--text-gray);
	}

	.unlocked-section-header h5 {
		font-size: 0.875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0;
	}

	.conflict-cards {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	@media (min-width: 640px) {
		.conflict-cards {
			grid-template-columns: 1fr 1fr;
		}
	}

	.conflict-card {
		padding: 1.5rem;
		border-radius: var(--radius-sm);
		background: var(--off-white);
		border: 1px solid var(--border-light);
	}

	.card-label {
		display: block;
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		margin-bottom: 0.75rem;
		opacity: 0.5;
		letter-spacing: 0.05em;
	}

	.conflict-card p {
		font-size: 0.9375rem;
		line-height: 1.6;
		color: var(--text-dark);
		margin: 0;
	}

	.conflict-tip {
		padding: 1.5rem;
		border-radius: var(--radius-sm);
		background: color-mix(in srgb, var(--sky-blue) 12%, white);
		border: 1px dashed var(--sky-blue);
	}

	.tip-label {
		font-size: 0.875rem;
		font-weight: 700;
		color: var(--text-dark);
		margin: 0 0 0.5rem;
	}

	.conflict-tip p {
		font-size: 0.9375rem;
		line-height: 1.6;
		color: var(--text-dark);
		margin: 0;
	}

	.actions-list {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.action-item {
		display: flex;
		gap: 1.25rem;
	}

	.action-check {
		flex-shrink: 0;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 6px;
		background: var(--sky-blue);
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 0.25rem;
	}

	.action-content strong {
		display: block;
		font-size: 1.0625rem;
		margin-bottom: 0.35rem;
		color: var(--text-dark);
	}

	.action-content p {
		font-size: 0.9375rem;
		line-height: 1.5;
		color: var(--text-gray);
		margin: 0;
	}

	/* Shelter */
	.shelter-columns {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
		margin-bottom: 1.5rem;
	}

	@media (min-width: 640px) {
		.shelter-columns {
			grid-template-columns: 1fr 1fr;
		}
	}

	.shelter-column {
		padding: 1.5rem;
		border-radius: var(--radius-sm);
		background: var(--off-white);
		border: 1px solid var(--border-light);
	}

	.shelter-column-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1rem;
		font-size: 0.8125rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--text-gray);
	}

	.shelter-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.shelter-list li {
		position: relative;
		padding-left: 1.25rem;
		font-size: 0.9375rem;
		line-height: 1.5;
		color: var(--text-dark);
	}

	.shelter-list li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.55rem;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--sky-blue);
	}

	.shelter-closing {
		text-align: center;
		font-size: 0.9375rem;
		font-style: italic;
		color: var(--text-gray);
		margin: 0;
		padding: 1rem;
		border-top: 1px solid var(--border-light);
	}

	/* Shadows */
	.shadows-columns {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}

	@media (min-width: 640px) {
		.shadows-columns {
			grid-template-columns: 1fr 1fr;
		}
	}

	.shadows-column {
		padding: 1.5rem;
		border-radius: var(--radius-sm);
		background: color-mix(in srgb, var(--warm-peach) 10%, var(--off-white));
		border: 1px solid color-mix(in srgb, var(--warm-peach) 30%, var(--border-light));
	}

	.shadows-label {
		display: block;
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-gray);
		margin-bottom: 0.75rem;
	}

	.shadow-item {
		font-size: 0.9375rem;
		line-height: 1.6;
		color: var(--text-dark);
		margin: 0 0 0.5rem;
	}

	.shadow-item:last-child {
		margin-bottom: 0;
	}

	.premium-share-preview {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
		padding: 2rem 0;
	}

	.share-card-canvas {
		width: 100%;
		max-width: 24rem;
		aspect-ratio: 1;
		border-radius: var(--radius-lg);
		padding: 3rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		color: var(--text-dark);
		box-shadow:
			var(--shadow-soft),
			0 20px 40px rgba(0, 0, 0, 0.05);
		position: relative;
		background: var(--off-white);
	}

	.card-phenomenon {
		font-size: 1.375rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
		letter-spacing: -0.02em;
	}

	.card-couple {
		font-size: 0.875rem;
		opacity: 0.6;
		margin-bottom: 2.5rem;
	}

	.card-phrase {
		font-size: 1.125rem;
		line-height: 1.6;
		font-style: italic;
		max-width: 16rem;
		margin-bottom: 2.5rem;
		word-break: keep-all;
	}

	.card-logo {
		font-size: 0.75rem;
		font-weight: 400;
		letter-spacing: 0.15em;
		opacity: 0.4;
		text-transform: uppercase;
	}

	.share-card-inputs {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		width: 100%;
		max-width: 24rem;
		margin-bottom: 0.5rem;
	}

	.name-input {
		flex: 1;
		min-width: 0;
		padding: 0.625rem 1rem;
		border-radius: 9999px;
		border: 1px solid var(--border-light);
		background: white;
		font-size: 0.875rem;
		color: var(--text-dark);
		text-align: center;
		transition: all 0.2s ease;
	}

	.name-input:focus {
		outline: none;
		border-color: var(--sky-blue);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--sky-blue) 20%, transparent);
	}

	.name-separator {
		font-size: 0.875rem;
		color: var(--text-gray);
		font-weight: 500;
	}

	.share-card-actions {
		display: flex;
		gap: 0.75rem;
	}

	.share-btn-premium {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.875rem 1.5rem;
		border-radius: 9999px;
		font-size: 0.9375rem;
		font-weight: 600;
		border: 1px solid var(--border-light);
		background: white;
		color: var(--text-dark);
		cursor: pointer;
		transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
	}

	.share-btn-premium:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		transform: none !important;
		box-shadow: none !important;
	}

	.share-btn-premium.inst {
		background: #111;
		color: white;
		border-color: #111;
	}

	.share-btn-premium.inst:hover {
		background: #222;
	}

	.premium-unlocked .premium-card {
		gap: 1.5rem;
	}

	/* ── Seasons ── */
	.unlocked-seasons {
		background: white;
		border-radius: var(--radius-lg);
		padding: 2.25rem;
		box-shadow: var(--shadow-soft);
	}

	.seasons-timeline {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		position: relative;
		padding-left: 1.5rem;
	}

	.seasons-timeline::before {
		content: '';
		position: absolute;
		left: 0.625rem;
		top: 0.75rem;
		bottom: 0.75rem;
		width: 2px;
		background: linear-gradient(
			to bottom,
			var(--warm-peach),
			var(--sky-blue),
			color-mix(in srgb, var(--sky-blue) 40%, var(--text-gray))
		);
	}

	.season-card {
		position: relative;
		padding: 1.25rem 1.5rem;
		background: var(--off-white);
		border-radius: var(--radius-sm);
		border: 1px solid var(--border-light);
	}

	.season-icon {
		position: absolute;
		left: -2.25rem;
		top: 1.25rem;
		width: 1.75rem;
		height: 1.75rem;
		border-radius: 50%;
		background: white;
		border: 2px solid var(--border-light);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-gray);
	}

	.season-phase {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-gray);
		margin-bottom: 0.5rem;
	}

	.season-text {
		font-size: 0.9375rem;
		line-height: 1.6;
		color: var(--text-dark);
		margin: 0;
	}

	/* ── Love Language ── */
	.unlocked-love-language {
		background: white;
		border-radius: var(--radius-lg);
		padding: 2.25rem;
		box-shadow: var(--shadow-soft);
	}

	.love-language-columns {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	@media (min-width: 640px) {
		.love-language-columns {
			grid-template-columns: 1fr 1fr;
		}
	}

	.love-language-card {
		padding: 1.5rem;
		border-radius: var(--radius-sm);
		background: color-mix(in srgb, var(--sky-blue) 8%, var(--off-white));
		border: 1px solid color-mix(in srgb, var(--sky-blue) 25%, var(--border-light));
	}

	.love-language-label {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-gray);
		margin-bottom: 0.75rem;
	}

	.love-language-text {
		font-size: 0.9375rem;
		line-height: 1.6;
		color: var(--text-dark);
		margin: 0;
	}

	.misreading-section {
		padding: 1.5rem;
		border-radius: var(--radius-sm);
		background: color-mix(in srgb, var(--warm-peach) 8%, var(--off-white));
		border: 1px solid color-mix(in srgb, var(--warm-peach) 25%, var(--border-light));
	}

	.misreading-title {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text-dark);
		margin: 0 0 1rem;
	}

	.misreading-item {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	.misreading-item:last-child {
		margin-bottom: 0;
	}

	.misreading-signal,
	.misreading-read {
		flex: 1;
	}

	.misreading-label {
		display: block;
		font-size: 0.6875rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 0.25rem;
	}

	.misreading-signal .misreading-label {
		color: var(--sky-blue);
	}

	.misreading-read .misreading-label {
		color: color-mix(in srgb, var(--warm-peach) 80%, #c00);
	}

	.misreading-signal p,
	.misreading-read p {
		font-size: 0.875rem;
		line-height: 1.5;
		color: var(--text-dark);
		margin: 0;
	}

	.misreading-arrow {
		flex-shrink: 0;
		color: var(--text-gray);
		font-size: 1rem;
		padding-top: 1rem;
	}

	@media (max-width: 639px) {
		.misreading-item {
			flex-direction: column;
			gap: 0.25rem;
		}
		.misreading-arrow {
			padding-top: 0;
			align-self: center;
		}
	}

	/* ── Danger Phrases ── */
	.unlocked-danger-phrases {
		background: white;
		border-radius: var(--radius-lg);
		padding: 2.25rem;
		box-shadow: var(--shadow-soft);
	}

	.danger-subtitle {
		font-size: 0.9375rem;
		color: var(--text-gray);
		margin: -0.5rem 0 1.5rem;
		line-height: 1.5;
	}

	.danger-columns {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	@media (min-width: 640px) {
		.danger-columns {
			grid-template-columns: 1fr 1fr;
		}
	}

	.danger-column-label {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-gray);
		margin-bottom: 1rem;
	}

	.danger-pair {
		margin-bottom: 1.25rem;
	}

	.danger-pair:last-child {
		margin-bottom: 0;
	}

	.danger-bad {
		padding: 0.875rem 1rem;
		border-radius: var(--radius-sm) var(--radius-sm) 0 0;
		background: color-mix(in srgb, #ef4444 8%, var(--off-white));
		border: 1px solid color-mix(in srgb, #ef4444 20%, var(--border-light));
		border-bottom: none;
	}

	.danger-better {
		padding: 0.875rem 1rem;
		border-radius: 0 0 var(--radius-sm) var(--radius-sm);
		background: color-mix(in srgb, #22c55e 8%, var(--off-white));
		border: 1px solid color-mix(in srgb, #22c55e 20%, var(--border-light));
	}

	.danger-tag {
		display: inline-block;
		font-size: 0.6875rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 0.125rem 0.5rem;
		border-radius: 4px;
		margin-bottom: 0.375rem;
	}

	.danger-tag.bad {
		background: color-mix(in srgb, #ef4444 15%, transparent);
		color: #dc2626;
	}

	.danger-tag.better {
		background: color-mix(in srgb, #22c55e 15%, transparent);
		color: #16a34a;
	}

	.danger-bad p,
	.danger-better p {
		font-size: 0.9375rem;
		line-height: 1.5;
		color: var(--text-dark);
		margin: 0;
	}

	.result-cta {
		text-align: center;
		padding: 2rem 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.result-cta-tagline {
		font-size: 0.875rem;
		color: var(--text-gray);
		margin: 0;
	}

	.result-cta-btn {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		border-radius: 9999px;
		background: var(--border-light);
		color: var(--text-dark);
		text-decoration: none;
		transition: transform var(--transition-smooth);
	}

	.result-cta-btn:hover {
		transform: scale(1.05);
	}
</style>
