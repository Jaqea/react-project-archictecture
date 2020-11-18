module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  settings: {
    "import/resolver": {
      webpack: {
        config: "./webpack/webpack.base.conf.js",
      },
    },
  },
  extends: ["eslint:recommended", "airbnb-base", "plugin:prettier/recommended"],
  parserOptions: {
    parser: "babel-eslint",
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["react", "prettier", "babel"],
  rules: {
    "prettier/prettier": "error",
    quotes: [1, "double"],
    "import/extensions": [
      "error",
      "always",
      {
        js: "never",
        jsx: "never",
      },
    ],
    "global-require": 0,
    "import/prefer-default-export": 0,
    "import/no-extraneous-dependencies": 0,
    "no-console": 0,
    "no-param-reassign": 0,
    "no-unused-vars": 0,
    "class-methods-use-this": 0,
    "no-underscore-dangle": 0,
    "no-useless-constructor": 0,
    "no-restricted-syntax": 0,
    "no-alert": 0,
  },
};
