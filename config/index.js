module.exports = {
  dev: {
    host: 'localhost',
    port: 5050,
    openBrowser: true,
    proxy: {
      '/api': {
        target: 'http://47.98.144.117:3000/',
        pathRewrite: { '^/api': '/' }
      }
    }
  },

  prod: {

  },

  server: {
    port: 5051
  }
};
