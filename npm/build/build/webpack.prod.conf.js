var webpack = require('webpack');
var config = require('./webpack.base.conf');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var buildConfig = require('../config');

// naming output files with hashes for better caching.
// dist/index.html will be auto-generated with correct URLs.
config.output.filename = '[name].[chunkhash].js';
config.output.chunkFilename = '[id].[chunkhash].js';

// whether to generate source map for production files.
// disabling this can speed up the build.
const SOURCE_MAP = true;

config.devtool = SOURCE_MAP ? 'source-map' : false;

// generate loader string to be used with extract text plugin
function generateExtractLoaders (baseLoader) {
  // Ignore the style loader (the first item), extractText doesn't need it
  var loaders = baseLoader.split('!').slice(1)

  // Get their plugin names and source maps
  return loaders.map(function (loader) {
    return loader + '-loader' + (SOURCE_MAP ? '?sourceMap' : '')
  }).join('!')
}

// http://vuejs.github.io/vue-loader/configurations/extract-css.html
// Make sure to use the same loaders as base config does
config.vue.loaders.css =
  ExtractTextPlugin.extract(
    'vue-style-loader',
    generateExtractLoaders(config.vue.loaders.css)
  )

// Add more config options to the HTML webpack plugins
config.plugins.forEach(function(plugin){
  if(plugin instanceof HtmlWebpackPlugin){
    plugin.options.filename = '../' + plugin.options.filename,
    plugin.options.minify = {
      removeComments: buildConfig.output.removeHtmlComments,
      collapseWhitespace: true,
      removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    }
  }
});

config.plugins = (config.plugins || []).concat([
  // http://vuejs.github.io/vue-loader/workflow/production.html
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  // extract css into its own file
  new ExtractTextPlugin('[name].[contenthash].css')
]);

if(buildConfig.webpackConfig){
  config = buildConfig.webpackConfig(config, 'prod') || config;
}

module.exports = config;
