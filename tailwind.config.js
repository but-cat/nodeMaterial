const colors = require('tailwindcss/colors');

module.exports = {
	important: false,
	darkMode: "class",													// 基于类的主动暗模式
	// i18n: {
	// 	locales: ["en-US"],
	// 	defaultLocale: "en-US",
	// },
	purge: {
		content: ["./src/**/*.vue", "./src/**/*.vue"],					// 这些选项直接传递给PurgeCSS
	},
	theme: {
		// extend: {
		// 	backgroundImage: (theme) => ({
		// 		check: "url('/icons/check.svg')",
		// 		landscape: "url('/images/landscape/2.jpg')",
		// 	}),
		// },
		extend: {
			// backgroundImage: (theme) => ({
			// 	check: "url('/icons/check.svg')",
			// 	landscape: "url('/images/landscape/2.jpg')",
			// }),
			spacing: {
				'100': '28rem',
				'150': '32rem',
				'200': '42rem',
				'250': '48rem',
				'300': '56rem',
				'350': '64rem',
				'400': '72rem',
			}
		},

		colors: {
			'theme': {
				100: '#cffafe',
				200: '#a5f3fc',
				300: '#67e8f9',
				400: '#22d3ee',
				500: '#06b6d4',
				600: '#0891b2',
				700: '#0e7490',
				800: '#155e75',
				900: '#164e63',
				light: '#67e8f9',
				DEFAULT: '#06b6d4',
				dark: '#0e7490',
			},
			'primary': {
				100: '#e6fffa',
				200: '#b2f5ea',
				300: '#81e6d9',
				400: '#4fd1c5',
				500: '#38b2ac',
				600: '#319795',
				700: '#2c7a7b',
				800: '#285e61',
				900: '#234e52',
				light: '#81e6d9',
				DEFAULT: '#38b2ac',
				dark: '#2c7a7b',
			},

			'dark': {
				"0": "#f7f5f5",
				"100": "#e6e6e6",
				"200": "#cccccc",
				"300": "#b3b3b3",
				"400": "#999999",
				"500": "#808080",
				"600": "#666666",
				"700": "#4d4d4d",
				"800": "#191919",// 333333
				"900": "#111111",
				light: '#bcccdc',
				DEFAULT: '#829ab1',
				dark: '#627d98',
			},


			transparent: 'transparent',
			slate: colors.slate,
			gray: colors.gray,
			zinc: colors.zinc,
			neutral: colors.neutral,
			stone: colors.stone,
			red: colors.red,
			orange: colors.orange,
			amber: colors.amber,
			yellow: colors.yellow,
			lime: colors.lime,
			green: colors.green,
			emerald: colors.emerald,
			teal: colors.teal,
			cyan: colors.cyan,
			sky: colors.sky,
			blue: colors.blue,
			indigo: colors.indigo,
			violet: colors.violet,
			purple: colors.purple,
			fuchsia: colors.fuchsia,
			pink: colors.pink,
			rose: colors.rose,
			// primary: colors.blue,
			// secondary: colors.gray,

			// current: 'currentColor',
			// black: colors.black,
			white: colors.white,
			// gray: colors.gray,
			// emerald: colors.emerald,
			// indigo: colors.indigo,
			// yellow: colors.yellow,

		}
	},
	variants: {
		extend: {
			backgroundColor: ["checked"],
			borderColor: ["checked"],
			inset: ["checked"],
			zIndex: ["hover", "active"],

			colors: {
				'regal-blue': '#243c5a',
			},
		},
	},
	plugins: [],
	future: {
		purgeLayersByDefault: true,
	},
};