// vuex.d.ts
import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {

	// provide typings for `this.$store`
	interface ComponentCustomProperties {
		$http: any;
		$refs: any;
		foo: string;
	}
}