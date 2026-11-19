import { defineConfig, globalIgnores } from "eslint/config";
import jsdoc from "eslint-plugin-jsdoc";
import prettier from "eslint-plugin-prettier/recommended";

export default defineConfig([
  globalIgnores(["docs/"]),
  jsdoc.configs["flat/recommended-typescript-flavor"],
  prettier,
  {
    settings: {
      jsdoc: {
        mode: "permissive",
        tagNamePreference: {
          return: "returns",
        },
      },
    },
    rules: {
      // The values under test are arbitrary, so `any` is the honest type
      "jsdoc/reject-any-type": "off",
    },
  },
]);
