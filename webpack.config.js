var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpackPlugins = require('./webpackPlugins');

var path = require('path');
var webpack = require('webpack');

var JS_ROOT = path.join(__dirname, 'webroot', 'js');

var config = {
  context: JS_ROOT,
  entry: {
    app: 'App.js',
    vendor: [
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
  plugins: webpackPlugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
  ]),
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.react.js'],
    modules: [
      JS_ROOT,
      path.resolve(__dirname, 'node_modules'),
    ],
  }
};

module.exports = config;
