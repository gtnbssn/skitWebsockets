<script lang="ts">
  export let socket;
  export let buttonText: String;
  export let message: String;
  const sendEvent = () => {
    socket.emit("eventFromClient", message);
  }
</script>

<button on:click={sendEvent} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{buttonText}</button>
