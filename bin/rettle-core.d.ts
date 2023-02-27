import * as React from "react";
export declare const createComponent: (hash: string, args: Record<string, any>) => void;
export declare const getRefs: (hash: string) => void | Record<string, Element | HTMLElement>;
export declare const getRef: <T>(hash: string, key: string) => T;
export declare const watcher: <T>(value: T, callback: () => void) => [{
    value: T;
}, (arg: T | ((val: T) => T)) => void];
interface RettleComponent {
    children: JSX.Element | React.ReactNode;
}
export declare const Component: {
    [x: string]: (props?: RettleComponent) => React.ReactElement;
};
export {};
