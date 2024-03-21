declare const _sfc_main: import("vue").DefineComponent<{
    placeholder: {
        value: StringConstructor;
        default: string;
    };
    value: {
        value: (StringConstructor | ArrayConstructor)[];
        default: string;
    };
    multiple: BooleanConstructor;
    disabled: {
        value: BooleanConstructor;
        default: boolean;
    };
}, unknown, {
    open: boolean;
    name: string;
}, {}, {
    selectChangeVal(event: any): void;
    selecteds(event: any): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:value" | "open" | "close")[], "update:value" | "open" | "close", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    placeholder: {
        value: StringConstructor;
        default: string;
    };
    value: {
        value: (StringConstructor | ArrayConstructor)[];
        default: string;
    };
    multiple: BooleanConstructor;
    disabled: {
        value: BooleanConstructor;
        default: boolean;
    };
}>> & {
    "onUpdate:value"?: ((...args: any[]) => any) | undefined;
    onOpen?: ((...args: any[]) => any) | undefined;
    onClose?: ((...args: any[]) => any) | undefined;
}, {
    value: string;
    disabled: boolean;
    placeholder: string;
    multiple: boolean;
}, {}>;
export default _sfc_main;
