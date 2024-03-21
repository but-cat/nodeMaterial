import ElementPrototype, { AttributeConfig } from './utils/ElementPrototype';
import { PointIn, PointOut } from './point/index';
export default class NodeCanvas extends ElementPrototype {
    static tagName: string;
    static nodeList: Map<string, typeof ElementPrototype>;
    /**
     * 安装新节点
     * @param { prototype } plugin 组件
     */
    static useNode(plugin: typeof ElementPrototype, key?: string): void;
    static observedAttributeConfig: AttributeConfig[];
    _zoom: number;
    get zoom(): number;
    set zoom(value: number);
    private connect;
    action: SVGSVGElement;
    actionPath: SVGPathElement;
    line: SVGSVGElement;
    get connectedList(): [string, string][];
    constructor();
    /**
     * 当自定义元素的一个属性被增加、移除或更改时被调用。
     * @param attrName
     * @param oldVal
     * @param newVal
     */
    protected attributeChangedCallback(attrName: string, oldVal: string | null, newVal: string): void;
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用。
     */
    protected connectedCallback(): void;
    /**
     * 捕获连接点的移动事件，绘制连接线
     * @param { CustomEvent } event
     * @private
     */
    connectedPath(event: CustomEvent): void;
    /**
     * 连接输入点和输出点
     * @param pointIn 输入点
     * @param pointOut 输出点
     * @returns { SVGPathElement } 连接线
     */
    connectedTo(pointIn: PointIn, pointOut: PointOut): SVGPathElement | undefined;
    /**
     * 根据输入的点集合，获取所有已连接的点id对
     * @param NodeList
     * @returns { [string, string][] } 已连接的点id对 [ [pointIn.uuid, pointOut.uuid], ... ]
     */
    getConnectedList(NodeList: NodeList | Node[]): [string, string][];
}
