module.exports = {
    "parser": "vue-eslint-parser", // 解决 Parsing error: '>' expected 报错
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:vue/vue3-essential", // vue3-base校验
        "standard-with-typescript"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "parser": "@typescript-eslint/parser",
        "project": './tsconfig.json',
        "ecmaVersion": "latest",
        "sourceType": "module",
        "extraFileExtensions": ['.vue'],
    },
    "plugins": [
        "vue"
    ],
    "rules": {
    }
}
