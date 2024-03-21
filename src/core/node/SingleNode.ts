import { getUUID } from "./utils";
import { NodeTemplate } from "./NodeTemplate";


export interface SingleNodeJSON {
	// [key: string]: any;
	name: string;
	refCount: number;
	refIndex: number;
	uuid: string;
	x: number;
	y: number;
	type: "start-node" | "node" | "end-node";
	disabled?: boolean;
	outputType: string;
	code: string;
	doc: string;
	input: {
		uuid: string;
		type: string;
		name: string;
		value: number;
		default: string;
		title: string;
		out?: string;
	}[];
}





export class SingleNode {

	static createFunName() {
		return 'xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			const r = (Math.random() * 16) | 0,
				v = c == 'x' ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
	}

	
	// [key: string]: any;
	name: string = '未命名';
	refCount: number = 0;
	refIndex: number = 0;
	uuid: string = getUUID();


	funName = SingleNode.createFunName();

	x: number = 0;
	y: number = 0;
	type: "start-node" | "node" | "end-node" = 'node';

	disabled?: boolean = false;
	outputType: string = 'number';

	input: {
		uuid: string;
		type: string;
		name: string;
		title: string;
		value: number;
		default: string;
		out?: string;
	}[] = [];


	code: string = '';




	functionName: string = '';

	doc: string = '';



	get codeTemplate() {


		return {
			name: this.funName,
			type: this.outputType,
			// nodeType: this.nodeType,
			code: this.code,
			uuid: this.uuid,

			params: this.input.map((item) => {
				return {
					name: item.name,
					type: item.type,
					defaultValue: item.default,
				};
			}),
			// returnType: this.returnType,
			
		}
	}


    constructor(source: SingleNodeJSON | NodeTemplate) {
		if(source instanceof NodeTemplate) this.initNodeTemplate(source as NodeTemplate);
		else this.initSingleNodeJSON(source as SingleNodeJSON);
    }

	initSingleNodeJSON(source: SingleNodeJSON) {
		console.log("initSingleNodeJSON: ", source);
		
		this.name = source.name;
		this.refCount = source.refCount;
		this.refIndex = source.refIndex;
		this.uuid = source.uuid;
		this.x = source.x;
		this.y = source.y;
		this.type = source.type;
		this.disabled = source.disabled;
		this.outputType = source.outputType;
		this.input = source.input;
		this.code = source.code;
	}

	initNodeTemplate(source: NodeTemplate) {
		console.log("NodeTemplate: ", source);
		
		this.name = source.name;
		this.type = source.type as "start-node" | "node" | "end-node";
		this.outputType = source.returnType;
		this.input = source.input;
		this.code = source.code;
		this.doc = source.doc;
	}
}