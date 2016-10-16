'use strict';

var baseConfig = require('./webpack.config.js');
var webpack = require('webpack');

var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var Md5HashPlugin = require('webpack-md5-hash');

var config = Object.assign({}, baseConfig, {
  output: Object.assign({}, baseConfig.output, {
    // Hash packages for long-term caching.
    chunkFilename: '[name]-[chunkhash:16].js',
    filename: '[name]-[chunkhash:16].js',
  }),
});

config.plugins = config.commonPlugins.concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    // Omit comments in minimized output.
    comments: false,
    compressor: {
      screw_ie8: true,
      warnings: false,
    },
    mangle: {
      except: ['$', 'exports', 'require']
    },
  }),
  new Md5HashPlugin(),
  new ManifestPlugin({
    fileName: 'webpack-manifest.json',
  }),
  new ChunkManifestPlugin({
    filename: 'chunk-manifest.json',
    manifestVariable: 'chunkManifest'
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
]);

module.exports = config;
