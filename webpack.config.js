'use strict';

var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var Md5HashPlugin = require('webpack-md5-hash');

var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

var JS_ROOT = path.join(__dirname, 'webroot', 'js');

// Plugins used across dev and prod
var commonPlugins = [
  // Generate a single chunk for common code
  new webpack.optimize.CommonsChunkPlugin({
    name: 'Common',
    minChunks: Infinity,
  }),
  // Don't pull in all of Moment's locales
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

  new Md5HashPlugin(),
  new ManifestPlugin({
    fileName: 'webpack-manifest.json',
  }),
  new ChunkManifestPlugin({
    filename: 'chunk-manifest.json',
    manifestVariable: 'chunkManifest'
  }),
  new ExtractTextPlugin('app-[contenthash:16].css', {
    allChunks: true,
  }),
];

var config = {
  context: JS_ROOT,
  entry: {
    App: 'App.js',
    Common: [
      'classnames',
      'jquery',
      'lodash',
      'moment',
      'react',
      'react-bootstrap',
      'react-dom',
      'react-overlays',
      'react-redux',
      'react-router',
      'react-router-bootstrap',
      'react-router-redux',
      'redux',
      'redux-thunk',
    ],
  },
  output: {
    chunkFilename: '[name].js',
    filename: '[name].js',
    path: path.join(__dirname, 'webroot', 'build'),
    publicPath: '/build/',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        // https://github.com/babel/babel-loader#options
        cacheDirectory: true,
      },
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('css!sass'),
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader'
    }, {
      // Inline base64 URLs for <=8k images, direct URLs for the rest
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    }]
  },
  // Just for prod config file. Not used by webpack.
  commonPlugins: commonPlugins,
  plugins: commonPlugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
  ]),
  resolve: {
    root: [JS_ROOT],
    extensions: ['', '.js', '.json', '.jsx']
  }
};

module.exports = config;
