import axios from 'axios';
import fs from 'fs';
import ejs from 'ejs';
const Koa = require('koa');
const webpack = require('webpack');
const VueServerRenderer = require('vue-server-renderer');
const MemoryFS = require('memory-fs');
const path = require('path');

const webpackServerConf = require('../build/webpack.server.conf');

const server = new Koa();
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

// logger
server.use(async(ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

server.use(async(ctx, next) => {
  if (ctx.url !== '/') {
    console.log(ctx.url, '~~~~~~~');
    return;
  }
  const clientManifest = (await axios.get(
    'http://localhost:4040/vue-ssr-client-manifest.json'
  )).data;

  const template = fs.readFileSync(
    path.join(__dirname, 'index.template.ejs'),
    'utf-8'
  );

  const renderer = await VueServerRenderer.createBundleRenderer(bundle, {
    inject: false,
    clientManifest
  });

  const context = {
    url: ctx.path
  };
  try {
    const appString = await renderer.renderToString(context);

    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      initialState: context.renderState()
    });
    console.log('~~~~~~~~~', context.renderState());

    ctx.body = html;
  } catch (err) {
    console.log('~~~~~~~~~~~~~', err);
  }
});

server.listen(3031, 'localhost', () => {
  console.log('server is listening on port' + 3030);
});
