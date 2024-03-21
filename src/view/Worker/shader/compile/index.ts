import ejs from "ejs";
import { SingleNode } from '@/core/node';

import template from './shaderToy.ejs?raw';

interface CompileNodeSet {
	NodeList: SingleNode[];
	connectedList: any;
}

export function compileCode(compileNodeSet: CompileNodeSet) {
	try {
		let NodeList = compileNodeSet.NodeList;
		NodeList = NodeList.sort((a, b) => b.refIndex - a.refIndex);


		let ConnectedList = [...compileNodeSet.connectedList.entries()];
		ConnectedList = ConnectedList.sort((a, b) => b[0].refIndex - a[0].refIndex);
		
		const params = {
			NodeList,
			ConnectedList,
			endNode: ConnectedList[ConnectedList.length - 1][0]
		};
		console.log(params);
		
		const html = ejs.render(template, params);
		
		return html;
	} catch (error) {
		// alert(error);
		console.error(error);
		throw error;
	}
}