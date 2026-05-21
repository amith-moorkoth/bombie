module.exports = (api) => {
  const isTest = api.env("test");
  api.cache.using(() => process.env.NODE_ENV);

  return {
    presets: [
      [
        "@babel/preset-env",
        {
          // Let Jest transform to CommonJS; webpack keeps ESM for tree-shaking.
          modules: isTest ? "commonjs" : false,
          targets: isTest
            ? { node: "current" }
            : {
                browsers: [
                  "last 2 Chrome versions",
                  "last 2 Firefox versions",
                  "last 2 Safari versions",
                  "last 2 Edge versions",
                ],
              },
        },
      ],
      [
        "@babel/preset-react",
        { runtime: "automatic" },
      ],
    ],
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "react-html-attrs",
    ],
  };
};
