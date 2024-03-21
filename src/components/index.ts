import oSwitch from "@/components/form/o_switch.vue";
import oSelect from "@/components/form/o_select/select.vue";
import selectCard from "@/components/form/o_select/selectCard.vue";
import oSelectOption from "@/components/form/o_select/option.vue";
import oUpImage from "@/components/form/o_upImage.vue";

// import oModal from "@/components/modal/index.vue";
import oModal from "@/components/modal/modal.vue";
import oModalPopup from "@/components/modal/popup.vue";

// 动画特效类
import eCollapse from "@/components/effects/e_collapse.vue";


import getCode from "@/components/getCode/index.vue";

const components = {
	oSwitch,


	oSelect,
	selectCard,
	oSelectOption,

	eCollapse,

	oModal,
	oModalPopup,
	oUpImage,


	getCode,
}

export default {
	install: (app: any) => {
		Object.entries(components).forEach(([key, component]) => {
		// components.forEach(component => {
			// 在app上进行扩展，app提供 component directive 函数
			// 如果要挂载原型 app.config.globalProperties 方式
			app.component(component.name ?? key, component);
		});
	}
};