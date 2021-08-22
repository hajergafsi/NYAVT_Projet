// module.exports = {
//   env: {
//     node: true,
//     es6: true,
//     browser: true
//   },

//   parserOptions: {
//     ecmaVersion: 6,
//     sourceType: 'module',
//     ecmaFeatures: {
//       jsx: true,
//       modules: true,
//       experimentalObjectRestSpread: true
//     }
//   },
//   rules: {
//     'no-console': 'off',
//     'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

//     // Best Practices
//     eqeqeq: 'error',
//     'no-invalid-this': 'error',
//     'no-return-assign': 'error',
//     'no-unused-expressions': ['error', { allowTernary: true }],
//     'no-useless-concat': 'error',
//     'no-useless-return': 'error',

//     // Variable
//     // 'init-declarations': 'error',
//     'no-use-before-define': 'error',

//     // Stylistic Issues
//     'array-bracket-newline': ['error', { multiline: true, minItems: null }],
//     'array-bracket-spacing': 'error',
//     'brace-style': ['error', '1tbs', { allowSingleLine: true }],
//     'block-spacing': 'error',
//     'comma-dangle': 'error',
//     'comma-spacing': 'error',
//     'comma-style': 'error',
//     'computed-property-spacing': 'error',
//     'func-call-spacing': 'error',
//     'implicit-arrow-linebreak': ['error', 'beside'],
//     // indent: ['error', 4],
//     'keyword-spacing': 'error',
//     'multiline-ternary': ['error', 'never'],
//     // 'no-lonely-if': 'error',
//     'no-mixed-operators': 'error',
//     'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
//     'no-tabs': 'error',
//     'no-unneeded-ternary': 'error',
//     'no-whitespace-before-property': 'error',
//     'nonblock-statement-body-position': 'error',
//     'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
//     'quote-props': ['error', 'as-needed'],
//     // quotes: ['error', 'prefer-single'],
//     semi: ['error', 'never'],
//     'semi-spacing': 'error',
//     'space-before-blocks': 'error',
//     // 'space-before-function-paren': 'error',
//     'space-in-parens': 'error',
//     'space-infix-ops': 'error',
//     'space-unary-ops': 'error',

//     // ES6
//     'arrow-spacing': 'error',
//     'no-confusing-arrow': 'error',
//     'no-duplicate-imports': 'error',
//     'no-var': 'error',
//     'object-shorthand': 'error',
//     'prefer-const': 'error',
//     'prefer-template': 'error'
//   }

//   // rules: {
//   //   'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
//   //   'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
//   //   semi: ['error', 'never'],
//   //   'max-len': 'off',
//   //   camelcase: ['error', { properties: 'never', ignoreDestructuring: true, ignoreImports: true }]
//   // }
// }

"use strict";

const fs = require("fs");
const path = require("path");

// const restrictedPaths = [
//   { name: "@material-ui/core" }
// ].map(pkg =>
//   fs
//     .readdirSync(path.dirname(require.resolve(`${pkg.name}/package.json`)))
//     .map(component => ({
//       name: `${pkg.name}/${component}`,
//       message: `This loads CommonJS version of the package. To fix replace with: import { ${component} } from "${pkg.name}";`
//     }))
// );

// TODO: Wait for https://github.com/facebook/create-react-app/pull/7036 to enable rules in react-scripts.

module.exports = {
  extends: "eslint-config-react-app",
  rules: {
    // "no-script-url": "warn",
    "jsx-a11y/anchor-is-valid": "warn",
    // "no-restricted-imports": ["error", { paths: [].concat(...restrictedPaths) }]
  }
};