module.exports = {
  root: true,

  parser: "vue-eslint-parser",

  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  parserOptions: {
    parser: "@typescript-eslint/parser",
    project: "./tsconfig.json",
    ecmaVersion: "latest",
    sourceType: "module",
    extraFileExtensions: [".vue"],
  },

  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",

    // 🔥 关键：关闭所有和 Prettier 冲突的规则
    "prettier",
  ],

  plugins: ["vue", "@typescript-eslint"],

  rules: {
    // 你之前提到的那条
    "@typescript-eslint/strict-boolean-expressions": "error",

    // 常见“烦人但不致命”的规则建议关
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-floating-promises": "off",
  },

  overrides: [
    {
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
      env: {
        node: true,
      },
    },
  ],
};
