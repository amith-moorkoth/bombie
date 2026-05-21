const path = require("path");
const webpack = require("webpack");
const paths = require("./paths");

// Load .env into process.env. .env is gitignored; .env.example is the template.
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// publicPath drives both the asset URL prefix and the router basename.
// For GitHub Pages under https://<user>.github.io/bombie/ set PUBLIC_URL_PATH=/bombie/.
const publicUrlPath = process.env.PUBLIC_URL_PATH || "/";
const isProduction = process.env.NODE_ENV === "production";

// Content Security Policy injected into the <meta> tag in index.html.
//
// Notes / limitations of meta CSP:
//   - `frame-ancestors` is ignored when set via <meta> — set it via the host's
//     HTTP headers if your platform supports them (GitHub Pages does not).
//   - In dev, webpack-dev-server's HMR client uses `eval`/`new Function`, so
//     'unsafe-eval' is required to avoid console errors and broken HMR.
//   - In production we keep script-src to 'self' (the SPA redirect lives in
//     spa-redirect.js, not inline, so this is enough).
//
// MUI/emotion injects styles at runtime, so 'unsafe-inline' on style-src is
// load-bearing in both modes.
const cspMeta = isProduction
  ? [
      "default-src 'self'",
      "img-src 'self' data: blob:",
      "script-src 'self'",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' data:",
      "connect-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ")
  : [
      "default-src 'self'",
      "img-src 'self' data: blob:",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' data:",
      "connect-src 'self' ws: wss: http: https:",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ");

module.exports = {
  entry: [paths.src + "/index.js"],

  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      root: __dirname,
      src: paths.src,
    },
  },

  output: {
    path: paths.build,
    filename: "[name].bundle.js",
    publicPath: publicUrlPath,
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.src + "/assets",
          to: "assets",
          globOptions: { ignore: ["**/.DS_Store"] },
        },
        {
          // GitHub Pages SPA fallback — copied verbatim, not template-processed.
          from: paths.public + "/404.html",
          to: "404.html",
        },
        {
          // External SPA redirect script (referenced by index.html). Lives in
          // its own file so a strict prod CSP can keep script-src to 'self'.
          from: paths.public + "/spa-redirect.js",
          to: "spa-redirect.js",
        },
      ],
    }),
    new HtmlWebpackPlugin({
      favicon: paths.src + "/assets/icons/fav-icon.png",
      template: paths.public + "/index.html",
      filename: "index.html",
      templateParameters: { cspMeta },
    }),
    // Expose a small, explicit allowlist of env vars to the bundle.
    new webpack.DefinePlugin({
      PUBLIC_URL_PATH: JSON.stringify(publicUrlPath),
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { sourceMap: true, importLoaders: 1 },
          },
          {
            loader: "sass-loader",
            options: {
              // The legacy JS API is removed in Dart Sass 2.0.
              api: "modern",
              sourceMap: true,
            },
          },
        ],
      },
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: "asset/resource" },
      { test: /\.(woff2?|eot|ttf|otf|svg)$/, type: "asset/inline" },
    ],
  },
};
