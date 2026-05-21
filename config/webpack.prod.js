const paths = require("./paths");
const { mergeWithRules } = require("webpack-merge");
const common = require("./webpack.common.js");

// mergeWithRules replaces the CSS rule's `use` chain instead of letting the
// default merger append a second copy. Without this, prod ends up running
// css-loader + sass-loader twice on the same file (once from common.js,
// once from this file) and the second pass fails because it receives
// already-transformed CSS instead of raw SCSS.
const merge = mergeWithRules({
  module: {
    rules: {
      test: "match",
      use: "replace",
    },
  },
});

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const shouldAnalyze = process.env.ANALYZE === "true";

const plugins = [
  new MiniCssExtractPlugin({
    filename: "styles/[name].[contenthash].css",
    chunkFilename: "styles/[id].[contenthash].css",
  }),
];

if (shouldAnalyze) {
  plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
      reportFilename: "bundle-report.html",
    })
  );
}

module.exports = merge(common, {
  mode: "production",
  // "hidden-source-map" emits maps but does not reference them from bundles —
  // safe to upload to an error tracker without exposing source to end users.
  devtool: "hidden-source-map",
  output: {
    path: paths.build,
    filename: "js/[name].[contenthash].bundle.js",
    chunkFilename: "js/[name].[contenthash].chunk.js",
    clean: true,
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 2, sourceMap: false },
          },
          {
            loader: "sass-loader",
            options: { api: "modern" },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        terserOptions: {
          compress: { drop_console: true },
          format: { comments: false },
        },
        extractComments: false,
      }),
    ],
    runtimeChunk: { name: "runtime" },
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        mui: {
          test: /[\\/]node_modules[\\/](@mui|@emotion)[\\/]/,
          name: "vendor-mui",
          priority: 30,
        },
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|scheduler)[\\/]/,
          name: "vendor-react",
          priority: 20,
        },
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          priority: 10,
        },
      },
    },
  },
  performance: {
    hints: "warning",
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
