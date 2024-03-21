import { getUUID } from "./utils";

export class NodeTemplate {


	name: string;

	type: string;

	// params: string;
	nodeType: string;

	code: string = '';

	returnType: string;

	x: number = 0;
	y: number = 0;

	nodeTemplate: Element;

	input: {
		uuid: string;
		type: string;
		name: string;
		title: string;
		value: number;
		default: string;
		out?: string;
	}[] = [];


	doc: string = '';



	
	
	constructor(source: string) {
		const template = document.createElement('template');
		template.innerHTML = source;
		template.content.normalize();
		const nodeTemplate = template.content.firstElementChild;
		this.nodeTemplate = template.content.firstElementChild!;
		// console.log("-----nodeTemplate", template.content.firstElementChild);

		this.name = nodeTemplate?.querySelector('name')?.innerHTML || '未命名';

		this.nodeType = nodeTemplate?.querySelector('type')?.innerHTML || '未命名';

		this.type = nodeTemplate?.getAttribute('type') || 'node';

		this.code = nodeTemplate?.querySelector('code')?.innerHTML || '未命名';
		this.returnType = nodeTemplate?.querySelector('code')?.getAttribute('return') || '未命名';

		this.doc = nodeTemplate?.querySelector('doc')?.innerHTML || '';


		const params = nodeTemplate?.querySelector('params')?.children!;
		// console.log("params", params);

		for (let i = 0; i < params.length; i++) {
			const param = params[i];
			this.input.push({
				uuid: getUUID(),
				name: param.localName,
				type: param.getAttribute('type') || 'number',
				title: param.getAttribute('name') || '未命名',
				default: param.getAttribute('default') ? param.getAttribute('default')! : '0',
			
				value: param.getAttribute('default') ? Number(param.getAttribute('default')!) : 0,
			});
		}

		// {
		// 	uuid: getUUID(),
		// 	type: 'number',
		// 	name: 'Yes',
		// 	value: 0,
		// },
	}
	
	
	// eachNode(template.content, (node) => {
	// 	if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) return true;
	// 	if (node.nodeType !== Node.ELEMENT_NODE) node.parentNode?.removeChild(node);
	// 	return true;
	// });

	// if (template.content.firstElementChild && template.content.firstElementChild.localName == Scene3D.tagName) {
	// 	const scene = template.content.firstElementChild as Scene3D;
	// 	[...scene!.attributes].forEach((attributes, index, that) => {
	// 		if (attributes.name == 'src') return;
	// 		this.setAttribute(attributes.name, attributes.value);
	// 	});
	// 	const fragment = new DocumentFragment();
	// 	while (scene.firstChild) fragment.appendChild(scene.firstChild);
	// 	this.appendChild(fragment);
	// } else this.appendChild(template.content);
}