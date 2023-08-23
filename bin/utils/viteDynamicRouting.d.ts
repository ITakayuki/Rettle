declare const checkDynamicRoute: (request: string) => boolean;
declare const viteDynamicRouting: (request: string) => Promise<string>;
export { viteDynamicRouting, checkDynamicRoute };
