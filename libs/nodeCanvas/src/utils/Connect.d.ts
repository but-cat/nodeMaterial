import { PointIn, PointOut } from "../point/index";
export declare class Connect extends Array {
    /**
     * 一个输入点只能连接一个输出点。
     * 一个输出点可以连接多个输入点。
     */
    private PointIN;
    /**
     * 一个输出点包含多个输入点。
     */
    private PointOUT;
    /**
     * 一个点只能连接一条线。
     */
    private PointLine;
    private PointInLine;
    constructor();
    /**
     * 连接点
     * @param { PointIn } pointIn 输入点
     * @param { PointOut } pointOut 输出点
     * @returns { SVGPathElement } 返回连接线
     * @description
     * 1. 一个输入点只能连接一个输出点, 如果输入点已经连接了一个输出点, 则会删除之前的连接。
     * 2. 一个输出点可以连接多个输入点。
     * 3. 一个点只能连接一条线。
     */
    add(pointIn: PointIn, pointOut: PointOut): SVGPathElement;
    /**
     * 判断点是否已经连接
     * @param { PointIn } pointIn
     * @param { PointOut } pointOut
     * @returns { Boolean }
     */
    has(pointIn: PointIn, pointOut: PointOut): boolean;
    /**
     * 移除点的连线
     * @param point
     * @returns
     */
    delete(point: PointIn): boolean;
    /**
     * 更新连线
     * @param { Array<PointIn | PointOut> } pointList
     */
    updataLine(pointList?: Array<PointIn | PointOut>): void;
    push(...items: any[]): number;
    getPoint(point: PointIn | PointOut): {
        pointIn: PointIn | PointOut | Set<PointIn> | undefined;
        pointOut: PointIn | PointOut | undefined;
    } | undefined;
    getPointLine(point: PointIn | PointOut): Set<SVGPathElement>;
    getPointInList(): any[];
    getPointOutList(): any[];
    /**
     * 通过输出点获取输入点
     * @param pointOut
     * @returns
     */
    getPointSet(pointOut: PointOut): PointIn[];
    /**
     * 通过输入点获取输出点
     * @param pointIn
     * @returns
     */
    connectedUUID(point: PointIn): [string, string] | undefined;
}
