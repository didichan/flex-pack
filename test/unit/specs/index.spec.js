// Polyfill fn.bind() for PhantomJS
/* eslint-disable no-extend-native */
Function.prototype.bind = require('function-bind')

// A require context is basically a require statement
// that handles a specific directory or subtree:
// https://webpack.github.io/docs/context.html

// Require all files in the components tree of the form "test/*.js"
var componentTestContext =
  require.context('../../../npm', true, /[a-z-]+\/test\/.*\.js$/)
componentTestContext.keys().forEach(componentTestContext);
