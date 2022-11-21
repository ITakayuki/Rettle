import React from "react";
import {CacheProvider} from "@emotion/react";
import {renderToString} from "react-dom/server";
import createEmotionServer from "@emotion/server/create-instance";
import createCache from "@emotion/cache";
const {templateHtml} = require("./utils/template.html");
const {getConfigure} = require("./utils/config");

export const compile = (App: any) => {
  const config = getConfigure();
  const key = "rettle";
  const cache = createCache({ key });
  const { extractCritical } = createEmotionServer(cache);
  const element = renderToString(React.createElement(CacheProvider, {value: cache}, React.createElement(App)));
  const {html, css} = extractCritical(element);
  const markup = templateHtml(html);
  console.log(markup);
}

export const rettleConfig = (configure: Partial<RettleConfigInterface>) => {
  return configure;
}