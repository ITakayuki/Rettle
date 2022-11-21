exports.templateHtml = (html:string) => {
  const {version} = require("./variable");
  return `
<doctype html>
<head>
<meta name="generator" content="Rettle ${version}">
<link rel="stylesheet" href="/style.css">
</head>
<body>
${html}
<script src="/bundle.js"></script>
</body>
  `
}