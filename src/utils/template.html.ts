import {RettleConfigInterface} from "./config";

export interface templateHTMLInterface extends Pick<RettleConfigInterface, "header"> {
  html:string;
  headers: Array<string>;
  script: string;
  style?: string;
}


export const templateHtml = (options: templateHTMLInterface) => {
  return `
<doctype html>
<head>
${options.headers.join("")}
${options.style}
</head>
<body>
${options.html}
<script src="${options.script}"></script>
</body>
  `
}