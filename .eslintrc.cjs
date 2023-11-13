module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    // "plugin:import/recommended",
    // "standard-with-typescript",
    // "plugin:promise/recommended",
    "plugin:react-hooks/recommended"
    // "plugin:@tanstack/eslint-plugin-query/recommended"
  ],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    react: {
      version: "detect"
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true
      }
    }
  },
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json"
  },
  plugins: [
    "react",
    "react-hooks",
    "@typescript-eslint",
    "prettier",
    "react-refresh",
    "import",
    "promise",
    "simple-import-sort",
    "@tanstack/query",
    "@stylistic"
  ],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    quotes: "off",
    "@typescript-eslint/quotes": "off",
    "@typescript-eslint/space-before-function-paren": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": 0,
    "multiline-ternary": "off",
    "@typescript-eslint/indent": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
        semi: false
      }
    ]
  }
}
