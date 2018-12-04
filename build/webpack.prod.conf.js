const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const VueClientPlugin = require('vue-server-renderer/client-plugin');

const { prodEnv } = require('../.env.js');
const packageJson = require('../package.json');
const webpackBaseConf = require('./webpack.base.conf');
const { resolve, assetsPath } = require('./utils');

const webpackProdConf = merge(webpackBaseConf, {
  mode: 'production',
  output: {
    filename: assetsPath('js/[name].[chunkhash].js'),
    publicPath: '/'
  },
  devtool: '#source-map',
  performance: {
    hints: 'warning',
    maxEntrypointSize: 500000, // (300kb) The default value is 250000 (bytes).
    maxAssetSize: 500000 // The default value is 250000 (bytes).
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': prodEnv
    }),
    new VueClientPlugin(),
    new MiniCssExtractPlugin({
      filename: assetsPath('css/[name].[contenthash].css')
    }),
    new HtmlWebpackPlugin({
      title: packageJson.name,
      filename: 'index.html',
      template: `${resolve('public/index.html')}`,
      favicon: `${resolve('public/favicon.ico')}`,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      chunksSortMode: 'dependency'
    }),

    new CopyWebpackPlugin([
      {
        from: resolve('public'),
        to: resolve('dist'),
        ignore: ['index.html', 'favicon.ico']
      }
    ])
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '.'
    },
    runtimeChunk: {
      name: 'runtime'
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码
        parallel: true, // 开启并行压缩
        extractComments: true, // 移除注释
        sourceMap: false, // set to true if you want JS source maps
        uglifyOptions: {
          compress: {
            unused: true,
            drop_console: true
          },
          output: {
            comments: false // 过滤注释
          }
        }
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions: {
          safe: true,
          autoprefixer: { disable: true },
          mergeLonghand: false,
          discardComments: {
            removeAll: true
          }
        },
        canPrint: true
      })
    ]
  }
});

if (process.env.npm_config_argv.includes('--report')) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
  webpackProdConf.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackProdConf;
