module.exports = {
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:jest/recommended',
      'prettier',
      'plugin:prettier/recommended'
    ],
    plugins: ['react', '@typescript-eslint', 'jest', "prettier"],
    env: {
      browser: true,
      es6: true,
      jest: true,
    },
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
        arrowFunctions: true
      },
      ecmaVersion: 2020,
      sourceType: 'module',
      // project: './tsconfig.json',
    },
    rules: {
      'linebreak-style': 'off',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
  };