module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true
  },
  extends: ['standard', 'plugin:vue/essential'],
  rules: {
    semi: ['error', 'always'],
    'space-before-function-paren': 'off',
    'prefer-promise-reject-errors': 'off'
  }
};