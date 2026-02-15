<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let { onApprove, onCancel, onError } = $props<{
		onApprove: () => void;
		onCancel?: () => void;
		onError?: (err: any) => void;
	}>();
	const containerId = 'paypal-container-RGZTAHHGVXZU4';

	onMount(() => {
		if (!browser) return;

		// Function to render the hosted button
		const renderButton = () => {
			if ((window as any).paypal && (window as any).paypal.HostedButtons) {
				(window as any).paypal
					.HostedButtons({
						hostedButtonId: 'RGZTAHHGVXZU4',
						onApprove: (data: any, actions: any) => {
							console.log('✅ PayPal payment approved:', data);
							// data.orderID 등을 이용해 서버 검증 가능
							onApprove();
						},
						onCancel: (data: any) => {
							console.log('⚠️ PayPal payment cancelled:', data);
							if (onCancel) onCancel();
						},
						onError: (err: any) => {
							console.error('❌ PayPal payment error:', err);
							if (onError) onError(err);
						}
					})
					.render(`#${containerId}`);
			}
		};

		// Check if script is already loaded
		if ((window as any).paypal) {
			renderButton();
		} else {
			const script = document.createElement('script');
			script.src =
				'https://www.paypal.com/sdk/js?client-id=BAAGVh0VCMGZv6Hc4CBwfzS5JuBrOGxId5jGWR3peECN1JIV7k4774EAozOLNsecLnOcPq59GlOa9-vfWw&components=hosted-buttons&disable-funding=venmo&currency=USD';
			script.onload = renderButton;
			document.head.appendChild(script);
		}
	});
</script>

<div id={containerId} class="paypal-button-container"></div>

<style>
	/* 페이팔 컨테이너에 강제로 block 스타일과 너비를 지정하여 flex 레이아웃으로 인한 깨짐 방지 */
	.paypal-button-container {
		display: block;
		width: 100%;
		max-width: 300px;
		margin: 1.5rem auto;
		min-height: 50px;
		position: relative;
		z-index: 10;
	}

	/* 페이팔이 주입하는 iframe 강제 스타일링 */
	:global(#paypal-container-RGZTAHHGVXZU4 iframe) {
		width: 100% !important;
		min-width: 200px !important;
		display: block !important;
	}
</style>
