export default (title: string,contents: string) => {
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
color: #333333;
color: white;
}
.title {
  font-size: 36px;
}
.error {
  padding: 20px;
  border-radius: 10px;
  backgrouund-color: black;
  color: white;
  font-size: 24px;
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
  `
}


export const errorTemplate = (value: string) => {
  return `<div class="error"></div>`
}