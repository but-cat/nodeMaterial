<template>
	<div class="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm">
		<!-- <div v-show="!$route.meta.hideTabBar" id="tabBar" class="w-full">
			<NavBar />
		</div> -->
		<NavBar/>
		

		<router-view v-slot="{ Component }">
			<transition name="fade-transform" mode="out-in">
				<component :is="Component" />
			</transition>
		</router-view>

		<NewsBar />
	</div>


	

	<div id="modal"></div>

	<div style="display: none" class="bg-purple-100 text-purple-500 border-purple-500 bg-blue-100 text-blue-500 border-blue-500 bg-green-100 text-green-500 border-green-500 bg-yellow-100 text-yellow-500 border-yellow-500 bg-red-100 text-red-500 border-red-500 bg-gray-100 text-gray-500 border-gray-500"></div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBars/index.vue';
// import TabBar from '@/components/tabBar.vue';
import NewsBar from '@/components/newsBar/index.vue';

import { ref, getCurrentInstance, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

// userInfo

const internalInstance = getCurrentInstance(); // 有效  全局
const globalProperties = internalInstance?.appContext.config.globalProperties;
const $http = globalProperties!.$http;
const $news = globalProperties!.$news;


</script>

<style lang="less">
*,
*:before,
*:after {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}

body {
	// min-width: 1200px;
	margin: 0;
	// padding: 50px;
	color: #eee9dc;
	font: 16px Verdana, sans-serif;
	// user-select: none;
}
</style>