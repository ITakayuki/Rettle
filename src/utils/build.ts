const transformEntry = (paths: Array<string>) => {
  const path = require("path");
  let entry = {};
  const resolvePath = path.resolve("./");
  for (const filePath of paths) {
    entry = Object.assign(entry, {
      [filePath.replace(path.extname(filePath), "").replace(path.resolve("./src/views/"), "")]: filePath
    })
  }
  return entry;
}

exports.buildReact = (filePaths: Array<string>) => {
  const Webpack = require("webpack");
  const path = require("path");
  const nodeExternals = require("webpack-node-externals");
  const entry = transformEntry(filePaths);
  console.log(entry)
  const compiler = Webpack({
    mode: "production",
    target: 'node',
    externalsPresets: { node: true },
    watch: true,
    externals: [
      nodeExternals({
        modulesFromFile: {
          exclude: ['dependencies'],
          include: ['devDependencies'],
        }
      }),
    ],
    entry,
    output: {
      filename: '[name].js',
      path: path.resolve("./", 'cache'),
    },
    module: {
      rules: [
        {
          test: /\.ts?x$/,
          use: [
            {
              loader: 'ts-loader',
            },
          ],
        },
        {
          test: /\.ts?x$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [[
                "@babel/preset-react",
                {
                  "runtime": "automatic",
                  "importSource": "@emotion/react"
                }
              ]],
              plugins: [['@emotion/babel-plugin', {
                "sourceMap": true,
                "autoLabel": "always",
                "labelFormat": "[filename]__[local]",
                "cssPropOptimization": true
              }]]
            }
          }
        },
      ]
    }
  }, (err: any, str: any) => {
    console.log(err, str)
  });
}

exports.watchBuildFile = () => {
  const chokidar = require("chokidar")
  const glob = require("glob");
  const path = require("path");
  const watcherPaths = glob.sync(path.join(path.resolve("./cache/"), "/**/*"))
  const cacheViews = glob.sync(path.resolve("./cache/**/*.js"))
  const watcher = chokidar.watch(watcherPaths);

}