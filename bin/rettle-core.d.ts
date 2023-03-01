declare const watcher: <T>(value: T, callback: () => void) => [{
    value: T;
}, (arg: T | ((val: T) => T)) => void];
export interface RettleMethods {
    getRefs: () => Record<string, HTMLElement>;
    getRef: (key: string) => HTMLElement;
    watcher: typeof watcher;
    onMounted: typeof onMounted;
}
declare const onMounted: (cb: () => void) => void;
export declare const RettleStart: (scripts: {
    [x: string]: ({ getRefs }: RettleMethods, props: Record<string, any>) => Record<string, any>;
}) => Promise<void>;
export {};
