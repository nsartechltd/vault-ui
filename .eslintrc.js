module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    'linebreak-style': ['error', 'unix'],
    'no-eval': ['error'],
    eqeqeq: ['error'],
    'no-console': 'off', // We should change this for prod
    'react/jsx-uses-react': 1,
    'react/jsx-uses-vars': 1,
    'no-unused-expressions': 1,
    'no-unused-vars': 1,
    'no-useless-constructor': 1,
    'no-debugger': 1,
    'promise/no-nesting': 0,
    'promise/avoid-new': 0,
    'promise/no-callback-in-promise': 0,
    'promise/no-return-wrap': 0,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  parser: '@typescript-eslint/parser',
};
