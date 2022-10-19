<script lang="ts" context="module">
  import { io } from 'socket.io-client'
  import Button from '../components/Button.svelte'

  const socket = io()

  socket.on('eventFromServer', (message) => {
    console.log(message)
  })
</script>
<h1 class="text-5xl">Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Button socket={socket} buttonText="talk to me" message="hellooo"/>
