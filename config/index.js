module.exports = {
  port: 5050,
  host: 'localhost',
  serverPort: 5051,
  openBrowser: true,
  proxy: {
    '/api': {
      target: 'http://47.98.144.117:3000/',
      pathRewrite: { '^/api': '/' }
    }
  }
};
