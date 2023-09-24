module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'plugin:nuxt/recommended',
    'eslint:recommended',
  ],
  plugins: [
    'nuxt',
  ],
  // 添加自定义规则
  rules: {
    // 在这里添加您的自定义规则
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },
}
