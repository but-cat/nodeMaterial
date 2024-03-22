<template>
	<node-block :position="`${node!.x},${node!.y}`" :id="`block-${node.uuid}`" @click="emitActiveNode" @connected-down="emit('down', $event)" @connected-up="emit('up')" @connected-update="positionUpdate" :key="`end-${node.uuid}`" :class="isActive ? ['ring-2', 'ring-primary-300'] : []" ref="nodeBlock" class="end-node w-64 bg-white flex flex-col text-gray-700 dark:text-gray-200 rounded-md dark:bg-gray-800 shadow-lg">
		<div class="p-3 h-20 relative">
			<div class="node__holder mb-2 flex align-content">
				<div class="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white pb-2 w-full">{{ node.name }} - {{ node.refIndex }}</div>
				<!-- <div :class="typeColor(node.outputType)" class="text-xs py-1 px-2 leading-none dark:bg-gray-900 rounded-md">{{ node.outputType }}</div> -->
			</div>
		</div>

		<div v-for="(item, index) in node!.input" class="flex-initial h-12 px-3 xl:border-t border-gray-200 dark:border-gray-700 relative">
			<div class="h-full w-full flex items-center">
				{{ item.title }}
			</div>
			<div class="h-full absolute -left-3 t-0 node__in">
				<!-- @connected-change="e => item.out = e.target.getAttribute('out')" -->
				<point-in :id="item.uuid" :type="item.type" :disabled="OuroborosList.has(node) ? 'true' : undefined" :class="typePointColor(item.type)" class="w-2 h-2 border leading-none rounded-full"/>
			</div>
		</div>

		<a @click="emit('del', node.uuid)" @pointerdown.stop class="btn close shadow-md">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon" stroke-width="2">
				<g transform="rotate(-45 50 50)">
					<path d="M50-15.5L50-15.5c0.7,0,1.3,0.5,1.3,1.3V6.7C51.3,7.4,50.7,8,50,8l0,0c-0.7,0-1.3-0.5-1.3-1.3v-20.8 C48.7-14.9,49.3-15.5,50-15.5z" />
					<path d="M39.6-5.1h20.8c0.7,0,1.3,0.5,1.3,1.3l0,0c0,0.7-0.5,1.3-1.3,1.3H39.6c-0.7,0-1.3-0.5-1.3-1.3l0,0 C38.3-4.4,38.9-5.1,39.6-5.1z" />
				</g>
			</svg>
		</a>
	</node-block>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, onMounted, nextTick, toRefs } from 'vue';
import { PointIn, PointOut, NodeBlock } from '@libs/nodeCanvas/nodeCanvas.js';
import { SingleNode, typeColor, typePointColor } from '@/core/node';

const emit = defineEmits(['del', 'down', 'up', 'activeNode']);

const props = defineProps<{
	node: SingleNode;
	OuroborosList: Set<SingleNode>;
	activeNode?: SingleNode;
}>();
const { node, activeNode } = toRefs(props);
const nodeBlock = ref<NodeBlock>();

const isActive = computed(() => activeNode?.value?.uuid === node.value?.uuid);

function emitActiveNode(event: MouseEvent) {
	if (activeNode?.value && activeNode.value === node.value) return;
	event.stopPropagation();
	emit('activeNode', node.value);
}

function positionUpdate() {
	node.value!.x = nodeBlock.value!.x;
	node.value!.y = nodeBlock.value!.y;
}
</script>

<style lang="less" scoped>
// @import url("./style.less");
@socket-size: 16px;

.node__in,
.node__out {
	position: absolute;
	// width: @socket-size;
	height: 100%;
	top: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.node__in {
	left: -(@socket-size / 2);
}

.node__out {
	right: -(@socket-size / 2);
}

point-out,
point-in {
	width: 16px;
	height: 16px;
	margin: 1px 0;
	border-radius: 100%;
	// background: #1e1e1e;
	// border: 1px solid #434343;
	// position: relative;
	// z-index: 100;
}

point-out {
	// background: #f77edd;
}

point-in {
	// background: #bef77e;

	&[disabled] {
		// filter: grayscale(80%);
		filter: grayscale(80%);
	}
}

.node-editor[type='number'] point-in:not([type='number']) {
	filter: grayscale(80%);
}

.node-editor[type='vec4'] point-in:not([type='vec4']) {
	filter: grayscale(80%);
}
 
// .node-editor[type="number"] point-in:not([type="number"]) {
// 	filter: grayscale(80%);
// }

.btn {
	display: inline-block;
	width: 24px;
	height: 24px;
	color: #fff;
	cursor: pointer;
	-webkit-app-region: no-drag;
	transition: color 0.2s;
	margin-left: -5px;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	fill: currentColor;
	padding: 5px;

	opacity: 0;
	position: absolute;
	top: -15px;
	right: -15px;

	&.close:hover {
		color: rgb(235, 84, 84);
		background-color: #fff;
		opacity: 1;
	}

	&.home:hover {
		color: rgb(84, 235, 223);
		background-color: rgba(255, 255, 255, 0.3);
	}

	&[disabled='disabled'] {
		color: #ccc;
		cursor: not-allowed;

		&:hover {
			color: #ccc;
			background-color: transparent;
		}
	}
}
</style>
