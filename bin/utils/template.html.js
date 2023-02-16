"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateHtml = void 0;
const templateHtml = (options) => {
    return `
<!DOCTYPE html>
<html>
<head>
${options.headers.join("\n")}
${options.style}
</head>
<body>
${options.html}
<script src="${options.script}"></script>
</body>
</html>
  `;
};
exports.templateHtml = templateHtml;
//# sourceMappingURL=template.html.js.map