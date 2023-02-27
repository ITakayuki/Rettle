import * as React from "react";
import { SerializedStyles } from "@emotion/react";
export declare const createComponent: (hash: string, args: Record<string, any>) => void;
export declare const getRefs: (hash: string) => void | Record<string, Element | HTMLElement>;
export declare const getRef: <T>(hash: string, key: string) => T;
export declare const watcher: <T>(value: T, callback: () => void) => [{
    value: T;
}, (arg: T | ((val: T) => T)) => void];
interface RettleComponent {
    children: JSX.Element | React.ReactNode;
    css?: SerializedStyles;
    className?: string;
    href?: string;
    alt?: string;
}
export declare const Component: {
    [x: string]: (props?: RettleComponent) => React.ReactElement;
};
export {};
