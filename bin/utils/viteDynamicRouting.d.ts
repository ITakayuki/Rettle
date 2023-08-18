declare const checkDynamicRoute: (request: string) => boolean;
declare const viteDynamicRouting: (tsxPath: string) => Promise<string>;
export { viteDynamicRouting, checkDynamicRoute };
