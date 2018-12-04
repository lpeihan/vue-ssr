'use strict';

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const WebpackBar = require('webpackbar');

const { resolve, assetsPath, cssLoader } = require('./utils');

module.exports = {
  entry: {
    app: ['./src/entry-client.js']
  },
  context: resolve(),
  output: {
    path: resolve('dist'),
    filename: assetsPath('js/[name].js')
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', 'jsx'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader?cacheDirectory=true',
        include: [resolve('src')]
      },
      {
        test: /\.(js|vue)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          emitWarning: true,
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.css$/,
        use: cssLoader()
      },
      {
        test: /\.styl(us)?$/,
        use: cssLoader('stylus')
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new WebpackBar()
  ]
};
