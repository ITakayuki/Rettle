
exports.getFiles =  () => {
  const glob = require("glob");
  const path = require("path");
  const {buildReact, watchBuildFile} = require("./utils/build");
  const childProcess = require("child_process");
  const files = glob.sync(path.resolve("./src/views/**/*.{tsx,jsx,ts,js}")) as Array<string>;
  buildReact(files);
  watchBuildFile();
  childProcess.fork(path.join(__dirname, "./server.js"));
}