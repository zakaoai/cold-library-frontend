import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"
import { configs as ReactQueryConfigs, rules as ReactQueryRules } from "@tanstack/eslint-plugin-query"
import eslintImport from "eslint-plugin-import"
import prettierPlugin from "eslint-plugin-prettier"
import promise from "eslint-plugin-promise"
import react from "eslint-plugin-react"
import reactHook from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import globals from "globals"

const compat = new FlatCompat()

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...compat.extends("love"),
  ...compat.extends("plugin:@typescript-eslint/recommended"),
  ...compat.extends("plugin:react/recommended"),
  ...compat.extends("plugin:react/jsx-runtime"),
  ...compat.extends("plugin:@typescript-eslint/recommended"),
  ...compat.extends("plugin:prettier/recommended"),
  ...compat.extends("plugin:import/recommended"),
  ...compat.extends("plugin:promise/recommended"),
  ...compat.extends("plugin:react-hooks/recommended"),
  ...compat.extends("plugin:@tanstack/eslint-plugin-query/recommended"),
  js.configs.recommended,
  {
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.es2021,
        ...globals.browser,
        ...globals.node,
        process: true
      }
    },
    ignores: ["dist/*", "/eslint.config.js"],
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
    plugins: {
      react,
      "react-hooks": reactHook,
      prettier: prettierPlugin,
      "react-refresh": reactRefresh,
      import: eslintImport,
      promise,
      "simple-import-sort": simpleImportSort,
      "@tanstack/eslint-plugin-query": { rules: ReactQueryRules, configs: ReactQueryConfigs }
    },
    rules: {
      "@typescript-eslint/no-invalid-void-type": "off",
      "multiline-ternary": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      quotes: "off",
      "@typescript-eslint/quotes": "off",
      "@typescript-eslint/space-before-function-paren": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": 0,
      indent: "off",
      "@typescript-eslint/indent": "off",
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
          semi: false
        }
      ]
    }
  },
  ...compat.config({
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: ["tsconfig.json", "tsconfig.node.json"]
    }
  })
]
