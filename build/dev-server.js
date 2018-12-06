'use strict';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const opn = require('opn');
const config = require('../config').dev;

const webpackDevConf = require('./webpack.dev.conf');
const { resolve } = require('./utils');

// https://github.com/webpack/webpack-dev-server/issues/1377
webpackDevConf.entry.app.unshift(
  `webpack-dev-server/client?http://localhost:${config.port}`,
  'webpack/hot/dev-server'
);

const compiler = webpack(webpackDevConf);
const server = new WebpackDevServer(compiler, {
  contentBase: resolve('public'),
  hot: true,
  inline: true,
  compress: true,
  overlay: {
    errors: false,
    warnings: false
  },
  quiet: true,
  stats: {
    colors: true
  },
  historyApiFallback: true,
  proxy: config.proxy,
  headers: { 'Access-Control-Allow-Origin': '*' },
  disableHostCheck: true
});

server.listen(config.port, '0.0.0.0', () => {
  if (config.openBrowser) {
    opn(`http://localhost:${config.port}`);
  }
});
