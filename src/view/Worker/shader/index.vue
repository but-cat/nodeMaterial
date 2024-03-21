<template>
	<div
		class="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 flex overflow-hidden text-sm" style="width: 420px;flex:0 0 420px;">
		<div ref="container"
			class="w-full h-full bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 flex overflow-hidden text-sm">
		</div>
	</div>
</template>

<script lang="ts" setup>
import { defineComponent, reactive, ref, toRefs, watch, getCurrentInstance, onMounted } from 'vue';
import * as THREE from 'three';
// import fragmentShader from "./fragmentShader.glsl?raw";


const props = defineProps<{
	code?: string;
}>();
const { code } = toRefs(props);

const vertexShader = `
void main()	{
    gl_Position = vec4( position, 1.0 );
}`;

const fragmentShader = `precision mediump float;
uniform float iTime;
uniform vec2 iResolution;
// out vec4 fragColor, in vec2 fragCoord 
void main() {
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
	uv.x *= iResolution.x / iResolution.y;

    // Time varying pixel color
    vec3 col = 0.5 + 0.5 * cos( iTime + uv.xyx + vec3(0,2,4) );

	// vec3 color = vec3(0.6, 0.5, 0.8);
	vec3 color = vec3(0.2);
    // Output to screen
    gl_FragColor = vec4( color, 1.0);
}`;




const container = ref(null as unknown as HTMLDivElement);

// import Stats from 'three/addons/libs/stats.module.js';

const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
const scene = new THREE.Scene();

let sphere, uniforms;

let displacement, noise;

const clock = new THREE.Clock();
const timeUniform = {
	iTime: {
		type: 'f',
		value: 0.1
	},
	iResolution: {
		type: 'v2',
		value: new THREE.Vector2()
	}
};


const material = ref(new THREE.ShaderMaterial({
	uniforms: timeUniform,
	vertexShader,
	fragmentShader,
}));


const water = new THREE.Mesh(
	new THREE.PlaneGeometry(window.innerWidth, window.innerHeight, 40), 
	material.value
);

function init() {
	// camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.x = 20;
	camera.position.y = 10;
	camera.position.z = 20;
	camera.lookAt(scene.position);
	scene.add(camera);
	scene.background = new THREE.Color(0x050505);

	// const water = new THREE.Mesh(
	// 	new THREE.PlaneGeometry(window.innerWidth, window.innerHeight, 40), 
	// 	material.value
	// );
	scene.add(water);

	renderer.setPixelRatio(window.devicePixelRatio);
	// renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.useLegacyLights = false;
	onWindowResize();

	container.value.appendChild(renderer.domElement);
	window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
	const size = container.value.getBoundingClientRect();
	camera.aspect = size.width / size.height;
	camera.updateProjectionMatrix();

	const timeUniform = material.value.uniforms as any;

	timeUniform.iResolution.value.x = size.width;
	timeUniform.iResolution.value.y = size.height;

	renderer.setSize(size.width, size.height);
}

function animate() {
	requestAnimationFrame(animate);
	render();
}

function render() {
	timeUniform.iTime.value += clock.getDelta();
	renderer.render(scene, camera);
}



watch(() => code?.value, (val) => {
	if(val) {
		material.value = new THREE.ShaderMaterial({
			uniforms: timeUniform,
			vertexShader,
			fragmentShader: val || fragmentShader,
		});
		water.material = material.value;
	}
}, { immediate: true });


onMounted(() => {
	init();
	animate();
});

</script>

<style lang="less" scoped></style>
