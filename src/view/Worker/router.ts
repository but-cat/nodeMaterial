const User_icons = `<svg viewBox="0 0 24 24" class="h-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
<rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
<path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
</svg>`

export default {
	path: '/',
	name: 'Worker',
	meta: {
		title: "工作区",
		icons: User_icons,
		nav: false,
		hideTabBar: true,
	},
	component: () => import('@/view/Worker/index.vue'),
}



