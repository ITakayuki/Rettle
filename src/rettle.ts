import {RettleConfigInterface} from "./utils/config";
import {default as emotionCreateCache, EmotionCache} from "@emotion/cache";
import ReactDom from "react-dom/server";
import createEmotionServer from "@emotion/server/create-instance";
import * as React from "react";
import {SerializedStyles} from "@emotion/react";
import {IntrinsicElements} from "./elementTypes";
import {CacheProvider} from "@emotion/react";
import {RettleMethods} from "./rettle-core";


export const defineOption = (options: () => Partial<RettleConfigInterface>) => {
  return options;
}

export const createCache = (key: string) => emotionCreateCache({key});

export const createRettle = (cache: EmotionCache, element: JSX.Element) => {
  const html = React.createElement(CacheProvider, {value: cache}, element);
  const {extractCritical } = createEmotionServer(cache);
  return extractCritical(ReactDom.renderToString(html));
}


/***********************/
/* Components Methods */
/***********************/

type RettleComponent =  {
  frame: "[fr]",
  children: JSX.Element | React.ReactNode,
  css?: SerializedStyles,

}
export const Component =  new Proxy({}, {
  get: (_, key: keyof IntrinsicElements) => {
    return (props: Record<string, any>) => {
      const prop = Object.keys(props).reduce((objAcc: any, key: any) => {
        // 累積オブジェクトにキーを追加して、値を代入
        if (key !== "frame" && key !== "css" && key !== "children") {
          objAcc[key] = props[key];
        }
        // 累積オブジェクトを更新
        return objAcc;
      }, {});
      return React.createElement(key, Object.assign(prop, {"data-rettle-fr": props.frame}), props.children);
    }
  }
}) as { [key in keyof IntrinsicElements]: (props: RettleComponent & IntrinsicElements[key]) => JSX.Element };

interface CommentOutProps {
  children?: React.ReactNode;
  begin?: string;
  end?: string;
}

export const CommentOut: React.FC<CommentOutProps> = (props) => {
  return React.createElement("span",{
    "comment-out-begin": props.begin || "none",
    "comment-out-end": props.end || "none",
    "data-comment-out": true
  }, props.children)
}




export type RettleFrame = (methods: RettleMethods, props: Record<string, any>) => Record<string, any> | void