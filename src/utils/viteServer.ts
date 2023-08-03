import { config } from "./config";
import { createServer } from "vite";
import { vitePlugin } from "./vitePlugin";
import FullReload from "vite-plugin-full-reload";
export const wakeupViteServer = async () => {
  const vite = await createServer({
    plugins: [vitePlugin, FullReload(["./**/*"])],
    server: {
      port: config.server.port,
      host: config.server.host,
      watch: {
        usePolling: true,
      },
    },
    publicDir: config.static,
    base: config.pathPrefix,
    define: {
      "process.env": JSON.stringify(Object.assign(process.env, config.define)),
    },
  });
  await vite.listen();
  vite.printUrls();
};
