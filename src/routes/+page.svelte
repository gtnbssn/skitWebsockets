<script lang="ts" context="module">
	import type { PageData } from './$types';
	import QRCode from 'qrcode';
	import { io } from 'socket.io-client';

	const socket = io();
</script>

<script>
	import { CircleBufferGeometry, MeshStandardMaterial, BoxBufferGeometry, DoubleSide } from 'three';
	import { DEG2RAD } from 'three/src/math/MathUtils';
	import {
		AmbientLight,
		Canvas,
		DirectionalLight,
		Group,
		HemisphereLight,
		Mesh,
		OrbitControls,
		PerspectiveCamera,
		Pass
	} from '@threlte/core';
	import { spring } from 'svelte/motion';
	import { Vector2 } from 'three';
	import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
	import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
	import { onMount } from 'svelte';

	export let data;

	console.log(`heya ${data.localIP}`);

	const scale = spring(1);

	let currentColor = '#0000FF';

	socket.on('eventFromServer', (message) => {
		console.log(message);
		if (currentColor == '#0000FF') {
			currentColor = '#FF0000';
		} else {
			currentColor = '#0000FF';
		}
	});
	onMount(async () => {
		QRCode.toCanvas(
			document.getElementById('qrcode'),
			`http://${data.localIP}:5173/controller`, //FIXME:  the port number is different in production
			{ errorCorrectionLevel: 'H' },
			function (error) {
				if (error) console.error(error);
				console.log('success!');
			}
		);
	});
</script>

<div>
	<Canvas>
		<PerspectiveCamera position={{ x: 10, y: 10, z: 10 }} fov={24}>
			<OrbitControls
				maxPolarAngle={DEG2RAD * 80}
				autoRotate={false}
				enableZoom={false}
				target={{ y: 0.5 }}
			/>
		</PerspectiveCamera>

		<DirectionalLight shadow position={{ x: 3, y: 10, z: 10 }} />
		<DirectionalLight position={{ x: -3, y: 10, z: -10 }} intensity={0.2} />
		<AmbientLight intensity={0.2} />

		<!-- Cube -->
		<Group scale={$scale}>
			<Mesh
				interactive
				on:pointerenter={() => ($scale = 2)}
				on:pointerleave={() => ($scale = 1)}
				position={{ y: 0.5 }}
				castShadow
				geometry={new BoxBufferGeometry(1, 1, 1)}
				material={new MeshStandardMaterial({ color: currentColor })}
			/>
		</Group>

		<!-- Floor -->
		<Mesh
			receiveShadow
			rotation={{ x: -90 * (Math.PI / 180) }}
			geometry={new CircleBufferGeometry(3, 72)}
			material={new MeshStandardMaterial({ side: DoubleSide, color: 'white' })}
		/>
		<Pass pass={new UnrealBloomPass(new Vector2(256, 256), 0.3, 0.5, 0.75)} />
		<Pass pass={new FilmPass(0.5, 0.1, 250, false)} />
	</Canvas>
</div>

<canvas id="qrcode" />

<style>
	div {
		position: fixed;
		left: 0;
		top: 0;
		height: 100%;
		width: 100%;
	}
	canvas {
		position: fixed;
		top: 20px;
		left: 20px;
		opacity: 0.6;
	}
</style>
