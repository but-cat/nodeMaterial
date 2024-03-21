export type Point = {
    x: number;
    y: number;
};
export type Points = {
    start: Point;
    end: Point;
    active: boolean;
};
export interface SingleNode {
    uuid: string;
    x: number;
    y: number;
    connectedTo: number[];
    focus: boolean;
    active: boolean;
    input?: {
        type: string;
        name: string;
        value: string | number | boolean | null;
        x: number;
        y: number;
    }[];
    noOutput?: boolean;
}
export type ConnectionPath = {
    start: Point;
    end: Point;
};
export declare function connectionPath(points: ConnectionPath): string | undefined;
/**
 * Returns the curve part of the svg-path
 * @param {object} points
 * @returns {string}
 */
export declare function connectionCurve(points: ConnectionPath): string;
/**
 * Returns the position of the element
 * @param { HTMLElement } element
 * @param { string } selectorString
 * @returns
 */
export declare function getElementPosition(element: HTMLElement, selectorString?: string): {
    top: number;
    left: number;
};
