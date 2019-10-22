'use-strict';

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  extends: ['semistandard', 'plugin:@typescript-eslint/recommended'],
  rules: {
    indent: ['error', 2, {
      SwitchCase: 1,
      MemberExpression: 'off'
    }],
  }
}