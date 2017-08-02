/* eslint-env node */
var webpackConfig = require('./webpack.config');

module.exports = function(config) {
  config.set({
    browsers: [process.env.TRAVIS ? 'Chrome_travis_ci' : 'Chrome'],
    client: {
      // Don't show console output.
      captureConsole: false,
    },
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox'],
      },
    },
    frameworks: ['mocha', 'chai'],
    singleRun: true,
    files: [
      // Common package needs to be first since it defines webpackJsonp
      // https://github.com/webpack-contrib/karma-webpack/issues/24
      'webroot/build/Common.js',
      'tests.webpack.js',
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap'],
    },
    reporters: ['dots'],
    webpack: Object.assign(webpackConfig, {
      devtool: 'inline-source-map',
    }),
    webpackServer: {
      noInfo: true,
    },
  });
};
