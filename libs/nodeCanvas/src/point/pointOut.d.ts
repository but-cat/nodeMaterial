import ElementPrototype from '../utils/ElementPrototype';
import { PointIn } from './index';
export default class PointOut extends ElementPrototype {
    static tagName: string;
    static observedAttributes: string[];
    _root?: ElementPrototype;
    uuid: string;
    /**
     * 起点坐标。
     */
    start: {
        x: number;
        y: number;
    };
    /**
     * 终点坐标。
     */
    end: {
        x: number;
        y: number;
    };
    /**
     * 是否激活。
     */
    active: boolean;
    /**
     * 连接的点。
     */
    private pointIn?;
    setPoint(point?: PointOut | PointIn): void;
    constructor();
    connectedCallback(): void;
    /**
     * 当自定义元素与文档DOM断开连接时被调用。
     */
    disconnectedCallback(): void;
    /**
     * 当自定义元素的一个属性被增加、移除或更改时被调用。
     * @param { string } attrName 属性名
     * @param { string } oldVal 旧值
     * @param { string } newVal 新值
     */
    attributeChangedCallback(attrName: string, oldVal: string | null, newVal: string): void;
    /**
     * 初始化用于拖动或连接的所有拖动对象数据。
     *
     * @param {object} event
     */
    pointerdown(event: PointerEvent): void;
}
