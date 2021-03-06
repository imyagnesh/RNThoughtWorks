module.exports = {
  env: {
    browser: true,
    es6: true,
    'react-native/react-native': true,
  },
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'plugin:react/recommended', 'prettier/react'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['babel', 'import', 'jsx-a11y', 'prettier', 'react', 'react-native', 'react-hooks'],
  rules: {
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'prettier/prettier': [2],
    'react/forbid-prop-types': [0],
  },
};
