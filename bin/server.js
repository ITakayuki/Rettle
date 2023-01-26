"use strict";
const runServer = () => {
    const StaticServer = require("static-server");
    const path = require("path");
    const { networkInterfaces } = require('os');
    const { getConfigure } = require("./utils/config");
    const config = getConfigure();
    const host = networkInterfaces()["en0"][1].address;
    const server = new StaticServer({
        rootPath: path.join(config.outDir, config.pathPrefix),
        port: config.port,
        host: host,
        followSymlink: true,
        templates: {
            notFound: path.join(__dirname, "../server/404.html")
        }
    });
    server.start(function () {
        console.log('Server listening to', `http://${host}:${server.port}`);
    });
};
runServer();
