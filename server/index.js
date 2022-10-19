// THIS IS WHAT IS USED IN PRODUCTION
// IT NEEDS TO BE KEPT IN SYNC WITH WHAT IS IN THE VITE CONFIGURATION MANUALLY

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { handler } from '../build/handler.js';

const port = 3000;
const app = express();
const server = createServer(app);

const io = new Server(server);

io.on('connection', (socket) => {
	socket.emit('eventFromServer', 'Hello, World 👋');
	socket.on('eventFromClient', (msg) => {
		console.log('message from the client: ' + msg);
	});
});

// SvelteKit should handle everything else using Express middleware
// https://github.com/sveltejs/kit/tree/master/packages/adapter-node#custom-server
app.use(handler);

server.listen(port, '0.0.0.0');
