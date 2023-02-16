"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateHtml = void 0;
const templateHtml = (options) => {
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
  `;
};
exports.templateHtml = templateHtml;
//# sourceMappingURL=template.html.js.map