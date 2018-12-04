'use strict';

module.exports = {
    presets: ['@babel/preset-env'],
    plugins: [
      'transform-vue-jsx',
      [
        "@babel/plugin-transform-runtime",
        {
          "corejs": 2,
          "helpers": true,
          "regenerator": true,
          "useESModules": false
        }
      ]
    ]
};