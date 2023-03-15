const paths = require("./paths");

const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  // Set the mode to development or production
  mode: "development",

  // Control how source maps are generated
  devtool: "inline-source-map",

  // Spin up a server for quick development
  devServer: {
    historyApiFallback: true,
    static: paths.build,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        router: () => "https://localhost:44379/",
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/api": "",
        },
        //logLevel: "debug" /*optional*/,
      },
    },
  },

  plugins: [
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),
  ],
});
