import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { Server } from 'socket.io';

const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server) {
		const io = new Server(server.httpServer);
		io.on('connection', (socket) => {
			socket.emit('eventFromServer', 'Hello, World 👋');
			socket.on('eventFromClient', (msg) => {
				console.log('message from the client: ' + msg);
			});
		});
	}
};

const config: UserConfig = {
	plugins: [sveltekit(), webSocketServer],
  ssr: {
    noExternal: ['three']
  }
};

export default config;
