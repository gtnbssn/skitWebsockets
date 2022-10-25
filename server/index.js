import express from 'express';
import { createServer } from 'http';
import { networkInterfaces } from 'os';
import { configureSocket } from './socket.js'

import { handler } from '../build/handler.js';

const port = 3000;
const app = express();
const server = createServer(app);

configureSocket(server);

// SvelteKit should handle everything else using Express middleware
// https://github.com/sveltejs/kit/tree/master/packages/adapter-node#custom-server
app.use(handler);

// output the local address
const localIP =	Object.values(networkInterfaces()).reduce(
		(r, list) =>
			r.concat(
				list.reduce(
					(rr, i) => rr.concat((i.family === 'IPv4' && !i.internal && i.address) || []),
					[]
				)
			),
		[]
	)[0];

console.log('access the app on the local network at: http://' + localIP + ':' + port);

server.listen(port, '0.0.0.0');
