'use strict';

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
    path: path.join(JS_ROOT, 'build'),
    publicPath: '/js/build/',
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
      loader: 'style-loader!css-loader'
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
    })
  ]),
  resolve: {
    root: [JS_ROOT],
    extensions: ['', '.js', '.json', '.jsx']
  }
};

module.exports = config;
