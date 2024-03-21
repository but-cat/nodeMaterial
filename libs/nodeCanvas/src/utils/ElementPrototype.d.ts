import { AnyElementEventMap } from ".";
interface EventObject {
    type: string;
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
    [key: string]: any;
}
interface AttributeConfigObject {
    type: "string" | "number" | "number[]" | "boolean" | "object" | "array" | "vec2" | "vec3" | "vec4" | "color";
    property: string;
    value: number | string | boolean | Array<string> | Array<number> | Object | null;
    react?: boolean;
}
export type AttributeConfig = string | AttributeConfigObject;
export default class ElementPrototype extends HTMLElement {
    #private;
    static observedAttributes: string[];
    static observedAttributeConfig: AttributeConfig[];
    get RootNode(): any;
    static getTripple(params: typeof ElementPrototype): AttributeConfig[] | string[];
    static useNode(plugin: typeof ElementPrototype, keyName: string): void;
    static tagName: string;
    [key: string]: any | string | Function;
    /**
     * 检查监听函数是否已经添加到指定事件。
     * @param { string } type 表示监听事件类型的字符串。
     * @param listener 当所监听的事件类型触发时，会接收到一个事件通知（实现了 Event 接口的对象）对象。
     */
    hasEventListener(type: string, listener: EventListener): Boolean;
    /**
     * 在EventTarget上注册特定事件类型的事件处理程序。
     * @param { string } type 表示监听事件类型的字符串。
     * @param { Function } listener 当所监听的事件类型触发时，会接收到一个事件通知（实现了 Event 接口的对象）对象。
     * @param { boolean | AddEventListenerOptions | undefined }options 一个指定有关 listener 属性的可选参数对象。
     */
    addEventListener<K extends keyof AnyElementEventMap>(type: K | string, listener: (this: HTMLElement, ev: AnyElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    /**
     * EventTarget中删除事件侦听器。
     * @param { string } type 表示监听事件类型的字符串。
     * @param { Function } listener 当所监听的事件类型触发时，会接收到一个事件通知（实现了 Event 接口的对象）对象。
     * @param { boolean | AddEventListenerOptions | undefined }options 一个指定有关 listener 属性的可选参数对象。
     */
    removeEventListener(type: string, listener: EventListener, options?: boolean | AddEventListenerOptions | undefined): void;
    /**
     * 派发事件
     * 向一个指定的事件目标派发一个事件,  并以合适的顺序同步调用目标元素相关的事件处理函数。标准事件处理规则(包括事件捕获和可选的冒泡过程)同样适用于通过手动的使用dispatchEvent()方法派发的事件。
     * @param { Event | CustomEvent | EventObject } event 是要被派发的事件对象或事件字面量对象
     * @returns { boolean } 当该事件是可取消的(cancelable为true)并且至少一个该事件的 事件处理方法 调用了Event.preventDefault()，则返回值为false；否则返回true。
     */
    dispatchEvent(event: Event | CustomEvent | EventObject): boolean;
    /**
     * 当自定义元素第一次被连接到文档DOM时被调用。
     */
    protected connectedCallback(): void;
    /**
     * 当自定义元素与文档DOM断开连接时被调用。
     */
    protected disconnectedCallback(): void;
    /**
     * 当自定义元素被移动到新文档时被调用。
     */
    protected adoptedCallback(): void;
    /**
     * 当自定义元素的一个属性被增加、移除或更改时被调用。
     * @param { string } attrName 属性名
     * @param { string } oldVal 旧值
     * @param { string } newVal 新值
     */
    protected attributeChangedCallback(attrName: string, oldVal: string | null, newVal: string): void;
}
export {};
