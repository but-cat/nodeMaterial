<template>
	<div class="xl:w-72 w-48 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto lg:block hidden p-5">
		<div class="text-xs text-gray-400 tracking-wider">NODES</div>
		<div class="relative mt-2">
			<input type="text" class="pl-8 h-9 bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white w-full rounded-md text-sm" placeholder="Search" />
			<svg viewBox="0 0 24 24" class="w-4 absolute text-gray-400 top-1/2 transform translate-x-0.5 -translate-y-1/2 left-2" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
				<circle cx="11" cy="11" r="8"></circle>
				<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
			</svg>
		</div>
		<div class="space-y-4 mt-3">
			<button v-for="item in filterNodeList" draggable="true" @dragstart="dragstart($event, url)" :data-url="url" class="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow focus:outline-none">
				<div class="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white pb-2 mb-2 xl:border-b border-gray-200 border-opacity-75 dark:border-gray-700 w-full">
					{{ item.name }}
				</div>
				<div class="flex items-center w-full">
					<div :class="typeColor(item.returnType)" class="text-xs py-1 px-2 leading-none dark:bg-gray-900 rounded-md">{{ item.returnType }}</div>
					<div class="ml-auto text-xs text-gray-500">{{ item.nodeType }}</div>
				</div>
			</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, watch, onMounted, getCurrentInstance } from 'vue';
import { NodeTemplate } from '@/core/node';
// import shaderString from './node/add.xml?raw';

import { typeColor } from '@/core/node';

const internalInstance = getCurrentInstance(); // 有效  全局
const globalProperties = internalInstance?.appContext.config.globalProperties;
const $http = globalProperties!.$http;

const emit = defineEmits(['nodeTypeUpdate']);

const props = defineProps({
	nodeType: String,
});

const nodeList = reactive(new Map() as Map<string, NodeTemplate>);

const filterNodeList = computed(() => {
	if(!props.nodeType) return Array.from(nodeList.values());
	
	return Array.from(nodeList.values()).filter((item) => item.nodeType === props.nodeType);
});

async function getData() {
	const res = await $http.get('node/list.json');

	console.log(res);

	const nodeTemplateList = res.map(async (item: any) => {
		const res = await $http.get(item.url);
		nodeList.set(item.url, new NodeTemplate(res));
	});

	await Promise.all(nodeTemplateList);

	console.log(nodeList);
	

	const nodeTypeList = Array.from(nodeList.values()).map((item) => item.nodeType);
	emit('nodeTypeUpdate', [...new Set(nodeTypeList)]);
}




function dragstart(event: DragEvent, url: string) {
	event.dataTransfer!.effectAllowed = 'move';
	// event.dataTransfer!.setData('text/plain', '放进来了');
	event.dataTransfer!.setData('text/plain', url);
}

onMounted(() => {
	// nodeList.push(new NodeTemplate(shaderString));
	getData();
});
</script>

<style lang="less" scoped>
.material-node {
	position: relative;
	overflow: hidden;
	/* border-left: 1px solid var(--divider); */
	/* background-color: var(--background); */

	/* width: 100%;
	height: 100%; */
	/* background-image: url(assets/tile.png); */
	background-repeat: repeat;
	background-size: 30px 30px;
	/* background-color: #fbfbfb; */

	@grid_line: #171f2f;

	yellow: rgb(255, 251, 0);

	background: linear-gradient(to right, transparent 48%, @grid_line 49%, @grid_line 50%, transparent 51%), linear-gradient(to bottom, transparent 48%, @grid_line 49%, @grid_line 50%, transparent 51%);
	background-size: 50px 50px;
}

.node-editor[type='number'] point-in:not([type='number']) {
	opacity: 0.3;
}

.node-editor[type='vec4'] point-in:not([type='vec4']) {
	opacity: 0.3;
}

// .node-editor[type="number"] point-in:not([type="number"]) {
// 	opacity: 0.3;
// }
</style>