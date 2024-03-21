import { SingleNode, SingleNodeJSON, getUUID } from '@/core/node';


export const nodelist = [
	// {
	// 	name: '节点1',
	// 	refCount: 0,
	// 	refIndex: 0,
	// 	// disabled: false,
	// 	uuid: "7bd5cb56-88d9-4e97-8fb0-aeedf8300634",
	// 	x: 30,
	// 	y: 578,
	// 	type: 'start-node',
	// 	outputType: 'number',
		
	// },
	// {
	// 	name: '节点2',
	// 	refCount: 0,
	// 	refIndex: 0,
	// 	disabled: true,
	// 	uuid: "32bc0cca-c2bf-4356-873b-8d364e532f4b",
	// 	x: 746,
	// 	y: 671,
	// 	type: 'node',
	// 	outputType: 'number',
	// 	input: [
	// 		{
	// 			uuid: "23457cd0-7b2c-4c78-b823-edca45fc82d3",
	// 			type: 'number',
	// 			name: 'Yes',
	// 			value: 0,
	// 		},
	// 		{
	// 			uuid: "855b326f-ad0d-4d7c-b20e-61f90196be8f",
	// 			type: 'number',
	// 			name: 'No',
	// 			value: 0,
	// 		},
	// 	]
	// },
	// {
	// 	name: '节点3',
	// 	refCount: 0,
	// 	refIndex: 0,
	// 	// disabled: false,
	// 	uuid: '0272ccf2-ce29-4dc5-84ee-77c55f04ab9b',
	// 	x: 321,
	// 	y: 227,
	// 	type: 'node',
	// 	outputType: 'number',
	// 	input: [
	// 		{
	// 			uuid: "2ecd8bb8-c2ac-4ed5-ae8e-0c599c9f3960",
	// 			type: 'number',
	// 			name: 'Yes',
	// 			value: 0,
	// 		},
	// 		{
	// 			uuid: "abdf5406-a6e5-42be-99f3-828790c5515a",
	// 			type: 'number',
	// 			name: 'NoNo',
	// 			value: 0,
	// 		},
	// 	]
	// },
	// {
	// 	name: '节点4',
	// 	refCount: 0,
	// 	refIndex: 0,
	// 	// disabled: false,
	// 	uuid: "fa5256d0-38cd-4bc8-a125-8eff60881194",
	// 	x: 834,
	// 	y: 306,
	// 	type: 'node',
	// 	outputType: 'number',
	// 	input: [
	// 		{
	// 			uuid: "97a2e77d-5f04-41fa-9926-000f8d57b0aa",
	// 			type: 'number',
	// 			name: 'Yes',
	// 			value: 0,
	// 			// out: "32bc0cca-c2bf-4356-873b-8d364e532f4b"
	// 		},
	// 		{
	// 			uuid: "c30ac278-5888-47fc-bdf6-bfc4e9bca76a",
	// 			type: 'number',
	// 			name: 'No',
	// 			value: 0,
	// 			// out: "0272ccf2-ce29-4dc5-84ee-77c55f04ab9b"
	// 		},
	// 	],
	// },
	// {
	// 	name: '节点5',
	// 	refCount: 0,
	// 	refIndex: 0,
	// 	// disabled: false,
	// 	uuid: "23dc9b1d-2538-4dcf-99b2-d1018e14ef79",
	// 	x: 1272,
	// 	y: 428,
	// 	type: 'end-node',
	// 	// outputType: 'number',
	// 	input: [
	// 		{
	// 			uuid: '3f6b2de4-10fd-4e8d-8ff8-5eb382020082',
	// 			type: 'number',
	// 			name: 'Yes',
	// 			value: 0,
	// 		},
	// 		{
	// 			uuid: '2a0b6867-6916-4c58-a98f-3eeb661b34d4',
	// 			type: 'number',
	// 			name: 'No',
	// 			value: 0,
	// 		},
	// 	],
	// },
] as SingleNodeJSON[];


export const connectedList = [
	// ['2a0b6867-6916-4c58-a98f-3eeb661b34d4', 'fa5256d0-38cd-4bc8-a125-8eff60881194'],
	// ['97a2e77d-5f04-41fa-9926-000f8d57b0aa', '0272ccf2-ce29-4dc5-84ee-77c55f04ab9b'],
	// ['c30ac278-5888-47fc-bdf6-bfc4e9bca76a', '32bc0cca-c2bf-4356-873b-8d364e532f4b'],
	// ['2ecd8bb8-c2ac-4ed5-ae8e-0c599c9f3960', '7bd5cb56-88d9-4e97-8fb0-aeedf8300634'],
	// ['23457cd0-7b2c-4c78-b823-edca45fc82d3', '0272ccf2-ce29-4dc5-84ee-77c55f04ab9b'],
	// ['855b326f-ad0d-4d7c-b20e-61f90196be8f', '7bd5cb56-88d9-4e97-8fb0-aeedf8300634'],
] as string[][];