import * as React from "react";
import { SerializedStyles } from "@emotion/react";
export declare const createHash: (str: string) => string;
export declare const watcher: <T>(value: T, callback: () => void) => [{
    value: T;
}, (arg: T | ((val: T) => T)) => void];
interface RettleComponent {
    frame: "[fr]";
    children: JSX.Element | React.ReactNode;
    css?: SerializedStyles;
    className?: string;
    href?: string;
    alt?: string;
}
export declare const Component: {
    [x: string]: (props: RettleComponent) => React.ReactElement;
};
interface RettleMethods {
    getRefs: () => Record<string, HTMLElement>;
    getRef: (key: string) => HTMLElement;
    watcher: typeof watcher;
    getProps: typeof getProps;
}
export declare const RettleStart: (scripts: {
    [x: string]: ({ getRefs }: RettleMethods, props: Record<string, any>) => Record<string, any>;
}) => void;
export declare const getProps: (hash: string) => Record<string, any>;
export {};
