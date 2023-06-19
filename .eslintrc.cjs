module.exports = {
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module",
  },
  extends: [
    "prettier", // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    "plugin:jsdoc/recommended",
  ],
  plugins: ["jsdoc", "prettier"],
  rules: {
    "prettier/prettier": "error",
  },
  ignorePatterns: ["docs/"],
  settings: {
    jsdoc: {
      mode: "permissive",
      tagNamePreference: {
        return: "returns",
      },
    },
  },
  env: {
    es6: true,
  },
};
