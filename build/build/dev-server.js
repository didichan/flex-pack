var express = require('express');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var webpackConf = require('./webpack.dev.conf');
var connectHistory = require('connect-history-api-fallback');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var port = 8081;
var url;

/**
 * Starts the dev server on the next free port
 * @param  {number} port The port to start looking at
 * @return {Promise}     Resolves when the server has started
 *                       Resolves to the chosen port number
 */
function startServer(app, port){
  return new Promise((resolve, reject) => {
    // Start the server on the selected port
    var server = app.listen(port, 'localhost', ()=>resolve(port))
      .on('error', er => {
        // In case of error, close the server and reject the promise
        server.close();
        reject(er);
      });
  }).catch(err => {
    // If the error is "port already in use",
    // try again with the next port.
    if(err.message.indexOf('EADDRINUSE') > -1){
      return startServer(app, port+1);
    }
    throw err;
  });
}

/**
 * Waits until the package is valid.
 * @return {Promise}
 */
function waitUntilValid(devMiddleware){
  return new Promise(resolve => {
    console.log('Waiting for package to be valid...');
    devMiddleware.waitUntilValid(resolve);
  });
}

module.exports = function(){
  var compiler = webpack(webpackConf);
  var app = express();

  // Allow middlewares to read the body and cookies
  app.use(bodyParser.json());

  // handle fallback for HTML5 history API
  app.use(connectHistory());
  // serve webpack bundle output
  var devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConf.output.publicPath,
    stats: {
      colors: true,
      chunks: false
    }
  })
  app.use(devMiddleware);

  // enable hot-reload and state-preserving
  // compilation error display
  app.use(webpackHotMiddleware(compiler))

  return Promise.all([
    startServer(app, port)
      .then(port => {
        url = 'http://localhost:' + port;
        console.log('Listening on ' + url);
      }),
    waitUntilValid(devMiddleware)
  ])
  .then(() => {
    // Pass the URL to any other scripts who want run this server
    return url;
  })
  .catch(function(err){
    console.error(err);
    throw err;
  });
}
