import { PropType } from 'vue';
declare const _sfc_main: import("vue").DefineComponent<{
    title: {
        type: StringConstructor;
        default: string;
    };
    value: {
        type: PropType<string>;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}, unknown, {
    file: null;
    url: string;
}, {}, {
    upload(event: any): Promise<void>;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:value"[], "update:value", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: string;
    };
    value: {
        type: PropType<string>;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    "onUpdate:value"?: ((...args: any[]) => any) | undefined;
}, {
    disabled: boolean;
    title: string;
}, {}>;
export default _sfc_main;
