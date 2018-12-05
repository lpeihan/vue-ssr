'use strict';

const webpack = require('webpack');
const VueServerPlugin = require('vue-server-renderer/server-plugin');
const webpackBaseConf = require('./webpack.base.conf');
const merge = require('webpack-merge');

const { resolve } = require('./utils');

const webpackServerConf = merge(webpackBaseConf, {
  target: 'node',
  mode: 'none',
  entry: resolve('src/entry-server.js'),
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: resolve('dist')
  },
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: []
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        VUE_ENV: '"server"'
      }
    }),
    new VueServerPlugin()
  ]
});

module.exports = webpackServerConf;
