export default (title: string,contents: string) => {
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
  `
}