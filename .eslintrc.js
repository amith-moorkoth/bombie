module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
    jest: true,
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 2022,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
    babelOptions: {
      presets: ["@babel/preset-env", "@babel/preset-react"],
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["react", "react-hooks", "import", "jsx-a11y", "prettier"],
  globals: {
    PUBLIC_URL_PATH: "readonly",
  },
  settings: {
    react: { version: "detect" },
    "import/resolver": {
      alias: {
        map: [["src", "./src"]],
        extensions: [".js", ".jsx"],
      },
    },
  },
  rules: {
    "prettier/prettier": "error",
    "no-debugger": "error",
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "react/prop-types": "off",
    "react/no-typos": "error",
    "react/no-unused-state": "error",
    "react/no-danger": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "import/no-duplicates": "error",
    "import/no-unresolved": "error",
    "import/named": "error",
    "jsx-a11y/anchor-is-valid": "warn",
  },
  overrides: [
    {
      files: ["**/*.test.js", "**/*.test.jsx", "**/__tests__/**/*"],
      env: { jest: true },
      rules: {
        "no-console": "off",
      },
    },
    {
      files: ["config/**/*.js", "*.config.js", ".eslintrc.js"],
      env: { node: true },
      rules: {
        "no-console": "off",
      },
    },
  ],
};
