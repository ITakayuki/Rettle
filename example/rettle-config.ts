import { defineOption } from "rettle";
export default defineOption(() => {
  return {
    outDir: "htdocs",
    header: {
      meta: [
        {name: "viewport", content: "width=device-width, initial-scale=1"},
      ],
      link: [
        {rel: "shortcut icon", href: "/favicon.ico"}
      ]
    },
  };
});
