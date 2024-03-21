<template>
	<Teleport to="#modal">
		<div class="address_model" :class="open && 'open'" @click.prevent.self="$emit('update:open', false)">
			<transition name="model">
				<div v-if="open" class="model">
					<div class="content">
						<slot />
					</div>
				</div>
			</transition>
		</div>
	</Teleport>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed } from "vue";

export default defineComponent({
	name: "oModalBlock",
	emits: ["update:open"],
	props: {
		open: {
			type: Boolean,
			default: false
		}
	}
});
</script>

<style lang="less" scoped>
.address_model {
	width: 100%;
	// height: 100%;
	position: fixed;
	z-index: 10;
	pointer-events: none;
	transition: all 0.3s;
	box-sizing: border-box;
	padding: 0 32px;

	display: flex;
	justify-content: center;
	align-items: center;

	top: 0;
	right: 0;
	bottom: 0;

	&.open {
		background-color: #24283e88;
		pointer-events: auto;
	}
}

.model {
	width: 100%;
	min-height: 150px;
	position: relative;
	// background-color: white;
	// border-radius: 8px;
	bottom: 0;
	transition: all 0.3s;
	transform: translateY(0%);
	// padding: 0 32px;
	// margin: 0 32px;
	// margin-bottom: 40vw;

	&.model-enter-active, &.model-leave-active {
		transition: all 0.3s;
	}

	&.model-enter-from,
	&.model-leave-to {
		transform: translateY(40%);
		opacity: 0;
	}



	.content {
		width: 100%;
		height: 100%;
		min-height: 150px;
		// padding: 112px 32px 64px;
	}
}
</style>