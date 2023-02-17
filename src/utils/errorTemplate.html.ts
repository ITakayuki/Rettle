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
background-color: #333333;
color: white;
}
img {
width: 100%;
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
  line-height: 1.5;
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
.rettle-logo {
background-size: contain;
background-repeat: no-repeat;
background-image:url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJf44Os44Kk44Ok44O8XzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDI1MS40MiAxNjYuOTMiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDojZmZmO30uY2xzLTJ7ZmlsbDojNmNjOGU3O308L3N0eWxlPjwvZGVmcz48ZyBpZD0iX+ODrOOCpOODpOODvF8xLTIiPjxnPjxjaXJjbGUgY2xhc3M9ImNscy0yIiBjeD0iMTI1LjcxIiBjeT0iODMuNDYiIHI9IjgzLjQ2Ii8+PGc+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMy43MiwxNDcuODhsLjAzLS43NnYtLjE1YzAtLjE3LS4wMS0uNDMtLjAzLS43OWwuMjEtLjE0Yy4yMSwuMTUsLjQxLC4yNiwuNTksLjMzLC4xOCwuMDYsLjM4LC4wOSwuNiwuMDksLjQsMCwuNy0uMDgsLjkyLS4yNHMuMzctLjQxLC40Ni0uNzRjLjEtLjM0LC4xNC0xLjIyLC4xNC0yLjY1di05LjYyYzAtMS0uMDEtMS45OC0uMDQtMi45NC0uMDEtLjctLjA2LTEuMTItLjE1LTEuMjUtLjA4LS4xMy0uMjItLjIyLS40MS0uMjktLjE5LS4wNi0uNzItLjEtMS41OS0uMTJ2LS43MWMxLjE3LC4wNCwyLjI2LC4wNywzLjI4LC4wNywxLjA4LDAsMi4xNy0uMDIsMy4yOS0uMDd2LjcxYy0uODcsLjAxLTEuNCwuMDUtMS41OSwuMTItLjE5LC4wNi0uMzIsLjE1LS4zOSwuMjYtLjEsLjE1LS4xNSwuNTEtLjE4LDEuMDcsMCwuMTUtLjAxLDEuMi0uMDQsMy4xNHY3Ljk1YzAsMS4yMS0uMSwyLjE3LS4zMSwyLjg3cy0uNTYsMS4zNy0xLjA1LDJjLS40OSwuNjMtMS4wMiwxLjExLTEuNiwxLjQzcy0xLjEzLC40OS0xLjY3LC40OWMtLjE1LDAtLjMtLjAyLS40Ni0uMDZaIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTIuMjUsMTQzLjA5Yy4xMi0uNzEsLjE5LTEuODYsLjIxLTMuNDRoLjc1Yy4wNCwxLjA4LC4xLDEuNzEsLjE4LDEuOTFzLjI5LC40LC42MSwuNjIsLjc2LC40MiwxLjMxLC41OSwxLjA3LC4yNiwxLjU4LC4yNmMuNzUsMCwxLjQzLS4xNywyLjA2LS41MSwuNjMtLjM0LDEuMDgtLjc5LDEuMzctMS4zNSwuMjktLjU2LC40My0xLjE1LC40My0xLjc5LDAtLjQ5LS4wNy0uOTEtLjIyLTEuMjZzLS4zNi0uNjQtLjY2LS44Ni0uNjYtLjM3LTEuMS0uNDZjLS4yNy0uMDQtLjgyLS4xMi0xLjY0LS4yMnMtMS41Mi0uMjItMi4wOS0uMzRjLS43Ny0uMjQtMS4zMy0uNTEtMS42OS0uODNzLS42NS0uNzMtLjg4LTEuMjUtLjM0LTEuMDctLjM0LTEuNjdjMC0uODcsLjIzLTEuNjksLjY4LTIuNDZzMS4xMy0xLjM3LDIuMDEtMS44LDEuODUtLjY0LDIuODktLjY0Yy42MywwLDEuMzEsLjA4LDIuMDUsLjI1czEuNDMsLjQxLDIuMDcsLjczYy0uMSwuNDYtLjE4LC45LS4yMiwxLjNzLS4wOCwuOTktLjEsMS43OGgtLjc1Yy0uMDItMS4xNC0uMDYtMS43Ni0uMS0xLjg2LS4xOC0uMjctLjQ0LS41MS0uNzUtLjcyLS43Ni0uNDMtMS41NS0uNjQtMi4zOC0uNjQtMS4wNywwLTEuOTIsLjMzLTIuNTYsLjk4LS42NCwuNjUtLjk2LDEuNS0uOTYsMi41NCwwLC42MywuMTEsMS4xMSwuMzQsMS40NSwuMjMsLjM0LC42NCwuNjIsMS4yMywuODIsLjQxLC4xNCwxLjA3LC4yNywxLjk5LC4zOXMxLjc1LC4yNSwyLjQ5LC4zOWMuNjksLjIxLDEuMjEsLjQ1LDEuNTQsLjczLC4zMywuMjgsLjYsLjY2LC44MiwxLjEyLC4yMSwuNDYsLjMyLDEsLjMyLDEuNjIsMCwxLjQ3LS42MSwyLjc1LTEuODMsMy44NHMtMi43OSwxLjY0LTQuNzMsMS42NGMtMS40NiwwLTIuNzktLjI5LTMuOTctLjg2WiIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTIzLjc3LDE0My42M3YtLjczYy41MiwwLC44Ni0uMDMsMS4wMi0uMXMuMzctLjI1LC42MS0uNTQsLjgtMS4wNCwxLjY2LTIuMjVsMy4wMi00LjE4LTEuOTYtMy4zM2MtLjE3LS4yOC0uNTEtLjc4LTEuMDEtMS41MS0uNTEtLjczLS45NS0xLjI4LTEuMzMtMS42NS0uMTYtLjE1LS4zMS0uMjQtLjQ1LS4yOXMtLjU1LS4wNy0xLjI0LS4wN3YtLjY0bDMuMjMtLjUzYy4yOCwuMTksLjU0LC40NCwuNzksLjc1LC4zNSwuNDQsLjgzLDEuMjEsMS40NiwyLjI5bDEuODYsMy4yMmMyLjI2LTMuMjIsMy40My00Ljk4LDMuNTEtNS4yOHYtLjg5Yy44LC4wMywxLjM0LC4wNCwxLjY0LC4wNHMuNzQtLjAxLDEuMzQtLjA0di42OGMtLjQ2LC4wMi0uNzYsLjA1LS44NywuMDgtLjEyLC4wMy0uMjMsLjA4LS4zMiwuMTQtLjEzLC4wOS0uMzMsLjI4LS41OSwuNTlzLS43MywuOTItMS40MywxLjg2LTEuMzMsMS44LTEuOTEsMi42bC0uODMsMS4xMSwzLjc1LDYuMDZjLjQ5LC43OSwuODUsMS4zMSwxLjA4LDEuNTcsLjExLC4xMywuMjMsLjIxLC4zNywuMjRzLjQ0LC4wNiwuOTMsLjA3di43M2MtLjgtLjAzLTEuMzUtLjA0LTEuNjMtLjA0LS4zMSwwLS44NiwuMDEtMS42NSwuMDQtLjQ0LS42Ni0uODUtMS4zMi0xLjIzLTEuOTZsLTIuOTEtNC45Ny0xLjQxLDEuOTljLTEuMzksMi4wNy0yLjIyLDMuNDUtMi41MSw0LjE0bC0uMDIsLjhjLS43Ny0uMDMtMS4yOC0uMDQtMS41NS0uMDQtLjE4LDAtLjY1LC4wMS0xLjQyLC4wNFoiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik00NC45MywxNDMuMDljLjEyLS43MSwuMTktMS44NiwuMjEtMy40NGguNzVjLjA0LDEuMDgsLjEsMS43MSwuMTgsMS45MXMuMjksLjQsLjYxLC42MiwuNzYsLjQyLDEuMzEsLjU5LDEuMDcsLjI2LDEuNTgsLjI2Yy43NSwwLDEuNDMtLjE3LDIuMDYtLjUxLC42My0uMzQsMS4wOC0uNzksMS4zNy0xLjM1LC4yOS0uNTYsLjQzLTEuMTUsLjQzLTEuNzksMC0uNDktLjA3LS45MS0uMjItMS4yNnMtLjM2LS42NC0uNjYtLjg2LS42Ni0uMzctMS4xLS40NmMtLjI3LS4wNC0uODItLjEyLTEuNjQtLjIycy0xLjUyLS4yMi0yLjA5LS4zNGMtLjc3LS4yNC0xLjMzLS41MS0xLjY5LS44M3MtLjY1LS43My0uODgtMS4yNS0uMzQtMS4wNy0uMzQtMS42N2MwLS44NywuMjMtMS42OSwuNjgtMi40NnMxLjEzLTEuMzcsMi4wMS0xLjgsMS44NS0uNjQsMi44OS0uNjRjLjYzLDAsMS4zMSwuMDgsMi4wNSwuMjVzMS40MywuNDEsMi4wNywuNzNjLS4xLC40Ni0uMTgsLjktLjIyLDEuM3MtLjA4LC45OS0uMSwxLjc4aC0uNzVjLS4wMi0xLjE0LS4wNi0xLjc2LS4xLTEuODYtLjE4LS4yNy0uNDQtLjUxLS43NS0uNzItLjc2LS40My0xLjU1LS42NC0yLjM4LS42NC0xLjA3LDAtMS45MiwuMzMtMi41NiwuOTgtLjY0LC42NS0uOTYsMS41LS45NiwyLjU0LDAsLjYzLC4xMSwxLjExLC4zNCwxLjQ1LC4yMywuMzQsLjY0LC42MiwxLjIzLC44MiwuNDEsLjE0LDEuMDcsLjI3LDEuOTksLjM5czEuNzUsLjI1LDIuNDksLjM5Yy42OSwuMjEsMS4yMSwuNDUsMS41NCwuNzMsLjMzLC4yOCwuNiwuNjYsLjgyLDEuMTIsLjIxLC40NiwuMzIsMSwuMzIsMS42MiwwLDEuNDctLjYxLDIuNzUtMS44MywzLjg0cy0yLjc5LDEuNjQtNC43MywxLjY0Yy0xLjQ2LDAtMi43OS0uMjktMy45Ny0uODZaIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNTYuNjEsMTM0Ljk1di0uNDZjLjc0LS4yOCwxLjMyLS41MywxLjc2LS43NSwwLTEuNzYtLjAyLTIuODgtLjA3LTMuMzYsLjc3LS4yNywxLjM5LS41NSwxLjg3LS44NWwuMjcsLjIyYy0uMDgsLjYxLS4xNywxLjk2LS4yNyw0LjA1LC41OSwwLC45NCwuMDEsMS4wNiwuMDEsLjA3LDAsLjQ1LDAsMS4xNC0uMDIsLjM4LDAsLjY3LS4wMiwuODYtLjA0bC4wOCwuMDgtLjIzLDEuMDNjLS40NiwwLS44OS0uMDEtMS4yOC0uMDFzLS45MywwLTEuNjMsLjAxbC0uMDcsNC41Yy0uMDIsMS4xLS4wMSwxLjc2LC4wMiwxLjk3cy4xMSwuNCwuMjEsLjU2Yy4xLC4xNiwuMjQsLjI5LC40LC4zOHMuNDUsLjE3LC44NSwuMjJjLjMsMCwuNTUtLjAxLC43NC0uMDRzLjQzLS4wOSwuNzEtLjE5bC4xMywuNDNjLS4zNSwuMjctLjY4LC41Ni0xLjAxLC44NS0uMjgsLjEtLjU0LC4xNy0uNzksLjItLjI0LC4wMy0uNTIsLjA1LS44NCwuMDUtLjM5LDAtLjctLjA0LS45NC0uMTNzLS40NC0uMjEtLjY0LS4zNy0uMzUtLjM2LS40OC0uNi0uMjEtLjYzLS4yNC0xLjE1YzAtLjUsLjAyLTEuMDUsLjA0LTEuNjUsMC0uMTIsLjAxLS4yNSwuMDEtLjM5di00LjU5aC0uNDVjLS4zNywwLS43OCwuMDItMS4yNCwuMDZaIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNjUuOSwxMzYuMDVsLS41OS0uMTVjMC0uMTcsLjAxLS40LC4wMS0uNywwLS4zMSwwLS41Ni0uMDEtLjc0LC45NC0uNjEsMS43LTEuMDMsMi4zLTEuMjQsLjQ2LS4xNSwuOTctLjIzLDEuNTQtLjIzLC44NCwwLDEuNTUsLjE2LDIuMTIsLjQ4czEsLjc3LDEuMjgsMS4zNmMuMTksLjQxLC4yOSwuOTgsLjI5LDEuNjlsLS4wNCwyLjAzdjMuM2MwLC4zNSwuMDMsLjYxLC4wOSwuNzYsLjA0LC4xMSwuMTEsLjE5LC4yMSwuMjQsLjA3LC4wNCwuMjMsLjA3LC40NiwuMDlsLjcyLC4wN3YuNjNjLS42LS4wNS0xLjE0LS4wOC0xLjU5LS4wOHMtMS4wMywuMDMtMS43NywuMDhsLjA2LTEuOTVjLTEuNTEsMS4xNC0yLjQsMS43OC0yLjY4LDEuOTItLjI4LC4xNC0uNjMsLjIyLTEuMDYsLjIyLS44OSwwLTEuNTktLjI0LTIuMDktLjcxLS41LS40OC0uNzUtMS4xMS0uNzUtMS45LDAtLjUxLC4wOS0uOTcsLjI2LTEuMzlzLjM4LS43NSwuNjMtMSwuNDktLjQzLC43NC0uNTVjLjQzLS4yLDEuMTItLjQxLDIuMDktLjY0czEuOTItLjQsMi44Ni0uNTFjMC0uNy0uMDgtMS4yNS0uMjUtMS42NHMtLjQ4LS43MS0uOS0uOTYtLjkzLS4zOC0xLjU0LS4zOGMtLjQ0LDAtLjgyLC4wNi0xLjE1LC4xOHMtLjUzLC4yMi0uNiwuM2wtLjIsLjRjLS4yLC40NC0uMzUsLjc5LS40NCwxLjA0Wm01LjA4LDEuNzRjLS45NiwuMTYtMS43OCwuMzQtMi40NiwuNTRzLTEuMTYsLjQxLTEuNDQsLjYyYy0uMTcsLjEzLS4zMiwuMzEtLjQ0LC41Ni0uMTksLjM3LS4yOSwuNzgtLjI5LDEuMjMsMCwuNTUsLjE1LC45NywuNDUsMS4yOHMuNzIsLjQ2LDEuMjYsLjQ2Yy40OSwwLC45OC0uMTQsMS40Ny0uNDMsLjQ4LS4yOCwuOTYtLjcxLDEuNDQtMS4yOHYtMi45OVoiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik03NS4zNCwxMzQuOTV2LS40NmMuNzQtLjI4LDEuMzItLjUzLDEuNzYtLjc1LDAtMS43Ni0uMDItMi44OC0uMDctMy4zNiwuNzctLjI3LDEuMzktLjU1LDEuODctLjg1bC4yNywuMjJjLS4wOCwuNjEtLjE3LDEuOTYtLjI3LDQuMDUsLjU5LDAsLjk0LC4wMSwxLjA2LC4wMSwuMDcsMCwuNDUsMCwxLjE0LS4wMiwuMzgsMCwuNjctLjAyLC44Ni0uMDRsLjA4LC4wOC0uMjMsMS4wM2MtLjQ3LDAtLjg5LS4wMS0xLjI4LS4wMXMtLjkzLDAtMS42MywuMDFsLS4wNyw0LjVjLS4wMiwxLjEtLjAxLDEuNzYsLjAyLDEuOTdzLjExLC40LC4yMSwuNTZjLjEsLjE2LC4yNCwuMjksLjQsLjM4cy40NSwuMTcsLjg1LC4yMmMuMywwLC41NS0uMDEsLjc0LS4wNHMuNDMtLjA5LC43MS0uMTlsLjEzLC40M2MtLjM1LC4yNy0uNjgsLjU2LTEuMDEsLjg1LS4yOCwuMS0uNTQsLjE3LS43OSwuMi0uMjQsLjAzLS41MiwuMDUtLjg0LC4wNS0uMzksMC0uNy0uMDQtLjkzLS4xM3MtLjQ0LS4yMS0uNjQtLjM3Yy0uMTktLjE2LS4zNS0uMzYtLjQ4LS42cy0uMjEtLjYzLS4yNC0xLjE1YzAtLjUsLjAyLTEuMDUsLjA0LTEuNjUsMC0uMTIsLjAxLS4yNSwuMDEtLjM5di00LjU5aC0uNDVjLS4zNywwLS43OCwuMDItMS4yNCwuMDZaIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNODIuNzIsMTM0LjUzdi0uNjNjMS40My0uMTYsMi42My0uNDcsMy42MS0uOTNsLjI0LC4xOGMtLjA2LDEuNTctLjA5LDIuNzctLjA5LDMuNjF2Mi4wMWMuMDQsMS45MiwuMDYsMi45NSwuMDcsMy4xMSwwLC4zNywuMDUsLjY0LC4xMiwuODEsLjA0LC4wNywuMDgsLjEyLC4xNCwuMTdzLjE1LC4wOSwuMjcsLjEyYy4wNCwwLC40NSwuMDIsMS4yMywuMDN2LjYyYy0xLjEyLS4wNS0yLjAyLS4wOC0yLjY5LS4wOC0uNTksMC0xLjU2LC4wMy0yLjksLjA4di0uNjJoMS4wNWMuMTUtLjAyLC4yNy0uMDUsLjM2LS4wOSwuMDgtLjA1LC4xNS0uMTEsLjE5LS4xOCwuMDgtLjE1LC4xMy0uNDEsLjE1LS43OSwwLS4xLC4wMi0xLjE1LC4wNy0zLjE4di0xLjk1YzAtMS4xLS4wNC0xLjc1LS4xMS0xLjk2LS4wNC0uMTEtLjEyLS4xOS0uMjQtLjI1LS4xMi0uMDUtLjYxLS4wOC0xLjQ4LS4wOFptMi43LTYuNDljLjM1LDAsLjY0LC4xMiwuODgsLjM3LC4yNCwuMjQsLjM2LC41NCwuMzYsLjg5cy0uMTIsLjYzLS4zNywuODctLjUzLC4zNy0uODcsLjM3LS42NC0uMTItLjg5LS4zNy0uMzctLjUzLS4zNy0uODcsLjEyLS42NCwuMzctLjg5LC41NC0uMzcsLjg5LS4zN1oiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik05OC40MiwxNDIuMzZsLS40NCwuNzRjLS41MSwuMjctMS4wMSwuNDctMS41MSwuNi0uNSwuMTMtMS4wNiwuMTktMS42OSwuMTktMS41NSwwLTIuNzgtLjQ3LTMuNy0xLjQtLjkyLS45My0xLjM4LTIuMjItMS4zOC0zLjg1LDAtLjg2LC4xMi0xLjYxLC4zNy0yLjI1LC4yNS0uNjQsLjU1LTEuMTMsLjkxLTEuNDgsLjI0LS4yNCwuNzEtLjU2LDEuMzktLjk1LC42OC0uMzksMS4xNi0uNjQsMS40My0uNzUsLjUtLjIxLDEuMS0uMzIsMS44LS4zMiwuNjYsMCwxLjI2LC4wNywxLjc5LC4yMSwuMzQsLjA5LC42OCwuMjQsMS4wMiwuNDQtLjA5LC41Ny0uMTUsMS0uMTksMS4yOS0uMDQsLjI5LS4wOCwuODItLjE0LDEuNTloLS42M2MtLjA0LS43Mi0uMDktMS4xNi0uMTMtMS4zNC0uMDMtLjExLS4xLS4yMS0uMi0uMy0uMjctLjIxLS42MS0uMzktMS4wMi0uNTQtLjQyLS4xNS0uODctLjIzLTEuMzctLjIzLS42MiwwLTEuMTYsLjEzLTEuNjEsLjM4LS40NSwuMjUtLjgxLC42Ni0xLjA2LDEuMjFzLS4zOCwxLjI0LS4zOCwyLjA2YzAsMSwuMTgsMS45MSwuNTMsMi43MnMuODQsMS40LDEuNDQsMS43OGMuNjEsLjM3LDEuMjksLjU2LDIuMDQsLjU2LC4zOCwwLC43NC0uMDUsMS4xLS4xNCwuMzYtLjA5LC44Mi0uMjcsMS4zOC0uNTNsLjIzLC4yOVoiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xMDUuMjYsMTQzLjA5Yy4xMi0uNzEsLjE5LTEuODYsLjIxLTMuNDRoLjc1Yy4wNCwxLjA4LC4xLDEuNzEsLjE4LDEuOTEsLjA4LC4yLC4yOSwuNCwuNjEsLjYycy43NiwuNDIsMS4zMSwuNTksMS4wNywuMjYsMS41OCwuMjZjLjc1LDAsMS40My0uMTcsMi4wNi0uNTEsLjYzLS4zNCwxLjA4LS43OSwxLjM3LTEuMzUsLjI5LS41NiwuNDMtMS4xNSwuNDMtMS43OSwwLS40OS0uMDctLjkxLS4yMi0xLjI2LS4xNC0uMzUtLjM2LS42NC0uNjYtLjg2cy0uNjYtLjM3LTEuMS0uNDZjLS4yNy0uMDQtLjgyLS4xMi0xLjY0LS4yMnMtMS41Mi0uMjItMi4wOS0uMzRjLS43Ny0uMjQtMS4zMy0uNTEtMS42OS0uODNzLS42Ni0uNzMtLjg4LTEuMjVjLS4yMy0uNTItLjM0LTEuMDctLjM0LTEuNjcsMC0uODcsLjIzLTEuNjksLjY4LTIuNDYsLjQ1LS43NywxLjEzLTEuMzcsMi4wMS0xLjhzMS44NS0uNjQsMi44OS0uNjRjLjYzLDAsMS4zMSwuMDgsMi4wNSwuMjUsLjc0LC4xNywxLjQzLC40MSwyLjA3LC43My0uMSwuNDYtLjE4LC45LS4yMiwxLjNzLS4wOCwuOTktLjEsMS43OGgtLjc1Yy0uMDItMS4xNC0uMDYtMS43Ni0uMS0xLjg2LS4xOC0uMjctLjQ0LS41MS0uNzUtLjcyLS43Ni0uNDMtMS41NS0uNjQtMi4zOC0uNjQtMS4wNywwLTEuOTIsLjMzLTIuNTYsLjk4LS42NCwuNjUtLjk2LDEuNS0uOTYsMi41NCwwLC42MywuMTEsMS4xMSwuMzQsMS40NSwuMjMsLjM0LC42NCwuNjIsMS4yMywuODIsLjQxLC4xNCwxLjA3LC4yNywxLjk5LC4zOXMxLjc1LC4yNSwyLjQ5LC4zOWMuNjksLjIxLDEuMjEsLjQ1LDEuNTQsLjczLC4zMywuMjgsLjYsLjY2LC44MiwxLjEyLC4yMSwuNDYsLjMyLDEsLjMyLDEuNjIsMCwxLjQ3LS42MSwyLjc1LTEuODMsMy44NHMtMi43OSwxLjY0LTQuNzMsMS42NGMtMS40NiwwLTIuNzktLjI5LTMuOTctLjg2WiIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTExNi45NCwxMzQuNTN2LS42M2MxLjQzLS4xNiwyLjYzLS40NywzLjYxLS45M2wuMjQsLjE4Yy0uMDYsMS41Ny0uMDksMi43Ny0uMDksMy42MXYyLjAxYy4wNCwxLjkyLC4wNiwyLjk1LC4wNywzLjExLDAsLjM3LC4wNSwuNjQsLjEyLC44MSwuMDQsLjA3LC4wOCwuMTIsLjE0LC4xN3MuMTUsLjA5LC4yNywuMTJjLjA0LDAsLjQ1LC4wMiwxLjIzLC4wM3YuNjJjLTEuMTItLjA1LTIuMDItLjA4LTIuNjktLjA4LS41OSwwLTEuNTYsLjAzLTIuOSwuMDh2LS42MmgxLjA1Yy4xNS0uMDIsLjI3LS4wNSwuMzYtLjA5LC4wOC0uMDUsLjE1LS4xMSwuMTktLjE4LC4wOC0uMTUsLjEzLS40MSwuMTUtLjc5LDAtLjEsLjAyLTEuMTUsLjA3LTMuMTh2LTEuOTVjMC0xLjEtLjA0LTEuNzUtLjExLTEuOTYtLjA0LS4xMS0uMTItLjE5LS4yNC0uMjUtLjEyLS4wNS0uNjEtLjA4LTEuNDgtLjA4Wm0yLjctNi40OWMuMzUsMCwuNjQsLjEyLC44OCwuMzcsLjI0LC4yNCwuMzYsLjU0LC4zNiwuODlzLS4xMiwuNjMtLjM3LC44Ny0uNTMsLjM3LS44NywuMzctLjY0LS4xMi0uODktLjM3LS4zNy0uNTMtLjM3LS44NywuMTItLjY0LC4zNy0uODksLjU0LS4zNywuODktLjM3WiIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTEyMy41NCwxMzQuOTV2LS40NmMuNzQtLjI4LDEuMzItLjUzLDEuNzYtLjc1LDAtMS43Ni0uMDItMi44OC0uMDctMy4zNiwuNzctLjI3LDEuMzktLjU1LDEuODctLjg1bC4yNywuMjJjLS4wOCwuNjEtLjE3LDEuOTYtLjI3LDQuMDUsLjU5LDAsLjk0LC4wMSwxLjA2LC4wMSwuMDcsMCwuNDUsMCwxLjE0LS4wMiwuMzgsMCwuNjctLjAyLC44Ni0uMDRsLjA4LC4wOC0uMjMsMS4wM2MtLjQ2LDAtLjg5LS4wMS0xLjI4LS4wMXMtLjkzLDAtMS42MywuMDFsLS4wNyw0LjVjLS4wMiwxLjEtLjAxLDEuNzYsLjAyLDEuOTdzLjExLC40LC4yMSwuNTZjLjEsLjE2LC4yNCwuMjksLjQsLjM4LC4xNywuMSwuNDUsLjE3LC44NSwuMjIsLjMsMCwuNTUtLjAxLC43NC0uMDQsLjE5LS4wMywuNDMtLjA5LC43MS0uMTlsLjEzLC40M2MtLjM1LC4yNy0uNjgsLjU2LTEuMDEsLjg1LS4yOCwuMS0uNTQsLjE3LS43OSwuMi0uMjQsLjAzLS41MiwuMDUtLjg0LC4wNS0uMzksMC0uNy0uMDQtLjkzLS4xMy0uMjMtLjA5LS40NC0uMjEtLjY0LS4zN3MtLjM1LS4zNi0uNDgtLjYtLjIxLS42My0uMjQtMS4xNWMwLS41LC4wMi0xLjA1LC4wNC0xLjY1LDAtLjEyLC4wMS0uMjUsLjAxLS4zOXYtNC41OWgtLjQ1Yy0uMzcsMC0uNzgsLjAyLTEuMjQsLjA2WiIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTE0MC4yLDE0MS45MWwtLjM1LC44Yy0uNTEsLjMyLS44OCwuNTMtMS4xMiwuNjMtLjM1LC4xNS0uNzQsLjI5LTEuMTksLjM5LS40NSwuMTEtLjkyLC4xNi0xLjQxLC4xNi0uOTcsMC0xLjg1LS4yLTIuNjQtLjYxcy0xLjQtMS4wMS0xLjg0LTEuODJjLS40NC0uODEtLjY2LTEuNzUtLjY2LTIuODQsMC0uODUsLjEyLTEuNjEsLjM1LTIuMywuMjMtLjY4LC41LTEuMTksLjc5LTEuNTEsLjIxLS4yNCwuNTUtLjUxLDEtLjgxcy45LS41NSwxLjM0LS43M2MuNTgtLjI0LDEuMjEtLjM3LDEuODktLjM3LC44MywwLDEuNTcsLjE5LDIuMjQsLjU2LC42NywuMzgsMS4xNiwuODksMS40NywxLjU0cy40NiwxLjM4LC40NiwyLjJjMCwuMjEtLjAxLC40Ni0uMDQsLjc1LS41MywuMS0xLjAxLC4xNy0xLjQzLC4yLS44LC4wNi0xLjYsLjA5LTIuMzksLjA5aC0zLjU2Yy4wMSwxLjA2LC4yLDEuOTEsLjU1LDIuNTYsLjM1LC42NSwuODMsMS4xMywxLjQ1LDEuNDQsLjYyLC4zMSwxLjI2LC40NiwxLjkyLC40NiwuNDUsMCwuOS0uMDcsMS4zNC0uMjIsLjQ1LS4xNCwxLS40MSwxLjY1LS43OWwuMTgsLjE5Wm0tNy4wOS00LjU0Yy4yMSwuMDIsLjYsLjA0LDEuMTgsLjA3LDEuMSwuMDQsMS44NiwuMDYsMi4yNywuMDYsLjk4LDAsMS42My0uMDIsMS45NC0uMDYsMC0uMTgsLjAxLS4zMSwuMDEtLjQxLDAtMS4xNi0uMjQtMi4wMi0uNzEtMi41NnMtMS4xMS0uODItMS45LS44MmMtLjg0LDAtMS41MSwuMy0yLjAyLC44OS0uNTEsLjYtLjc3LDEuNTQtLjc4LDIuODJaIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTYyLjcxLDE0Mi43N2MtMS4xMiwuNDEtMi4wNCwuNjgtMi43NiwuODItMS4yNiwuMjQtMi40NiwuMzctMy41OSwuMzctMS43LDAtMy4yMi0uMzMtNC41NS0xcy0yLjM1LTEuNi0zLjA4LTIuODEtMS4wOC0yLjYyLTEuMDgtNC4yNmMwLTEuNDQsLjI2LTIuNjYsLjc4LTMuNjcsLjUyLTEuMDEsMS4xNi0xLjg0LDEuOTQtMi40OHMxLjU1LTEuMTMsMi4zMy0xLjQ0YzEuMTktLjQ3LDIuNjYtLjcxLDQuNC0uNzEsLjgyLDAsMS42OCwuMSwyLjU4LC4yOCwuOSwuMTgsMS45MiwuNDMsMy4wNiwuNzUtLjExLC4zOC0uMiwuNzUtLjI1LDEuMTFzLS4xNCwxLjEtLjIzLDIuMjJoLS42OGwtLjA2LTEuMjZjMC0uMTktLjAxLS4zNS0uMDItLjQ2cy0uMDYtLjI3LS4xNC0uNDVjLS4yLS4yNy0uNTItLjUxLS45NS0uNzItLjc1LS4yOS0xLjM3LS40OC0xLjg2LS41OC0uNDktLjEtMS4wOC0uMTQtMS43NS0uMTQtMS40LDAtMi42MiwuMy0zLjY0LC45cy0xLjgsMS40NS0yLjMzLDIuNTdjLS41MywxLjExLS43OSwyLjMzLS43OSwzLjY1LDAsMS40NSwuMzEsMi43NiwuOTMsMy45MiwuNjIsMS4xNiwxLjQ0LDIuMDUsMi40OCwyLjY3LDEuMDQsLjYyLDIuMjUsLjkyLDMuNjMsLjkyLC42NSwwLDEuMjgtLjA2LDEuODktLjE5czEuMTItLjMsMS41NS0uNTJjLjA3LS4zLC4xLS43NywuMS0xLjQydi0xLjIzYzAtLjY1LS4wMy0xLjAzLS4xLTEuMTRzLS4yNS0uMTktLjU0LS4yNWMtLjI5LS4wNi0uOTYtLjEtMi4wMS0uMTN2LS42OGwzLjQ1LC4wOGMuNjcsMCwxLjM2LS4wMywyLjA2LS4wOGwuMDcsLjUzLS44MywuNDljLS4wOSwuNzktLjEzLDEuNTItLjEzLDIuMThzLjA0LDEuMzgsLjEzLDIuMTZaIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTc0LjAyLDE0MS45MWwtLjM1LC44Yy0uNTEsLjMyLS44OCwuNTMtMS4xMiwuNjMtLjM1LC4xNS0uNzQsLjI5LTEuMTksLjM5LS40NSwuMTEtLjkyLC4xNi0xLjQxLC4xNi0uOTcsMC0xLjg1LS4yLTIuNjQtLjYxcy0xLjQtMS4wMS0xLjg0LTEuODJjLS40NC0uODEtLjY2LTEuNzUtLjY2LTIuODQsMC0uODUsLjEyLTEuNjEsLjM1LTIuMywuMjMtLjY4LC41LTEuMTksLjc5LTEuNTEsLjIxLS4yNCwuNTUtLjUxLDEtLjgxcy45LS41NSwxLjM0LS43M2MuNTgtLjI0LDEuMjEtLjM3LDEuODktLjM3LC44MywwLDEuNTcsLjE5LDIuMjQsLjU2LC42NywuMzgsMS4xNiwuODksMS40NywxLjU0cy40NiwxLjM4LC40NiwyLjJjMCwuMjEtLjAxLC40Ni0uMDQsLjc1LS41MywuMS0xLjAxLC4xNy0xLjQzLC4yLS44LC4wNi0xLjYsLjA5LTIuMzksLjA5aC0zLjU2Yy4wMSwxLjA2LC4yLDEuOTEsLjU1LDIuNTYsLjM1LC42NSwuODMsMS4xMywxLjQ1LDEuNDQsLjYyLC4zMSwxLjI2LC40NiwxLjkyLC40NiwuNDUsMCwuOS0uMDcsMS4zNC0uMjIsLjQ1LS4xNCwxLS40MSwxLjY1LS43OWwuMTgsLjE5Wm0tNy4wOS00LjU0Yy4yMSwuMDIsLjYsLjA0LDEuMTgsLjA3LDEuMSwuMDQsMS44NiwuMDYsMi4yNywuMDYsLjk4LDAsMS42My0uMDIsMS45NC0uMDYsMC0uMTgsLjAxLS4zMSwuMDEtLjQxLDAtMS4xNi0uMjQtMi4wMi0uNzEtMi41NnMtMS4xMS0uODItMS45LS44MmMtLjg0LDAtMS41MSwuMy0yLjAyLC44OS0uNTEsLjYtLjc3LDEuNTQtLjc4LDIuODJaIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTc1LjQxLDE0My42M3YtLjYyaDEuMDVjLjE1LS4wMiwuMjctLjA1LC4zNi0uMDksLjA4LS4wNSwuMTUtLjExLC4xOS0uMTgsLjA4LS4xNSwuMTMtLjQxLC4xNS0uNzksMC0uMSwuMDItMS4xNiwuMDctMy4xOHYtMS4zMmMwLS41OS0uMDEtMS4yMy0uMDMtMS45MS0uMDItLjQ0LS4wNi0uNjktLjEtLjc4LS4wNS0uMDgtLjEzLS4xNC0uMjUtLjE4cy0uNi0uMDYtMS40NC0uMDV2LS42M2MxLjQ5LS4yMSwyLjU3LS40OCwzLjI2LS44MSwuMTUtLjA3LC4yNC0uMTEsLjMtLjExcy4wOSwuMDIsLjEyLC4wNiwuMDQsLjA5LC4wNCwuMTdjMCwuMDUsMCwuMTEtLjAxLC4xOC0uMDIsLjI3LS4wNCwuODMtLjA3LDEuNjhsMi4wNi0xLjc2Yy42MS0uMjIsMS4xOC0uMzMsMS43Mi0uMzMsLjYsMCwxLjE3LC4xMiwxLjcsLjM3LC41NCwuMjQsLjk0LC41NSwxLjIxLC45MiwuMjcsLjM3LC40NSwuODMsLjU0LDEuNCwuMDUsLjMzLC4wOCwxLjI2LC4wOCwyLjc4djEuOTZjMCwuOTYsLjAzLDEuNjEsLjA4LDEuOTYsLjA0LC4yMiwuMDksLjM3LC4xNywuNDYsLjA4LC4wOSwuMiwuMTQsLjM2LC4xNmwxLjE4LC4wM3YuNjJjLS43Mi0uMDUtMS4zMi0uMDgtMS44LS4wOC0uNDEsMC0xLjEsLjAzLTIuMDYsLjA4LC4xLTEuODIsLjE1LTIuOTcsLjE1LTMuNDV2LTEuODZjMC0xLjE2LS4wNC0xLjkyLS4xMy0yLjI4LS4xMy0uNDktLjQxLS44OS0uODUtMS4yLS40NC0uMy0uOTgtLjQ1LTEuNjEtLjQ1LS41NSwwLTEuMDYsLjEzLTEuNTIsLjM5LS40NiwuMjYtLjc5LC41Ny0uOTgsLjkxLS4yLC4zNC0uMjksLjkyLS4yOSwxLjczdjEuMzRjLjA0LDEuOTIsLjA3LDIuOTYsLjA3LDMuMTEsLjAxLC4zNywuMDYsLjY0LC4xMywuODEsLjAzLC4wNywuMDcsLjEyLC4xMywuMTdzLjE1LC4wOSwuMjgsLjEyYy4wNCwwLC40NSwuMDIsMS4yMiwuMDN2LjYyYy0uOS0uMDUtMS43MS0uMDgtMi40NC0uMDgtLjYyLDAtMS42MiwuMDMtMy4wMiwuMDhaIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTk4LjA3LDE0MS45MWwtLjM1LC44Yy0uNTEsLjMyLS44OCwuNTMtMS4xMiwuNjMtLjM1LC4xNS0uNzQsLjI5LTEuMTksLjM5LS40NSwuMTEtLjkyLC4xNi0xLjQxLC4xNi0uOTcsMC0xLjg1LS4yLTIuNjQtLjYxcy0xLjQtMS4wMS0xLjg0LTEuODJjLS40NC0uODEtLjY2LTEuNzUtLjY2LTIuODQsMC0uODUsLjEyLTEuNjEsLjM1LTIuMywuMjMtLjY4LC41LTEuMTksLjc5LTEuNTEsLjIxLS4yNCwuNTUtLjUxLDEtLjgxcy45LS41NSwxLjM0LS43M2MuNTgtLjI0LDEuMjEtLjM3LDEuODktLjM3LC44MywwLDEuNTcsLjE5LDIuMjQsLjU2LC42NywuMzgsMS4xNiwuODksMS40NywxLjU0cy40NiwxLjM4LC40NiwyLjJjMCwuMjEtLjAxLC40Ni0uMDQsLjc1LS41MywuMS0xLjAxLC4xNy0xLjQzLC4yLS44LC4wNi0xLjYsLjA5LTIuMzksLjA5aC0zLjU2Yy4wMSwxLjA2LC4yLDEuOTEsLjU1LDIuNTYsLjM1LC42NSwuODMsMS4xMywxLjQ1LDEuNDQsLjYyLC4zMSwxLjI2LC40NiwxLjkyLC40NiwuNDUsMCwuOS0uMDcsMS4zNC0uMjIsLjQ1LS4xNCwxLS40MSwxLjY1LS43OWwuMTgsLjE5Wm0tNy4wOS00LjU0Yy4yMSwuMDIsLjYsLjA0LDEuMTgsLjA3LDEuMSwuMDQsMS44NiwuMDYsMi4yNywuMDYsLjk4LDAsMS42My0uMDIsMS45NC0uMDYsMC0uMTgsLjAxLS4zMSwuMDEtLjQxLDAtMS4xNi0uMjQtMi4wMi0uNzEtMi41NnMtMS4xMS0uODItMS45LS44MmMtLjg0LDAtMS41MSwuMy0yLjAyLC44OS0uNTEsLjYtLjc3LDEuNTQtLjc4LDIuODJaIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTk5LjY3LDE0My42M3YtLjYzYy44My0uMDEsMS4yOC0uMDMsMS4zNS0uMDQsLjEzLS4wMiwuMjItLjA2LC4yOC0uMTEsLjA2LS4wNSwuMTEtLjEyLC4xNS0uMiwuMDctLjE3LC4xMi0uNDQsLjEzLS44LC4wNC0xLjk3LC4wNy0zLC4wNy0zLjA5di0xLjMyYzAtLjU5LS4wMS0xLjIyLS4wMy0xLjktLjAxLS40NC0uMDUtLjY5LS4wOS0uNzctLjA1LS4wOC0uMTMtLjE0LS4yNi0uMTgtLjEyLS4wNC0uNi0uMDYtMS40NC0uMDV2LS42M2MxLjQ5LS4yMSwyLjU4LS40OCwzLjI2LS44MSwuMTUtLjA3LC4yNS0uMTEsLjMtLjExcy4wOSwuMDIsLjEyLC4wNiwuMDQsLjA5LC4wNCwuMTdjMCwuMDUsMCwuMTEtLjAxLC4xOC0uMDQsLjQ1LS4wNiwxLjE1LS4wNywyLjA5LC4zMy0uMzgsLjY0LS43NiwuOTItMS4xNHMuNDgtLjYyLC42MS0uNzNjLjIyLS4xOSwuNDgtLjM0LC43Ni0uNDZzLjU5LS4xNywuOS0uMTcsLjYyLC4wNywuOTIsLjJsLjA3LC4xNWMtLjExLC45OC0uMTcsMS44NC0uMTksMi41OWgtLjVjLS4xNy0uMzUtLjM3LS42MS0uNTktLjc3LS4yMy0uMTYtLjUxLS4yNC0uODUtLjI0LS41NywwLTEuMDUsLjIzLTEuNDUsLjdzLS42LDEuMTctLjYsMi4xMXYxLjE0YzAsLjQ5LC4wMiwxLjM4LC4wNiwyLjY3LDAsLjQ2LC4wMywuNzUsLjA2LC44N3MuMDcsLjIyLC4xMiwuMjdjLjA1LC4wNSwuMTMsLjEsLjI0LC4xNCwuMjIsLjA3LC44MiwuMTMsMS43OSwuMnYuNjNjLTEuMy0uMDUtMi40MS0uMDgtMy4zMi0uMDhzLTEuODYsLjAzLTIuNzQsLjA4WiIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTIxMC41MSwxMzYuMDVsLS41OS0uMTVjMC0uMTcsLjAxLS40LC4wMS0uNywwLS4zMSwwLS41Ni0uMDEtLjc0LC45NC0uNjEsMS43LTEuMDMsMi4zLTEuMjQsLjQ2LS4xNSwuOTctLjIzLDEuNTQtLjIzLC44NCwwLDEuNTUsLjE2LDIuMTIsLjQ4czEsLjc3LDEuMjgsMS4zNmMuMTksLjQxLC4yOSwuOTgsLjI5LDEuNjlsLS4wNCwyLjAzdjMuM2MwLC4zNSwuMDMsLjYxLC4wOSwuNzYsLjA0LC4xMSwuMTEsLjE5LC4yMSwuMjQsLjA3LC4wNCwuMjMsLjA3LC40NiwuMDlsLjcyLC4wN3YuNjNjLS42LS4wNS0xLjE0LS4wOC0xLjU5LS4wOHMtMS4wMywuMDMtMS43NywuMDhsLjA2LTEuOTVjLTEuNTEsMS4xNC0yLjQsMS43OC0yLjY4LDEuOTItLjI4LC4xNC0uNjMsLjIyLTEuMDYsLjIyLS44OSwwLTEuNTktLjI0LTIuMDktLjcxLS41LS40OC0uNzUtMS4xMS0uNzUtMS45LDAtLjUxLC4wOS0uOTcsLjI2LTEuMzlzLjM4LS43NSwuNjMtMSwuNDktLjQzLC43NC0uNTVjLjQzLS4yLDEuMTItLjQxLDIuMDktLjY0LC45Ni0uMjMsMS45Mi0uNCwyLjg2LS41MSwwLS43LS4wOC0xLjI1LS4yNS0xLjY0cy0uNDgtLjcxLS45LS45Ni0uOTMtLjM4LTEuNTQtLjM4Yy0uNDQsMC0uODIsLjA2LTEuMTUsLjE4cy0uNTMsLjIyLS42LC4zbC0uMiwuNGMtLjIsLjQ0LS4zNSwuNzktLjQ0LDEuMDRabTUuMDgsMS43NGMtLjk2LC4xNi0xLjc4LC4zNC0yLjQ2LC41NHMtMS4xNiwuNDEtMS40NCwuNjJjLS4xNywuMTMtLjMyLC4zMS0uNDQsLjU2LS4xOSwuMzctLjI5LC43OC0uMjksMS4yMywwLC41NSwuMTUsLjk3LC40NSwxLjI4cy43MiwuNDYsMS4yNiwuNDZjLjQ5LDAsLjk4LS4xNCwxLjQ3LS40MywuNDgtLjI4LC45Ny0uNzEsMS40NC0xLjI4di0yLjk5WiIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTIxOS45NSwxMzQuOTV2LS40NmMuNzQtLjI4LDEuMzItLjUzLDEuNzYtLjc1LDAtMS43Ni0uMDItMi44OC0uMDctMy4zNiwuNzctLjI3LDEuMzktLjU1LDEuODctLjg1bC4yNywuMjJjLS4wOCwuNjEtLjE3LDEuOTYtLjI3LDQuMDUsLjU5LDAsLjk0LC4wMSwxLjA2LC4wMSwuMDcsMCwuNDUsMCwxLjE0LS4wMiwuMzgsMCwuNjctLjAyLC44Ni0uMDRsLjA4LC4wOC0uMjMsMS4wM2MtLjQ2LDAtLjg5LS4wMS0xLjI4LS4wMXMtLjkzLDAtMS42MywuMDFsLS4wNyw0LjVjLS4wMiwxLjEtLjAxLDEuNzYsLjAyLDEuOTdzLjExLC40LC4yMSwuNTZjLjEsLjE2LC4yNCwuMjksLjQsLjM4LC4xNywuMSwuNDUsLjE3LC44NSwuMjIsLjMsMCwuNTUtLjAxLC43NC0uMDQsLjE5LS4wMywuNDMtLjA5LC43MS0uMTlsLjEzLC40M2MtLjM1LC4yNy0uNjgsLjU2LTEuMDEsLjg1LS4yOCwuMS0uNTQsLjE3LS43OSwuMi0uMjQsLjAzLS41MiwuMDUtLjg0LC4wNS0uMzksMC0uNy0uMDQtLjkzLS4xMy0uMjMtLjA5LS40NC0uMjEtLjY0LS4zN3MtLjM1LS4zNi0uNDgtLjYtLjIxLS42My0uMjQtMS4xNWMwLS41LC4wMi0xLjA1LC4wNC0xLjY1LDAtLjEyLC4wMS0uMjUsLjAxLS4zOXYtNC41OWgtLjQ1Yy0uMzcsMC0uNzgsLjAyLTEuMjQsLjA2WiIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTIyNy41OCwxMzguNTRjMC0xLjY1LC41My0zLDEuNTgtNC4wNCwxLjA1LTEuMDQsMi40LTEuNTcsNC4wNC0xLjU3LDEuNTUsMCwyLjgxLC40OSwzLjc4LDEuNDZzMS40NiwyLjIzLDEuNDYsMy43N2MwLDEuMDgtLjI1LDIuMDYtLjc1LDIuOTVzLTEuMjEsMS41OS0yLjEyLDIuMWMtLjkxLC41LTEuOTIsLjc2LTMuMDIsLjc2LS44NiwwLTEuNTgtLjE0LTIuMTctLjQzLS41OS0uMjktMS4wOC0uNjUtMS40NC0xLjA4cy0uNjUtLjg4LS44NC0xLjM0Yy0uMzQtLjgtLjUxLTEuNjYtLjUxLTIuNThabTIuMDktLjgyYzAsLjkxLC4xNSwxLjgzLC40NSwyLjc3cy43NCwxLjYyLDEuMzEsMi4wNWMuNTcsLjQzLDEuMTksLjY1LDEuODYsLjY1LC44NiwwLDEuNTctLjM0LDIuMTUtMS4wMnMuODYtMS43MiwuODYtMy4xM2MwLTEuMTctLjE3LTIuMTktLjUxLTMuMDQtLjM0LS44NS0uNzgtMS40NS0xLjMxLTEuOC0uNTMtLjM1LTEuMTItLjUzLTEuNzYtLjUzLS45MSwwLTEuNjQsLjMzLTIuMjEsLjk4LS41NiwuNjYtLjg1LDEuNjgtLjg1LDMuMDdaIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMjM5LjcyLDE0My42M3YtLjYzYy44My0uMDEsMS4yOC0uMDMsMS4zNS0uMDQsLjEzLS4wMiwuMjItLjA2LC4yOC0uMTEsLjA2LS4wNSwuMTEtLjEyLC4xNS0uMiwuMDctLjE3LC4xMi0uNDQsLjEzLS44LC4wNC0xLjk3LC4wNy0zLC4wNy0zLjA5di0xLjMyYzAtLjU5LS4wMS0xLjIyLS4wMy0xLjktLjAxLS40NC0uMDUtLjY5LS4wOS0uNzctLjA1LS4wOC0uMTMtLjE0LS4yNi0uMTgtLjEyLS4wNC0uNi0uMDYtMS40NC0uMDV2LS42M2MxLjQ5LS4yMSwyLjU4LS40OCwzLjI2LS44MSwuMTUtLjA3LC4yNS0uMTEsLjMtLjExcy4wOSwuMDIsLjEyLC4wNiwuMDQsLjA5LC4wNCwuMTdjMCwuMDUsMCwuMTEtLjAxLC4xOC0uMDQsLjQ1LS4wNiwxLjE1LS4wNywyLjA5LC4zMy0uMzgsLjY0LS43NiwuOTItMS4xNHMuNDgtLjYyLC42MS0uNzNjLjIyLS4xOSwuNDgtLjM0LC43Ni0uNDZzLjU5LS4xNywuOS0uMTcsLjYyLC4wNywuOTIsLjJsLjA3LC4xNWMtLjExLC45OC0uMTcsMS44NC0uMTksMi41OWgtLjVjLS4xNy0uMzUtLjM3LS42MS0uNTktLjc3LS4yMy0uMTYtLjUxLS4yNC0uODUtLjI0LS41NywwLTEuMDUsLjIzLTEuNDUsLjdzLS42LDEuMTctLjYsMi4xMXYxLjE0YzAsLjQ5LC4wMiwxLjM4LC4wNiwyLjY3LDAsLjQ2LC4wMywuNzUsLjA2LC44N3MuMDcsLjIyLC4xMiwuMjdjLjA1LC4wNSwuMTMsLjEsLjI0LC4xNCwuMjIsLjA3LC44MiwuMTMsMS43OSwuMnYuNjNjLTEuMy0uMDUtMi40MS0uMDgtMy4zMi0uMDhzLTEuODYsLjAzLTIuNzQsLjA4WiIvPjwvZz48Zz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0wLDQ3LjU4di0zLjE3YzEuMjcsLjAzLDMuMjEsLjA4LDUuODEsLjE1bDkuMzgsLjI1YzEuODYsMCw0Ljc0LS4wNyw4LjY0LS4yLDUuMDgtLjIsOC4wMi0uMyw4Ljg0LS4zLDYuMjIsMCwxMC43NSwuNTYsMTMuNiwxLjY4LDIuODUsMS4xMiw1LjA1LDIuOTUsNi42Miw1LjQ3czIuMzQsNS4yOCwyLjM0LDguMjVjMCwyLjc3LS43Myw1LjUzLTIuMiw4LjI3LTEuNDYsMi43NC0zLjU5LDUuMDItNi4zNyw2Ljg0LTIuNzgsMS44Mi02LjQsMy4yMi0xMC44Niw0LjIxLC44MSwxLjE2LDIuNzMsMy43Myw1Ljc2LDcuNzNsMTIuMywxNi40NWMzLjUyLDQuNTksNS41Nyw3LjE1LDYuMTUsNy42OCwuMjksLjIzLC41OSwuNCwuODgsLjUsLjQ5LC4xNywxLjU2LC4yNSwzLjIyLC4yNXYzLjE3Yy0yLjQ3LS4yLTQuNjQtLjMtNi40OS0uM3MtNC4yOCwuMS03LjA4LC4zYy0yLjEyLTIuNDgtNS42Ni03LjMxLTEwLjY0LTE0LjUxLTIuNzctNC01LjIxLTcuMzMtNy4zMi0xMC4wMS0zLjQyLTQuNDMtNi42Ny04LjQ0LTkuNzctMTIuMDRsLjQ5LTEuNDljMS42OSwuMSwyLjk4LC4xNSwzLjg2LC4xNSw1LjkyLDAsMTAuNDItMS40MiwxMy40OC00LjI2LDMuMDYtMi44NCw0LjU5LTYuNTksNC41OS0xMS4yNSwwLTQuMDYtMS4zMi03LjI5LTMuOTYtOS42OC0yLjY0LTIuMzktNi42Mi0zLjU5LTExLjk2LTMuNTktMy4zNSwwLTYuNjQsLjUxLTkuODYsMS41NC0uMTMsMS43OC0uMjMsMy40NS0uMjksNS0uMDMsLjQ2LS4xNSw1LjI3LS4zNCwxNC40MnYyMS45OWMwLDQuNDksLjA2LDguODcsLjIsMTMuMTMsLjA2LDMuMTQsLjI4LDUsLjY2LDUuNiwuMzcsLjU5LC45OCwxLjAzLDEuODMsMS4zMSwuODUsLjI4LDMuMTksLjQ1LDcuMDMsLjUydjMuMTdjLTQuNjItLjI2LTguODctLjQtMTIuNzQtLjQtMy4xMiwwLTguMzgsLjEzLTE1Ljc3LC40di0zLjE3YzMuODQtLjA3LDYuMTgtLjI0LDcuMDMtLjUyLC44NS0uMjgsMS40My0uNjcsMS43Ni0xLjE2LC4zOS0uNjYsLjYzLTIuMjYsLjczLTQuODEsLjAzLS42OSwuMS01LjM4LC4yLTE0LjA3di0yMi45NGMwLTQuNDktLjA1LTguODgtLjE1LTEzLjE4LS4xLTMuMTQtLjMzLTQuOTktLjcxLTUuNTctLjM3LS41OC0uOTgtMS4wMS0xLjgxLTEuMjktLjgzLS4yOC0zLjE4LS40NS03LjA2LS41MloiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xMDcuNzEsMTA3LjEzbC0xLjU2LDMuNTdjLTIuMjUsMS40Mi0zLjg5LDIuMzYtNC45MywyLjgyLTEuNTMsLjY5LTMuMjgsMS4yOC01LjI1LDEuNzYtMS45NywuNDgtNC4wNCwuNzItNi4yMywuNzItNC4zLDAtOC4xOC0uOTEtMTEuNjYtMi43Mi0zLjQ4LTEuODItNi4xOC00LjUzLTguMTEtOC4xNS0xLjkzLTMuNjItMi44OS03Ljg1LTIuODktMTIuNzEsMC0zLjgsLjUxLTcuMjIsMS41NC0xMC4yOCwxLjAzLTMuMDUsMi4xOS01LjMxLDMuNDktNi43NiwuOTQtMS4wNiwyLjQxLTIuMjcsNC4zOS0zLjY0LDEuOTktMS4zNywzLjk2LTIuNDUsNS45MS0zLjI0LDIuNTctMS4wOSw1LjM1LTEuNjMsOC4zNS0xLjYzLDMuNjUsMCw2Ljk0LC44NCw5Ljg5LDIuNTMsMi45NSwxLjY4LDUuMSwzLjk4LDYuNDcsNi44OSwxLjM3LDIuOTEsMi4wNSw2LjE5LDIuMDUsOS44NiwwLC45Mi0uMDcsMi4wNS0uMiwzLjM3LTIuMzUsLjQ2LTQuNDUsLjc2LTYuMzEsLjg5LTMuNTIsLjI2LTcuMDQsLjQtMTAuNTYsLjRoLTE1LjdjLjA2LDQuNzIsLjg3LDguNTUsMi40MiwxMS40NywxLjU1LDIuOTIsMy42OCw1LjA4LDYuNCw2LjQ2LDIuNzIsMS4zOSw1LjU0LDIuMDgsOC40NywyLjA4LDEuOTksMCwzLjk2LS4zMiw1LjkzLS45NywxLjk3LS42NCw0LjQtMS44Miw3LjMtMy41NGwuNzgsLjg0Wm0tMzEuMy0yMC4zMWMuOTEsLjEsMi42NCwuMiw1LjE5LC4zLDQuODYsLjE3LDguMiwuMjUsMTAuMDMsLjI1LDQuMzQsMCw3LjE5LS4wOCw4LjU2LS4yNSwuMDMtLjc5LC4wNS0xLjQsLjA1LTEuODMsMC01LjItMS4wNC05LjAyLTMuMTMtMTEuNDZzLTQuODgtMy42NS04LjM3LTMuNjVjLTMuNjksMC02LjY1LDEuMzMtOC45MSw0LTIuMjUsMi42Ny0zLjM5LDYuODgtMy40MiwxMi42NFoiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xMTQuNzUsNzUuOTd2LTIuMDhjMy4yNS0xLjI1LDUuODQtMi4zOCw3Ljc2LTMuMzcsMC03Ljg2LS4xLTEyLjg4LS4yOS0xNS4wNiwzLjM4LTEuMTksNi4xMy0yLjQ2LDguMjUtMy44MWwxLjE3LC45OWMtLjM2LDIuNzQtLjc1LDguNzktMS4xNywxOC4xMywyLjYsLjAzLDQuMTcsLjA1LDQuNjksLjA1LC4yOSwwLDEuOTctLjAzLDUuMDMtLjEsMS42OS0uMDMsMi45Ni0uMSwzLjgxLS4ybC4zNCwuMzUtMS4wMyw0LjYxYy0yLjA1LS4wMy0zLjk0LS4wNS01LjY2LS4wNXMtNC4xMiwuMDItNy4xOCwuMDVsLS4yOSwyMC4xNmMtLjEsNC45Mi0uMDcsNy44NiwuMSw4LjgyLC4xNiwuOTYsLjQ3LDEuNzksLjkzLDIuNSwuNDYsLjcxLDEuMDUsMS4yOCwxLjc4LDEuNzEsLjczLC40MywxLjk4LC43NiwzLjc0LC45OSwxLjMzLDAsMi40Mi0uMDYsMy4yNS0uMTcsLjgzLS4xMiwxLjg4LS40LDMuMTUtLjg3bC41OSwxLjkzYy0xLjUzLDEuMjItMy4wMSwyLjQ5LTQuNDQsMy44MS0xLjI0LC40Ni0yLjM5LC43Ny0zLjQ3LC45MnMtMi4zMSwuMjItMy43MSwuMjJjLTEuNzMsMC0zLjEtLjItNC4xMy0uNTlzLTEuOTYtLjk1LTIuODEtMS42NmMtLjg1LS43MS0xLjU1LTEuNjEtMi4xLTIuNy0uNTUtMS4wOS0uOTEtMi44MS0xLjA3LTUuMTUsLjAzLTIuMjUsLjEtNC43MSwuMi03LjM4LC4wMy0uNTMsLjA1LTEuMTEsLjA1LTEuNzN2LTIwLjU2aC0yYy0xLjYzLDAtMy40NSwuMDgtNS40NywuMjVaIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTQ3LjM2LDc1Ljk3di0yLjA4YzMuMjUtMS4yNSw1Ljg0LTIuMzgsNy43Ni0zLjM3LDAtNy44Ni0uMS0xMi44OC0uMjktMTUuMDYsMy4zOC0xLjE5LDYuMTQtMi40Niw4LjI1LTMuODFsMS4xNywuOTljLS4zNiwyLjc0LS43NSw4Ljc5LTEuMTcsMTguMTMsMi42LC4wMyw0LjE3LC4wNSw0LjY5LC4wNSwuMjksMCwxLjk3LS4wMyw1LjAzLS4xLDEuNjktLjAzLDIuOTYtLjEsMy44MS0uMmwuMzQsLjM1LTEuMDMsNC42MWMtMi4wNS0uMDMtMy45NC0uMDUtNS42Ni0uMDVzLTQuMTIsLjAyLTcuMTgsLjA1bC0uMjksMjAuMTZjLS4xLDQuOTItLjA3LDcuODYsLjEsOC44MiwuMTYsLjk2LC40NywxLjc5LC45MywyLjUsLjQ2LC43MSwxLjA1LDEuMjgsMS43OCwxLjcxLC43MywuNDMsMS45OCwuNzYsMy43NCwuOTksMS4zMywwLDIuNDItLjA2LDMuMjUtLjE3LC44My0uMTIsMS44OC0uNCwzLjE1LS44N2wuNTksMS45M2MtMS41MywxLjIyLTMuMDEsMi40OS00LjQ0LDMuODEtMS4yNCwuNDYtMi4zOSwuNzctMy40NywuOTJzLTIuMzEsLjIyLTMuNzEsLjIyYy0xLjczLDAtMy4xLS4yLTQuMTMtLjU5cy0xLjk2LS45NS0yLjgxLTEuNjZjLS44NS0uNzEtMS41NS0xLjYxLTIuMS0yLjctLjU1LTEuMDktLjkxLTIuODEtMS4wNy01LjE1LC4wMy0yLjI1LC4xLTQuNzEsLjItNy4zOCwuMDMtLjUzLC4wNS0xLjExLC4wNS0xLjczdi0yMC41NmgtMmMtMS42MywwLTMuNDUsLjA4LTUuNDcsLjI1WiIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTE4MC4yMywxMTQuODF2LTIuODdsNC41OS0uMDVjLjcyLS4wMywxLjI2LS4xNiwxLjY0LS4zNywuMzctLjIxLC42Ni0uNDksLjg1LS44MiwuMzYtLjY2LC41Ny0xLjgzLC42My0zLjUyLC4wMy0uNDMsLjE1LTUuMTYsLjM0LTE0LjIxdi0yMC41NGMwLTUuNTEtLjEtMTEuMi0uMjktMTcuMDgtLjEzLTMuOTYtLjMxLTYuMTctLjU0LTYuNjMtLjE2LS4zMy0uNDItLjU2LS43OC0uNjktLjQ5LS4yMy0yLjczLS4zNS02Ljc0LS4zNXYtMi45MmM3LjM2LS45MiwxMi40Ny0yLjA4LDE1LjMzLTMuNDcsLjQyLS4yLC43NS0uMywuOTgtLjNzLjQxLC4wNywuNTQsLjIyYy4xMywuMTUsLjIsLjM2LC4yLC42MiwwLC4yMy0uMDMsLjU2LS4xLC45OWwtLjA1LDEuNjNjLS4xNiw1LjkxLS4yNiwxMC45NC0uMjksMTUuMWwtLjEsNy43MnYyNS42OWMuMTYsOC41OCwuMjYsMTMuMjIsLjI5LDEzLjkxLC4wMywxLjY1LC4yMywyLjg1LC41OSwzLjYxLC4xMywuMywuMzMsLjU1LC41OSwuNzcsLjI2LC4yMSwuNjUsLjM5LDEuMTcsLjUyLC4yMywuMDMsMi4wMywuMDgsNS40MiwuMTV2Mi44N2MtNC40My0uMjYtOC4zMi0uNC0xMS42Ny0uNHMtNy4zOSwuMTMtMTIuNiwuNFoiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0yNDkuOTUsMTA3LjEzbC0xLjU2LDMuNTdjLTIuMjUsMS40Mi0zLjg5LDIuMzYtNC45MywyLjgyLTEuNTMsLjY5LTMuMjgsMS4yOC01LjI1LDEuNzYtMS45NywuNDgtNC4wNCwuNzItNi4yMywuNzItNC4zLDAtOC4xOC0uOTEtMTEuNjYtMi43MnMtNi4xOC00LjUzLTguMTEtOC4xNS0yLjg5LTcuODUtMi44OS0xMi43MWMwLTMuOCwuNTEtNy4yMiwxLjU0LTEwLjI4LDEuMDMtMy4wNSwyLjE5LTUuMzEsMy40OS02Ljc2LC45NC0xLjA2LDIuNDEtMi4yNyw0LjM5LTMuNjQsMS45OS0xLjM3LDMuOTYtMi40NSw1LjkxLTMuMjQsMi41Ny0xLjA5LDUuMzUtMS42Myw4LjM1LTEuNjMsMy42NSwwLDYuOTQsLjg0LDkuODksMi41MywyLjk1LDEuNjgsNS4xLDMuOTgsNi40Nyw2Ljg5LDEuMzcsMi45MSwyLjA1LDYuMTksMi4wNSw5Ljg2LDAsLjkyLS4wNywyLjA1LS4yLDMuMzctMi4zNSwuNDYtNC40NSwuNzYtNi4zMSwuODktMy41MiwuMjYtNy4wNCwuNC0xMC41NiwuNGgtMTUuN2MuMDYsNC43MiwuODcsOC41NSwyLjQyLDExLjQ3LDEuNTUsMi45MiwzLjY4LDUuMDgsNi40LDYuNDYsMi43MiwxLjM5LDUuNTQsMi4wOCw4LjQ3LDIuMDgsMS45OSwwLDMuOTYtLjMyLDUuOTMtLjk3LDEuOTctLjY0LDQuNC0xLjgyLDcuMy0zLjU0bC43OCwuODRabS0zMS4zLTIwLjMxYy45MSwuMSwyLjY0LC4yLDUuMTksLjMsNC44NiwuMTcsOC4yLC4yNSwxMC4wMywuMjUsNC4zNCwwLDcuMTktLjA4LDguNTYtLjI1LC4wMy0uNzksLjA1LTEuNCwuMDUtMS44MywwLTUuMi0xLjA0LTkuMDItMy4xMy0xMS40Ni0yLjA5LTIuNDQtNC44OC0zLjY1LTguMzctMy42NS0zLjY5LDAtNi42NSwxLjMzLTguOTEsNC0yLjI1LDIuNjctMy4zOSw2Ljg4LTMuNDIsMTIuNjRaIi8+PC9nPjwvZz48L2c+PC9zdmc+');
}
.wd-100 {
width: 100px;
}
.wd-200 {
width: 200px;
}
.wd-300 {
width: 300px;
}
.wd-400 {
width: 400px;
}
.hi-100 {
height: 100px;
}
.hi-200 {
height: 200px;
}
.hi-300 {
height: 300px;
}
.hi-400 {
height: 400px;
}
.margin-center {
margin-right: auto;
margin-left: auto;
}
.text-center {
text-align: center;
}
</style>
${title === "" ? `<script>
var title = document.querySelector(".title");
var dom = document.createElement("title");
if (title) {
  dom.innerText = title + " | Rettle"
} else {
  dom.innerText = "Error | Rettle"
}
document.head.appendChild(dom);
</script>`:""}
</head>
<body>
<div>
${title !== "" ? `<h1 class="title">${title}</h1>`:""}
<div>
${contents}
</div>
</div>
</body>
</html>
  `
}


export const errorTemplate = (value: string) => {
  return `<div class="error">${value}</div>`
}