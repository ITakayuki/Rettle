"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorTemplate = void 0;
exports.default = (title, contents) => {
    return `
<!DOCTYPE html>
<html>
<head>
<title>${title} | Rettle</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
body {
margin: 0;
padding: 20px;
background-color: #333333;
color: white;
}
.title {
  font-size: 36px;
}
.error {
  padding: 20px;
  border-radius: 10px;
  background-color: black;
  color: white;
  font-size: 15px;
  line-height: 1;
}
.color-red {
color: red;
}
.color-white {
color: white;
}
.color-black {
color: black;
}
.color-blue {
color: blue;
}
.color-green {
color: green;
}
.pl-20 {
  padding-left: 20px;
}
</style>
</head>
<body>
<div>
<h1 class="title">${title}</h1>
<p>
${contents}
</p>
</div>
</body>
</html>
  `;
};
const errorTemplate = (value) => {
    return `<div class="error">${value}</div>`;
};
exports.errorTemplate = errorTemplate;
//# sourceMappingURL=errorTemplate.html.js.map