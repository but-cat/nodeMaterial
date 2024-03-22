<template>
	<div class="w-full bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm">
		<!-- <navigation /> -->
		<div class="flex-grow overflow-hidden h-full flex flex-col">
			<div class="h-12 lg:flex w-full border-b border-gray-200 dark:border-gray-800 hidden px-10">
				<div class="flex h-full text-gray-600 dark:text-gray-400">
					<a @click="nodeType = ''" :class="!nodeType ? ['border-primary-500', 'text-primary-500', 'dark:text-white', 'dark:border-white'] : ['border-transparent']" class="cursor-pointer h-full border-b-2  inline-flex mr-8 items-center">全部</a>
					<a v-for="item in nodeTypeList" @click="nodeType = item" :class="nodeType == item ? ['border-primary-500', 'text-primary-500', 'dark:text-white', 'dark:border-white'] : ['border-transparent']" class="cursor-pointer h-full border-b-2  inline-flex mr-8 items-center">{{ item }}</a>
					
				</div>
				<div class="ml-auto flex items-center space-x-7">
					<button @click="save" class="h-8 px-3 rounded-md shadow text-white bg-primary-500">保存</button>
					<button @click="read" class="h-8 px-3 rounded-md shadow text-white bg-primary-500">读取</button>
					<button @click="compile" class="h-8 px-3 rounded-md shadow text-white bg-primary-500">编译</button>
					<button disabled class="h-8 px-3 rounded-md shadow text-white bg-primary-500 disabled:bg-primary-400 disabled:dark:bg-primary-600">导出</button>
					<!-- <button @click="sidebar = 'codeView'" class="h-8 px-3 rounded-md shadow text-white bg-primary-500">代码</button>
					<button @click="sidebar = 'material'" class="h-8 px-3 rounded-md shadow text-white bg-primary-500">材质预览</button> -->
				</div>
			</div>
			<div class="flex-grow flex overflow-x-auto flex-1">
				<Nodelist @nodeTypeUpdate="data =>  nodeTypeList = data" :nodeType="nodeType"/>
				<div @click="activeNode = undefined" class="flex-grow bg-gray-50 dark:bg-gray-900 overflow-y-auto flex">
					<NodeEditor :activeNode="activeNode" @activeNode="node => activeNode = node" ref="NodeView" />
				</div>
				<div v-if="sidebar" class="h-full overflow-hidden relative" style="flex: 0 0 420px;">
					<div class="w-full h-full overflow-hidden flex flex-col ">
						<!-- <ShaderToy :code="shaderString"></ShaderToy> -->
						<MaterialView :code="shaderString"></MaterialView>
						<highlightjs v-if="!activeNode" :code="shaderString" language="glsl"></highlightjs>

						<div v-else class="w-full flex-1 p-4 space-y-4 overflow-auto ">
							<h1 class="mb-4 text-xl font-extrabold tracking-tight text-slate-900">{{ activeNode.name }}</h1>

							<div v-for="item in activeNode.input" class="flex items-center">
								<span class="w-12">{{ item.name }}</span>
								<input @input="compile" v-model="item.default" class="flex-1 ml-2 flex items-center justify-between rounded-md bg-white px-3 py-2 shadow-sm ring-1 ring-slate-700/10">
							</div>

							<div class="h-72 p-2 rounded-md overflow-auto border border-dashed border-gray-400" v-html="md(activeNode.doc)">
							</div>

							<div class="h-72 rounded-md overflow-auto">
								<highlightjs :code="activeNode.code" language="glsl"></highlightjs>
							</div>
						</div>
					</div>

					<a @click="(sidebar = false) || (activeNode = undefined)" @pointerdown.stop class="btn close shadow-md absolute right-6 top-6">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon" stroke-width="2">
							<g transform="rotate(-45 50 50)">
								<path d="M50-15.5L50-15.5c0.7,0,1.3,0.5,1.3,1.3V6.7C51.3,7.4,50.7,8,50,8l0,0c-0.7,0-1.3-0.5-1.3-1.3v-20.8 C48.7-14.9,49.3-15.5,50-15.5z" />
								<path d="M39.6-5.1h20.8c0.7,0,1.3,0.5,1.3,1.3l0,0c0,0.7-0.5,1.3-1.3,1.3H39.6c-0.7,0-1.3-0.5-1.3-1.3l0,0 C38.3-4.4,38.9-5.1,39.6-5.1z" />
							</g>
						</svg>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref, getCurrentInstance, onMounted } from 'vue';
import { MyButton } from '@libs/butui/index';

import md from "md";


import { SingleNode, typeColor, typePointColor } from '@/core/node';

import Nodelist from './Nodelist/index.vue';
import NodeEditor from './NodeBlock/index.vue';
import NodeEditorType from './NodeBlock/NodeEditor.d';

import highlightjs from './code/index';

import MaterialView from './material/index.vue';
// import { compileCode } from './material/compile/index';

import ShaderToy from './shader/index.vue';
import { compileCode } from './shader/compile/index';

const NodeView = ref<NodeEditorType>(null as unknown as NodeEditorType);

const activeNode = ref<SingleNode | undefined>(undefined);
const sidebar = ref(false);
const shaderString = ref('');

const nodeTypeList = ref([]);
const nodeType = ref('');

function compile() {
	// const list = NodeView.value.connectedList();
	sidebar.value = true;
	const nodeList = NodeView.value!.compile();

	console.log('sortTree', NodeView.value!.compile());

	const code = compileCode(nodeList);
	shaderString.value = code;
}

const filename = 'node_data.json';
const link = document.createElement('a');
function save() {
	const data = NodeView.value!.save();
	const blob = new Blob([data], { type: 'text/plain' })
	
	if (link.href) URL.revokeObjectURL(link.href);

	link.href = URL.createObjectURL(blob);
	link.download = filename || 'data.json';
	link.dispatchEvent(new MouseEvent('click'));
}

function read() {
	// const  data = `{"nodes":[{"name":"输出 - float","refCount":0,"refIndex":0,"uuid":"bc73b2c7_7110_469e_85b1_2155d87fb61d","funName":"628ab4b314a0","x":1172,"y":671,"type":"end-node","disabled":false,"outputType":"float","input":[{"uuid":"4ef6596f_7021_4414_baf6_3e8c94846f70","name":"data1","type":"float","title":"输出数字","default":"10","value":10}],"code":"\n        return data1;\n    ","functionName":""},{"name":"数值 - float","refCount":0,"refIndex":0,"uuid":"9e6c52f7_ca19_43b9_ae0f_f6426f7dcd69","funName":"e0d065dcb3a5","x":271,"y":396,"type":"start-node","disabled":false,"outputType":"float","input":[{"uuid":"6d25f7b1_24aa_4445_9fb0_6d8fe466d8b0","name":"data1","type":"float","title":"未命名","default":"10","value":10},{"uuid":"036ffa64_cf30_4968_aa57_3bb69a06b47f","name":"data2","type":"float","title":"未命名","default":"10","value":10}],"code":"\n        return data1 + data2;\n    ","functionName":""},{"name":"加法节点","refCount":0,"refIndex":0,"uuid":"afc93726_6924_471f_b8c2_38f266203791","funName":"d78d7d1a5567","x":729,"y":174,"type":"node","disabled":false,"outputType":"float","input":[{"uuid":"7ab19c87_fe23_4377_9d14_d4cc3af614ad","name":"data1","type":"float","title":"参数1","default":"10","value":10},{"uuid":"4ef7894a_c221_4fe2_b5c7_18aec9c39a12","name":"data2","type":"vec2","title":"参数2","default":"10","value":10}],"code":"\n        return data1 + data2;\n    ","functionName":""}],"connected":[["7ab19c87_fe23_4377_9d14_d4cc3af614ad","9e6c52f7_ca19_43b9_ae0f_f6426f7dcd69"],["4ef6596f_7021_4414_baf6_3e8c94846f70","afc93726_6924_471f_b8c2_38f266203791"]]}`;
	// NodeView.value!.load(data);

	const input = document.createElement('input');
	input.type = 'file';
	// input.setAttribute('multiple', 'multiple');
	input.addEventListener('change', function (event: any) {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = function (e) {
			const data = e.target!.result as string;
			NodeView.value!.load(data);
		};
		reader.readAsText(file);
	});
	input.click();
}
</script>


<style lang="less" scoped>


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

	// opacity: 0;
	// position: absolute;
	// top: -15px;
	// right: -15px;

	color: rgb(235, 84, 84);
	background-color: #fff;

	&.home:hover {
		color: rgb(84, 235, 223);
		// background-color: rgba(255, 255, 255, 0.3);
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