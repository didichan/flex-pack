var _ = require('lodash');
var path = require('path');

/**
 * Expands shorthand configuration object into longhand,
 * e.g.    { test: 'my-tests' }
 * becomes { test: { dir: 'my-tests', unit: 'my-tests/unit', (etc) } }
 *
 * @param  {Object} config The specified config object
 * @return {Object}        The same object, expanded
 */
function expandConfig(config){
  if(typeof config.output === 'string'){
    config.output = {
      dir: config.output,
      resources: path.join(config.output, 'resources'),
      rimraf: true,
      removeHtmlComments: true
    }
  }

  if(typeof config.src === 'string'){
    config.src = {
      dir: config.src,
      templates: path.join(config.src, 'index.html'),
      main: path.join(config.src, 'main.js'),
      favicon: path.join(config.src, 'favicon.ico')
    }
  }

  if(typeof config.test === 'string'){
    config.test = {
      dir: config.test,
      unit: path.join(config.test, 'unit')
    }
  }

  return config;
}

// Try and require the build-config.js file, use an empty object if not found
var buildConfig = {};
try {
  // find dg-config from the cwd
  buildConfig = require(path.resolve('config'));
}
catch (e) {
  if (e.code !== 'MODULE_NOT_FOUND'){
    throw e;
  }
}

// Expand config and assign empty objects for missing values
buildConfig = expandConfig(buildConfig);
buildConfig = Object.assign({
  output: {},
  src: {},
  test: {}
}, buildConfig);

// Set some sensible defaults (get a hint from the user's config if available)
var defaults = expandConfig({
  output: buildConfig.output.dir || path.basename(path.resolve('.')),
  src: buildConfig.src.dir || 'src',
  test: buildConfig.test.dir || 'test'
});

// Merge config objects together, ignoring any undefined values
module.exports = _.merge(defaults, buildConfig);
