var webpackConf = require('../build/webpack.base.conf');
var path = require('path');
var appConfig = require('../config');
var testsFiles = path.resolve(appConfig.test.unit, 'specs/**/*.spec.js');
delete webpackConf.entry;

module.exports = function (config) {
  config.set({
    browsers: [
      //'PhantomJS',
      // 'Firefox',
      'Chrome'
    ],
    reporters: [
      'spec',
      'junit'
      //'progress'
    ],
    frameworks: [
      'mocha', // The framework
      'chai',  // The assertions
      'sinon', // Spys & mocks
      'chai-sinon', // Enable chai-style assertions for sinon spies
      'chai-as-promised', // Promises for async assertions
      'dirty-chai'
      // By default, chai assertion functions that take 0 arguments
      // are just getters, and don't require parenthases to call them:
      //     expect(spy).to.have.been.called;
      //
      // This is counter-intuative and upsets the linter. `dirty-chai`
      // forces these assertions (including those from plugins) to
      // require parentheses:
      //     expect(spy).to.have.been.called();
    ],

    junitReporter: {
      outputDir: path.resolve(appConfig.test.unit, 'reports')
    },

    files: [testsFiles],

    preprocessors: {
      [testsFiles]: ['webpack']
    },

    webpack: webpackConf,
    webpackMiddleware: {
      noInfo: true
    }
  })
};
