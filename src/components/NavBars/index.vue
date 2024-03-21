<template>
	<aside class="bg-white dark:bg-gray-900 w-16 flex-shrink-0 border-r-4 border-primary-200 dark:border-primary-800 flex-col hidden sm:flex">
		<a href="#" class="inline-flex items-center justify-center h-16 w-16">
			<img src="/logo.png" class="h-10 w-10" />
		</a>
		<div class="flex-grow flex flex-col justify-between items-center text-gray-500 bg-gray-800">
			<nav class="flex flex-col items-center my-6 space-y-4">
				<a href="#/" :class="$route.path == '/' ? ['text-primary-600', 'bg-white rounded-lg'] : ['hover:text-gray-400', 'hover:bg-gray-700', 'focus:text-gray-400', 'focus:bg-gray-700']" class="inline-flex items-center justify-center py-3 rounded-lg w-10 h-10">
					<span class="sr-only">Folders</span>
					<!-- <div v-if="nav.meta.icons" v-html="nav.meta.icons"></div> -->
					<svg viewBox="0 0 24 24" class="h-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
						<polyline points="9 22 9 12 15 12 15 22" />
					</svg>
				</a>

				<router-link v-for="nav in navList" :to="`${nav.path}/`" v-slot="{ isActive, href, navigate }">
					<span :data-laber="isActive" :class="isActive ? ['text-primary-600', 'bg-white rounded-lg'] : ['hover:text-gray-400', 'hover:bg-gray-700', 'focus:text-gray-400', 'focus:bg-gray-700']" class="inline-flex items-center justify-center py-3 rounded-lg w-10 h-10">
						<span class="sr-only">{{ nav.meta.title }}</span>
						<div v-html="nav.meta.icons"></div>
					</span>
				</router-link>
			</nav>
			<div class="inline-flex flex-col items-center justify-end h-60 pb-6">
				<button @click="dark" class="p-2 mb-2 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
					<span class="sr-only">Settings</span>
					<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" aria-hidden="true" class="h-7 w-7 dark:hidden">
						<path d="M12.5 10a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
						<path stroke-linecap="round" d="M10 5.5v-1M13.182 6.818l.707-.707M14.5 10h1M13.182 13.182l.707.707M10 15.5v-1M6.11 13.889l.708-.707M4.5 10h1M6.11 6.111l.708.707" />
					</svg>
					<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" stroke="currentColor" class="hidden h-7 w-7 dark:block">
						<path d="M15.224 11.724a5.5 5.5 0 0 1-6.949-6.949 5.5 5.5 0 1 0 6.949 6.949Z" />
					</svg>
				</button>
			</div>
		</div>
	</aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const hideNav = ["/", "/register"];

export default defineComponent({
	name: 'navBar',
	props: {
		userInfo: {
			type: Object,
			default: () => ({})
		}
	},
	data: () => ({

	}),
	methods: {
		dark() {
			document.body.classList.toggle('dark')
		}
	},
	computed: {
		navList(): any {
			// return this.$router.options.routes.filter((nav: any) => nav.meta.nav || nav.meta.nav == undefined)
			console.log(this.$router.options.routes);
			
			return this.$router.options.routes.filter((nav: any) => nav.meta.icons && !hideNav.includes(nav.path))
		}
	}
});
</script>


<style lang="less"></style>
