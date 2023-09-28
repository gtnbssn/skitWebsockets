<script lang="ts">
	export let socket;
	export let buttonText: String;
	export let message: String;

	let buttonClass = 'bg-blue-500';
	const sendEvent = () => {
		socket.emit('eventFromClient', message);
		if (buttonClass == 'bg-blue-500') {
			buttonClass = 'bg-red-500';
		} else {
			buttonClass = 'bg-blue-500';
		}
	};
</script>

<button on:click={sendEvent} class={`${buttonClass} text-white font-bold py-2 px-4 rounded`}
	>{buttonText}</button
>
