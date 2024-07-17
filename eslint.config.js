import js from "@eslint/js"
import pluginQuery from "@tanstack/eslint-plugin-query"
import love from "eslint-config-love"
import importPlugin from "eslint-plugin-import"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"
import pluginPromise from "eslint-plugin-promise"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import globals from "globals"

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...pluginQuery.configs["flat/recommended"].map(a => ({ name: "config-query", ...a })),
  pluginPromise.configs["flat/recommended"],

  { name: "config-js", ...js.configs.recommended },
  {
    name: "config-eslint-prettier-recommanded",
    ...eslintPluginPrettierRecommended
  },
  {
    name: "config-import-ts",
    ...importPlugin.flatConfigs.typescript
  },
  {
    name: "config-import-react",
    ...importPlugin.flatConfigs.react
  },

  {
    name: "config-react-recommanded",
    ...react.configs.flat.recommended
  },
  {
    name: "config-react-jsx-runtime",
    ...react.configs.flat["jsx-runtime"]
  },
  {
    name: "config-react-hook",
    plugins: {
      "react-refresh": reactRefresh,

      "react-hooks": reactHooks
    },

    rules: {
      ...reactHooks.configs.recommended.rules
    }
  },
  {
    name: "config-love",
    ...love,
    plugins: {
      ...Object.fromEntries(
        Object.entries(love.plugins).filter(
          ([key]) =>
            ![
              "promise"
              //  "@typescript-eslint"
            ].includes(key)
        )
      )
    },
    files: ["**/*.js", "**/*.ts", "**/*.tsx", "**/*.jsx"]
  },
  {
    name: "custom config",
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
      "simple-import-sort": simpleImportSort
    },
    rules: {
      complexity: ["error", { max: 10 }],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": 0,
      "no-redeclare": ["error", { builtinGlobals: false }],
      "@typescript-eslint/no-magic-numbers": "warn",
      "no-console": "off"
    }
  }
]
