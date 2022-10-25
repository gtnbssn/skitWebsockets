import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig, ViteDevServer } from 'vite';
import { configureSocket } from './server/socket.js';

const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server: ViteDevServer) {
		if (server.httpServer) {
			configureSocket(server.httpServer);
		}
	}
};

const config: UserConfig = {
	plugins: [sveltekit(), webSocketServer],
	ssr: {
		noExternal: ['three']
	}
};

export default config;
