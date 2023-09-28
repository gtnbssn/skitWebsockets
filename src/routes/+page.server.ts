import type { PageLoad } from './$types';
import { networkInterfaces } from 'os';

export const load: PageLoad = ({ params }) => {
	const localIP = Object.values(networkInterfaces()).reduce(
		(r, list) =>
			r.concat(
				list.reduce(
					(rr, i) => rr.concat((i.family === 'IPv4' && !i.internal && i.address) || []),
					[]
				)
			),
		[]
	)[0];
	console.log(localIP);
	return { localIP };
};
