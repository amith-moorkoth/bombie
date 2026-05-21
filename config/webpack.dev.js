const paths = require("./paths");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

// API proxy target read from .env (see .env.example). Falls back to a local
// dev URL; never commit a real backend address here.
const apiProxyTarget =
  process.env.API_PROXY_TARGET || "http://localhost:3001";

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",

  devServer: {
    historyApiFallback: true,
    static: paths.build,
    open: true,
    compress: true,
    hot: true,
    port: Number(process.env.DEV_SERVER_PORT) || 8080,
    proxy: {
      "/api": {
        target: apiProxyTarget,
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/api": "" },
      },
    },
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],
});
