const path = require("path");

module.exports = {
  testEnvironment: "jsdom",
  rootDir: ".",
  roots: ["<rootDir>/src"],
  moduleDirectories: ["node_modules", path.resolve(__dirname)],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
    "\\.(css|scss|sass)$": "<rootDir>/test/style-mock.js",
    "\\.(png|jpg|jpeg|gif|svg|webp|woff2?|ttf|otf|eot)$":
      "<rootDir>/test/file-mock.js",
  },
  setupFilesAfterEach: ["<rootDir>/test/setup.js"],
  testMatch: ["**/__tests__/**/*.test.js", "**/?(*.)+(spec|test).js"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!src/index.js",
    "!src/**/*.scss",
    "!src/assets/**",
  ],
  coverageThreshold: {
    global: {
      lines: 30,
      statements: 30,
      functions: 25,
      branches: 20,
    },
    "src/Lib/Utils/**/*.js": {
      lines: 70,
      statements: 70,
      functions: 70,
      branches: 60,
    },
  },
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(react-dnd|@react-dnd|dnd-core|react-dnd-html5-backend)/)",
  ],
};
