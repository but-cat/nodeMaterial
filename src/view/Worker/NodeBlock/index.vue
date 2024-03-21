<template>
	<node-container @dragover="(event: any) => event.preventDefault()" @drop="dragover"
		class="w-full h-full overflow-hidden">
		<node-canvas ref="nodeCanvas" class="material-node node-editor relative">
			<!-- <NodeBlock v-for="[uuid, item] in nodes" :node="item" /> -->

			<template v-for="[uuid, node] in nodes">
				<!-- <Node v-if="node.type === 'node'" :node="node" :OuroborosList="OuroborosList" @down="inheritCollect"
					@up="inheritCollect" @del="delNode" :activeNode="activeNode" v-bind="$attrs"/>
				<StartNode v-else-if="node.type === 'start-node'" :node="node" @down="inheritCollect" @up="inheritCollect"
					@del="delNode" :activeNode="activeNode" v-bind="$attrs"/>
				<EndNode v-else-if="node.type === 'end-node'" :node="node" :OuroborosList="OuroborosList"
					@down="inheritCollect" @up="inheritCollect" @del="delNode" :activeNode="activeNode" v-bind="$attrs"/> -->
				<Node v-if="node.type === 'node'" :node="node" :OuroborosList="OuroborosList" @down="inheritCollect"
					@up="inheritCollect" @del="delNode" v-bind="$attrs"/>
				<StartNode v-else-if="node.type === 'start-node'" :node="node" @down="inheritCollect" @up="inheritCollect"
					@del="delNode" v-bind="$attrs"/>
				<EndNode v-else-if="node.type === 'end-node'" :node="node" :OuroborosList="OuroborosList"
					@down="inheritCollect" @up="inheritCollect" @del="delNode" v-bind="$attrs"/>
			</template>
		</node-canvas>
	</node-container>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, computed, onMounted, nextTick, getCurrentInstance } from 'vue';

import NodeCanvasCore, { PointIn, PointOut } from '@libs/nodeCanvas/nodeCanvas.js';
import { nodelist, connectedList } from '@/core/node/data';
import { SingleNode, SingleNodeJSON, getUUID, NodeTemplate } from '@/core/node';

import StartNode from './startNode.vue';
import EndNode from './endNode.vue';
import Node from './node.vue';

// const props = defineProps<{
// 	activeNode?: SingleNode;
// }>();
// const { activeNode } = toRefs(props);

const internalInstance = getCurrentInstance(); // 有效  全局
const globalProperties = internalInstance?.appContext.config.globalProperties;
const $http = globalProperties!.$http;


const nodeCanvas = ref(null as unknown as NodeCanvasCore);

const nodes = reactive(new Map(nodelist.map((item) => [item.uuid, new SingleNode(item)])) as Map<string, SingleNode>);
const connected = reactive(connectedList as string[][]);

function setNodes(node: SingleNode) {
	nodes.set(node.uuid, node);
	// setTimeout(() => {
	// 	nodes.forEach((node) => (node.refCount = 0));
	// 	dagSort('block-23dc9b1d-2538-4dcf-99b2-d1018e14ef79');
	// }, 500);
}

function delNodes(node: SingleNode) {
	nodes.delete(node.uuid);
	// setTimeout(() => {
	// 	dagSort('block-23dc9b1d-2538-4dcf-99b2-d1018e14ef79');
	// }, 500);
}

/**
 * 引用排序
 * @param uuid
 */
function dagSort(uuid: string) {
	function _recursion(pointUUID: string, index: number = 0) {
		const nodeUUID = pointUUID.replace(/block\-/, '');
		const node = nodes.get(nodeUUID)!;

		const pointBlock = document.getElementById(pointUUID)!;
		const pointIn_List = pointBlock.querySelectorAll('point-in');

		node.refIndex = index + node.refCount;
		node.refCount += 1;

		pointIn_List.forEach((pointIn) => {
			if (pointIn.hasAttribute('out')) _recursion(`block-${pointIn.getAttribute('out')}`, index + 1);
		});
	}

	nodes.forEach((node) => (node.refCount = 0));
	if (uuid) _recursion(uuid);
}

const OuroborosList = reactive(new Set() as Set<SingleNode>);
/**
 * 收集所有的闭环
 * @param node_uuid
 */
function inheritCollect(event?: any) {
	const node_uuid = event?.detail.pointOut.uuid;

	function _recursion(pointUUID: string) {
		const nodeUUID = pointUUID.replace(/block\-/, '');
		const node = nodes.get(nodeUUID)!;
		OuroborosList.add(node);

		const pointBlock = document.getElementById(`block-${pointUUID}`);
		if (!pointBlock) return;
		const pointIn_List = pointBlock.querySelectorAll('point-in');

		// for (let index = 0; index < pointIn_List.length; index++) {
		// 	const pointIn = pointIn_List[index];
		// 	if(pointIn.hasAttribute('out')) return _recursion(`block-${pointIn.getAttribute('out')}`);
		// }
		pointIn_List.forEach((pointIn) => {
			if (pointIn.hasAttribute('out')) _recursion(pointIn.getAttribute('out')!);
		});
	}

	if (node_uuid) {
		const node = nodes.get(node_uuid)!;
		OuroborosList.add(node);
		_recursion(node_uuid);
	} else {
		OuroborosList.clear();
	}

	console.log('inheritCollect', OuroborosList.size, OuroborosList);
}


onMounted(() => {
	connected.forEach((item) => {
		const [from, to] = item;
		nodeCanvas.value!.connectedTo(document.getElementById(from)! as PointIn, document.getElementById(to)! as PointOut);
	});

	// dagSort('block-23dc9b1d-2538-4dcf-99b2-d1018e14ef79');
});

async function dragover(event: DragEvent) {
	event.preventDefault();
	// const eventNode = event.eventTarget;
	const nodeUrl = event.dataTransfer!.getData('text/plain');

	console.log('dragover', event, nodeUrl);
	// const { offsetX, offsetY } = event;

	const res = await $http.get(nodeUrl);
	const nodeTemplates = new NodeTemplate(res as string);
	console.log('nodeTemplates', res, nodeTemplates);

	const node = new SingleNode(nodeTemplates);
	node.x = event.offsetX;
	node.y = event.offsetY;
	console.log('node', node);


	setNodes(node);
}

function delNode(uuid: string) {
	console.log('delNode', uuid);

	const nodeBlock = document.getElementById(`block-${uuid}`)!;

	const connectedList = nodeCanvas.value!.connectedList;
	const delConnectedList = nodeCanvas.value!.getConnectedList(nodeBlock?.querySelectorAll('point-in, point-out'));

	console.log('connectedList', connectedList);
	console.log('delConnectedList', delConnectedList);

	delConnectedList.forEach((item) => {
		const [pointIn, pointOut] = item;
		const delIndex = connectedList.findIndex((item) => item[0] === pointIn && item[1] === pointOut);
		connectedList.splice(delIndex, 1);
	});

	// nodes.delete(uuid);
	delNodes(nodes.get(uuid)!);

	nextTick(() => {
		connectedList.forEach((item) => {
			const [pointIn, pointOut] = item;
			console.log(pointIn, pointOut);

			nodeCanvas.value!.connectedTo(document.getElementById(pointIn)! as PointIn, document.getElementById(pointOut)! as PointOut);
		});
	});
}



function compile() {
	const list: Set<SingleNode> = new Set();
	const inputList: Map<SingleNode, string[]> = new Map();
	function _recursion(pointUUID: string, index: number = 0) {
		const nodeUUID = pointUUID.replace(/block\-/, '');
		const node = nodes.get(nodeUUID)!;

		const pointBlock = document.getElementById(pointUUID)!;
		const pointIn_List = pointBlock.querySelectorAll('point-in');

		node.refIndex = index + node.refCount;
		node.refCount += 1;

		list.add(node);

		if(pointIn_List) inputList.set(node, []);
		pointIn_List.forEach((pointIn) => {
			if (pointIn.hasAttribute('out')) {
				inputList.get(node)?.push(pointIn.getAttribute('out')!);
				_recursion(`block-${pointIn.getAttribute('out')}`, index + 1);
			} else {
				inputList.get(node)?.push('');
			}
		});
	}

	const uuid = document.querySelector('.end-node')?.getAttribute('id') || '';

	nodes.forEach((node) => (node.refCount = 0));
	// if (uuid) 
	console.log('compile', uuid);
	
	_recursion(uuid);
	
	// return [...list].sort((a, b) => b.refIndex - a.refIndex);

	// const NodeList = [...list].sort((a, b) => b.refIndex - a.refIndex);


	return {
		NodeList: [...list],
		connectedList: inputList,
	};
}



function save() {

	console.log([...nodes.values()]);
	
	

	return JSON.stringify({
		nodes: [...nodes.values()],
		connected: nodeCanvas.value!.connectedList,
	});
}

function load(file: string) {
	const { nodes, connected } = JSON.parse(file.replace(/\n/g, "\\n"));

	console.log(file);
	

	nodes.forEach((item: SingleNode) => {
		const node = new SingleNode(item);
		setNodes(node);
	});


	nextTick(() => {
		connected.forEach((item: string[]) => {
			const [from, to] = item;
			nodeCanvas.value!.connectedTo(document.getElementById(from)! as PointIn, document.getElementById(to)! as PointOut);
		});
	});
}


defineExpose({ compile, save, load });
</script>

<style lang="less" scoped>
// @import url("./style.less");
@socket-size: 16px;

.material-node {
	width: 3000px;
	height: 2000px;

	position: relative;
	overflow: hidden;
	display: block;
	/* border-left: 1px solid var(--divider); */
	/* background-color: var(--background); */

	/* width: 100%;
	height: 100%; */
	/* background-image: url(assets/tile.png); */
	background-repeat: repeat;
	background-size: 30px 30px;
	/* background-color: #fbfbfb; */

	@grid_line: #171f2f32;

	yellow: rgb(255, 251, 0);

	background: linear-gradient(to right, transparent 48%, @grid_line 49%, @grid_line 50%, transparent 51%), linear-gradient(to bottom, transparent 48%, @grid_line 49%, @grid_line 50%, transparent 51%);
	background-size: 50px 50px;
}

node-container[active] * {
	pointer-events: none;
}</style>