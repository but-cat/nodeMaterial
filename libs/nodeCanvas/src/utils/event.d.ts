import { Points } from "./index";
import ElementPrototype from "./ElementPrototype";
import { PointIn, PointOut } from '../point/index';
export interface AnyElementEventMap extends HTMLElementEventMap {
    "connected-down": CustomEvent<{
        x: number;
        y: number;
        uuid: string;
        start: Points;
        end: Points;
    }>;
    "connected-move": CustomEvent<{
        x: number;
        y: number;
        uuid: string;
        start: Points;
        end: Points;
    }>;
    "connected-up": CustomEvent<{
        node: any;
        nodeUUID: string;
        uuid: string;
        start: Points;
        end: Points;
    }>;
    "connected-to": CustomEvent<{
        start?: Points;
        end: Points;
        targetEl: HTMLElement;
        pointIn: PointIn;
        pointOut: PointOut;
    }>;
    "connected-del": CustomEvent<{
        el: ElementPrototype;
    }>;
    "connected-del-point": CustomEvent<{}>;
}
