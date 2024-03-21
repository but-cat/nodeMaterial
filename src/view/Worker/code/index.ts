import { ref, h, computed, defineComponent, Plugin, watch } from 'vue';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import glsl from 'highlight.js/lib/languages/glsl';
// import 'highlight.js/styles/github.css';
import "highlight.js/styles/codepen-embed.css";
import { escapeHtml } from './utils';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('glsl', glsl);    

export default defineComponent({
	props: {
		code: {
			type: String,
			required: true,
		},
		language: {
			type: String,
			default: '',
		},
		autodetect: {
			type: Boolean,
			default: false,
		},
		ignoreIllegals: {
			type: Boolean,
			default: true,
		},
	},
	setup(props) {
		const language = ref(props.language);
		watch(
			() => props.language,
			(newLanguage) => {
				language.value = newLanguage;
			}
		);

        (window as any).hljs = hljs;

		const autodetect = computed(() => props.autodetect && !language.value);
		const cannotDetectLanguage = computed(() => !autodetect.value && !hljs.getLanguage(language.value));

		const className = computed((): string => {
			if (cannotDetectLanguage.value) {
				return '';
			} else {
				return `hljs ${language.value}`;
			}
		});

		const highlightedCode = computed((): string => {
			// No idea what language to use, return raw code
			if (cannotDetectLanguage.value) {
				console.warn(`The language "${language.value}" you specified could not be found.`);
				return escapeHtml(props.code);
			}

			if (autodetect.value) {
				const result = hljs.highlightAuto(props.code);
				language.value = result.language ?? '';
				return result.value;
			} else {
				const result = hljs.highlight(props.code, {
					language: language.value,
					ignoreIllegals: props.ignoreIllegals,
				});
				return result.value;
			}
		});

		return {
			className,
			highlightedCode,
		};
	},
	render() {
		return h('pre', { style: { flex: 1, overflow: 'auto' }, }, [
			h('code', {
				class: this.className,
				innerHTML: this.highlightedCode,
				tabindex: '0',
				style: { minHeight: '100%', flex: 1 },
			}),
		]);
	},
});