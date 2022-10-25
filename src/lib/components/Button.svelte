<script lang="ts">
  export let socket;
  export let buttonText: String;
  export let message: String;
  const sendEvent = () => {
    socket.emit("eventFromClient", message);
  }
</script>

<button on:click={sendEvent}>{buttonText}</button>
