import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dotenv from "dotenv";
import { resolve, dirname } from "upath";
import path from "path";



console.log("development", process.env.NODE_ENV === 'development');



// https://vitejs.dev/config/
export default defineConfig({
	base: "./",
	publicDir: "public",// 作为静态资源服务的文件夹。该目录中的文件在开发期间在 / 处提供，并在构建期间复制到 outDir 的根目录，并且始终按原样提供或复制而无需进行转换。该值可以是文件系统的绝对路径，也可以是相对于项目的根目录的相对路径。
	plugins: [vue({
		template: {
			compilerOptions: {
				isCustomElement: tag => ['node-canvas', 'node-container', 'node-block', 'point-in', 'point-out'].includes(tag)
			}
		}
	})],//需要用到的插件数组。Falsy 虚值的插件将被忽略，插件数组将被扁平化（flatten）。查看 插件 API 获取 Vite 插件的更多细节。


	resolve: {
		alias: {
			"@root": path.resolve(__dirname, ""),
			"@": path.resolve(__dirname, "src"),
			"@libs": path.resolve(__dirname, "libs"),
		},
	},

	server: {
		port: 3900,
		cors: true,
		proxy: {
			// 使用 proxy 实例
			'/_dev_': {
				target: 'http://localhost:9870',
				changeOrigin: true,
				rewrite: (path) => {	
					console.log(path);
					return path
				},
			},
			'/test': {
				target: 'http://localhost:9870',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/test/, ''),
			},
		},
	},


	css: {
		// css预处理器
		preprocessorOptions: {
			less: {
				charset: false,
				additionalData: '@import "./src/style/index.less";',
			},
		},
	},

})
