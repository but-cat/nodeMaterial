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
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import fragmentShader from "./fragmentShader.glsl?raw";
import vertexShader from "./vertexShader.glsl?raw";
import fragmentShader from "./fragmentShader.glsl?raw";

const props = defineProps<{
	code?: string;
}>();
const { code } = toRefs(props);


const container = ref(null as unknown as HTMLDivElement);

const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
const scene = new THREE.Scene();
const controls = new OrbitControls( camera, renderer.domElement );

// let sphere, uniforms;
// let displacement, noise;

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

const lambert = new THREE.MeshLambertMaterial({ color: 0xffffff });
const sceneLight = new THREE.AmbientLight(0x404040, 2);
const sceneLight2 = new THREE.DirectionalLight(0xffffff, 1.0);
sceneLight2.position.set(10, 10, 10);


const radius = 50,
		segments = 128,
		rings = 64;
const water = new THREE.Mesh(
	// new THREE.PlaneGeometry(window.innerWidth, window.innerHeight, 40), 
	new THREE.SphereGeometry(radius, segments, rings),
	material.value
);


// THREE.WebGLRenderer

function init() {
	camera.position.z = 300;
	camera.lookAt(scene.position);

	scene.add(camera);
	scene.background = new THREE.Color(0x050505);

	scene.add(sceneLight);
	scene.add(sceneLight2);

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
	controls.update();
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
	


	const loader = new GLTFLoader();
	loader.load('/material_ball_v2.glb', (gltf) => {
		const model = gltf.scene;
		model.scale.set(0.5, 0.5, 0.5);
		model.position.set(0, -10, 0);
		model.traverse((child) => {
			const nameList: string[] = ['', '', 'MaterialSphere'];
			if (child instanceof THREE.Mesh && nameList.includes(child.name)) {
				(child as THREE.Mesh).material = material.value;
			} else {
				(child as THREE.Mesh).material = lambert;
			}
		});
		scene.add(model);

		init();
		animate();
	});
});

</script>

<style lang="less" scoped></style>
