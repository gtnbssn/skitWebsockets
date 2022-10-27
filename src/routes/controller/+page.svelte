<script lang="ts" context="module">
  import { io } from 'socket.io-client'
  import Button from '$lib/components/Button.svelte'

  const socket = io()

  socket.on('eventFromServer', (message) => {
    console.log(message)
  })
</script>
<h1 class="text-5xl mx-auto mb-10">BIG RED BUTTON</h1>
<Button socket={socket} buttonText="talk to me" message="hellooo"/>
