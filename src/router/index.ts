import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home/index.vue';
import Login from '../views/Home/login.vue';

import PageList from "@/view/router";

const routes: Array<RouteRecordRaw> = [


	...PageList,


	{
		path: '/:pathMatch(.*)',																								// 会匹配所有路径
		name: 'on',
		component: () => import(/* webpackChunkName: "about" */ './404.vue'),
		meta: {
			title: "404",
			nav: false
		},
	}


]

const router = createRouter({
	// history: createWebHistory(''),
	history: createWebHashHistory(''),
	routes
});

// console.log("BASE_URL", process.env.VUE_APP_BASE_API);


export default router;
