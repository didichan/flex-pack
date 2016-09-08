var path = require('path');
var buildConfig = require('../config');
var eslintFormatter = require('eslint-friendly-formatter');
var babelRc = require('../.babelrc');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var templates = buildConfig.src.templates;
if(!templates){
  templates = [];
}else if(!Array.isArray(templates)){
  templates = [templates];
}

module.exports = {
  entry: {
    app: './' + buildConfig.src.main
  },
  output: {
    path: path.resolve(buildConfig.output.resources),
    publicPath: path.resolve('/', buildConfig.output.resources) + '/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    alias: {
      'src': path.resolve(buildConfig.src.dir),
      'vue': 'vue/dist/vue'
    }
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel!eslint',
        exclude: /node_modules\/(?!@didichan)/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg|woff(2)?)$/,
        loader: 'file-loader?name=[path][name].[ext]&context='
                + buildConfig.src.dir
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'resolve-url', 'sass?sourceMap']
      }
    ]
  },
  vue: {
    loaders: {
      js: 'babel!eslint',
      css: 'style!css!sass'
    }
  },
  eslint: {
    formatter: eslintFormatter,
    configFile: __dirname + '/../.eslintrc.js'
  },
  babel: babelRc,
  sassLoader: {
    includePaths: [
      'node_modules'
    ]
  },
  imageWebpackLoader: {
    optimizationLevel: 5,
    progressive: true,
    interlaced: true
  },
  plugins: templates.map(template =>
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: path.basename(template),
      favicon: buildConfig.src.favicon && path.resolve(buildConfig.src.favicon),
      template: path.resolve(template),
      inject: true
    })
  )
};
