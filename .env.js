const merge = require('webpack-merge');

const devEnv = {
  NODE_ENV: '"development"'
};

const prodEnv = merge(devEnv, {
  NODE_ENV: '"production"'
});

module.exports = {
  devEnv,
  prodEnv
};