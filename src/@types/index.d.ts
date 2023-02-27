declare module "*.node"

declare module "css-purge" {
  type CallbackType = (error: string | null, result: string| null) => void;
  export function purgeCSS(cssDataIn: any, optionsIn: any, callback: CallbackType): void;
  export function purgeCSSFiles(optionsIn: any, configFileLocationIn: any): void;
}