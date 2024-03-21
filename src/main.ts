import { createApp } from 'vue';
import router from './router';

import "@libs/nodeCanvas/nodeCanvas.js";
import OrbitUI from "@libs/butui/index.js";
import '@libs/butui/style.css'

import './style/index.less';
import './style/tailwind.css';

import request from "./utils/request";

import App from './App.vue';


const app = createApp(App);

app.use(router);
app.use(OrbitUI);

app.config.globalProperties.$news = function(text: string, type: number = 0) {
	window.dispatchEvent(new CustomEvent('news', {
		detail: {
			text,
			type
		}
	}));
};

(window as any).$news = function(text: string, type: number = 0) {
	window.dispatchEvent(new CustomEvent('news', {
		detail: {
			text,
			type
		}
	}));
}

app.config.globalProperties.$http = request;
app.mount('#app');
