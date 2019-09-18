/*
 * @Author: xuxueliang
 * @Date: 1984-01-24 16:00:00
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-09-18 20:39:03
 */
// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    parser: 'babel-eslint',
    ecmaFeatures: {
      legacyDecorators: true,
      "jsx": true,
      "experimentalObjectRestSpread": true
    }
  },
  env: {
    browser: true,
  },
  extends: [
    'plugin:react/recommended',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  // plugins: [
  //   'vue'
  // ],
  // add your custom rules here
  rules: {
    // allow async-await
    'react/no-string-refs': 'off',
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    "space-before-function-paren": ["error", "always"],
    // "react/jsx-uses-vars": "error"
  },
  "settings": {
    "react": {
      "pragma": "Yam"
    }
  }
}
