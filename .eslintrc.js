module.exports = {
  root: true,
  env: {
    es2021: true
  },
  extends: [
    '@react-native-community',
    'plugin:react/recommended',
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'prettier/prettier': 0,
    'react-native/no-inline-styles': 0
  }
}
