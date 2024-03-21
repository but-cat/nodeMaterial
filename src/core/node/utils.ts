export function getUUID() {
	return 'xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		let r = (Math.random() * 16) | 0,
			v = c == 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

export function typeColor(stage: string) {
	return {
		vec2: 'bg-purple-100 text-purple-500',													// 功能不完整的版本
		vec3: 'bg-blue-100 text-blue-500',												// 发布候选版本
		vec4: 'bg-green-100 text-green-500',														// 稳定版本
		// number: 'bg-yellow-100 text-yellow-500',														// 公开测试
		float: 'bg-yellow-100 text-yellow-500',														// 公开测试
		boolean: 'bg-red-100 text-red-500',															// 内部测试
		Inactive: 'bg-gray-100 text-gray-500',														// 不再维护
	}[stage];
}


// export function typePointColor(stage: string) {
// 	return {
// 		vec2: 'bg-purple-100 border border-purple-500',													// 功能不完整的版本
// 		vec3: 'bg-blue-100 border border-blue-500',												// 发布候选版本
// 		vec4: 'bg-green-100 border border-green-500',														// 稳定版本
// 		number: 'bg-yellow-100 border border-yellow-500',														// 公开测试
// 		boolean: 'bg-red-100 border border-red-500',															// 内部测试
// 		Inactive: 'bg-gray-100 border border-gray-500',														// 不再维护
// 	}[stage];
// }


export function typePointColor(stage: string) {
	return {
		vec2: 'bg-purple-100 border border-purple-500',													// 功能不完整的版本
		vec3: 'bg-blue-100 border border-blue-500',												// 发布候选版本
		vec4: 'bg-green-100 border border-green-500',														// 稳定版本
		// number: 'bg-yellow-100 border border-yellow-500',														// 公开测试
		float: 'bg-yellow-100 border border-yellow-500',														// 公开测试
		boolean: 'bg-red-100 border border-red-500',															// 内部测试
		Inactive: 'bg-gray-100 border border-gray-500',														// 不再维护
	}[stage];
}