module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'eslint-config-prettier',
  ],
  overrides: [{
    env: {
      node: true,
    },
    files: [
      '.eslintrc.{js,cjs}',
    ],
    parserOptions: {
      sourceType: 'script',
    },
  }, ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': 'off',
    "react/jsx-props-no-spreading": "off",
  },
};