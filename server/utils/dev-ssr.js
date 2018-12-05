const axios = require('axios');
const webpack = require('webpack');
const VueServerRenderer = require('vue-server-renderer');
const MemoryFS = require('memory-fs');
const path = require('path');
const Router = require('koa-router');

const webpackServerConf = require('../../build/webpack.server.conf');
const renderFunction = require('./render');

const compiler = webpack(webpackServerConf);
const mfs = new MemoryFS();

compiler.outputFileSystem = mfs;

let bundle;

compiler.watch({}, async(err, stats) => {
  if (err) {
    throw err;
  }
  stats = stats.toJson();
  stats.errors.forEach(err => console.log(err));
  stats.warnings.forEach(warn => console.warn(err));

  const bundlePath = path.join(
    webpackServerConf.output.path, 'vue-ssr-server-bundle.json'
  );

  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'));
  console.log('new bundle generated');
});

const router = new Router();

router.get('*', async(ctx) => {
  const clientManifest = (await axios.get(
    'http://localhost:4040/vue-ssr-client-manifest.json'
  )).data;

  const renderer = await VueServerRenderer.createBundleRenderer(bundle, {
    inject: false,
    clientManifest
  });

  await renderFunction(ctx, renderer);
});

module.exports = router;
