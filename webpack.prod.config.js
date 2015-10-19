'use strict';

var baseConfig = require('./webpack.config.js');
var webpack = require('webpack');

var config = Object.create(baseConfig);

config.output.path = __dirname + '/app/webroot/dist';
config.plugins = config.commonPlugins.concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      screw_ie8: true,
      warnings: false,
    },
    mangle: {
      except: ['$', 'exports', 'require']
    }
  }),
]);

module.exports = config;
