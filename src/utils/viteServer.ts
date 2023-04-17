import { config } from "./config";
import { createServer } from "vite";
import { vitePlugin } from "./vitePlugin";

export const wakeupViteServer = async () => {
  const vite = await createServer({
    plugins: [vitePlugin],
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
      "process.env": JSON.stringify(Object.assign(process.env, config.envs)),
    },
  });
  await vite.listen();
  vite.printUrls();
};
