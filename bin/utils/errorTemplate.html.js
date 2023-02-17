"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (title, contents) => {
    return `
<!DOCTYPE html>
<html>
<head>
<title>${title} | Rettle</title>
</head>
<body>
<div>
<h1>${title}</h1>
<p>
${contents}
</p>
</div>
</body>
</html>
  `;
};
//# sourceMappingURL=errorTemplate.html.js.map