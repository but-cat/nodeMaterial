import { SingleNode } from '@/core/node';

export default abstract class {

	abstract compile(): {
		NodeList: SingleNode[];
		connectedList: any;
	};
	


	abstract save(): string;

	abstract load(data: string): void;
}