var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var Md5HashPlugin = require('webpack-md5-hash');

var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

var JS_ROOT = path.join(__dirname, 'webroot', 'js');

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
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // https://github.com/babel/babel-loader#options
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader',
          ],
        }),
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: 'file-loader'
      },
      {
        // Inline base64 URLs for <=8k images, direct URLs for the rest
        test: /\.(png|jpg)$/,
        use: 'url-loader?limit=8192'
      }
    ]
  },
  plugins: [
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
    new ExtractTextPlugin({
      allChunks: true,
      filename: 'app-[contenthash:16].css',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    modules: [
      JS_ROOT,
      path.resolve(__dirname, 'node_modules'),
    ],
  }
};

module.exports = config;
