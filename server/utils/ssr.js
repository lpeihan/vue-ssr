
const Router = require('koa-router');
const path = require('path');
const VueServerRender = require('vue-server-renderer');

const renderFunction = require('./render');

const clientManifest = require('../../dist/vue-ssr-client-manifest.json');

const renderer = VueServerRender.createBundleRenderer(
  path.join(__dirname, '../../dist/vue-ssr-server-bundle.json'),
  {
    inject: false,
    clientManifest
  }
);

const ssrRouter = new Router();

ssrRouter.get('*', async(ctx) => {
  await renderFunction(ctx, renderer);
});

module.exports = ssrRouter;
