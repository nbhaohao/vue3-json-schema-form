const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");

const IS_LIB = process.env.TYPE === "lib";

module.exports = {
  configureWebpack: {
    plugins: [
      IS_LIB ? null : new MonacoWebpackPlugin(),
      new CircularDependencyPlugin({
        // exclude detection of files based on a RegExp
        exclude: /node_modules/,
        // include spec ific files based on a RegExp
        include: /\.(tsx|vue)$/,
        // add errors to webpack instead of warnings
        failOnError: true,
        // allow import cycles that include an asyncronous import,
        // e.g. via import(/* webpackMode: "weak" */ './file.js')
        allowAsyncCycles: false,
        // set the current working directory for displaying module paths
        cwd: process.cwd(),
      }),
    ].filter(Boolean),
  },
};
