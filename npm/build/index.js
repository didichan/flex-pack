#!/usr/bin/env node
"use strict"

var exec = require('child_process').exec;
var devServer = require('./build/dev-server');
var express = require('express')

// Command to run, e.g. "build", "browser-tests" etc
var command = process.argv[2]
var params = process.argv.slice(3).reduce(function(o, arg){
  arg = arg.split('=')
  var key = arg[0]
  o[key] = arg[1] || true
  return o
}, {})
var cmd;

/**
 * Executes a command and pipse the output to std out
 */
function runCmd(cmd){
  return new Promise(resolve => {
    var test = exec(cmd, null, resolve);
    test.stdout.on('data', data=>process.stdout.write(data));
    test.stderr.on('data', data=>process.stderr.write(data));
  })
}

switch(command){
// true for the command 'build dev'
// runs the dev-server.js file
case 'dev':
  devServer()
  break


// true for the command 'build build'
// cleans the previous build from the location specified in config
// makes a new build
case 'build':
  let config = require('./config');
  let webpackConf = require.resolve('./build/webpack.prod.conf')
  let output = config.output.dir
  cmd = [];
  if(config.output.rimraf){
    cmd.push('rimraf ' + output)
  }
  cmd.push('webpack --progress --hide-modules --config ' +
            webpackConf);
  cmd = cmd.join(' && ');

  runCmd(cmd).then(
    () => {
      var serve = arg('serve')
      if(serve){
        var port = Number.isInteger(serve) ? serve : 3000
        var app = express()
        app.use(`/${output}`, express.static(output))
        app.listen(port, () => {
          console.log(`Serving site at http://localhost:${port}/` + output)
        })
      }
    }
  ).catch(e => console.log(e))
  break

// true for the command 'build test'
// runs unit tests using karma
case 'test':
  let karmaConf = require.resolve('./test/karma.conf.js');
  runCmd(
    'karma start '
    + karmaConf
    + ' --single-run'
  )
  break

default:
  console.log(`build: No such command "${command}"`)
  break
}
