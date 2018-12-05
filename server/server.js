const Koa = require('koa');
const path = require('path');
const koaStatic = require('koa-static');
const server = new Koa();

// static
server.use(koaStatic(path.join(__dirname, '..', 'dist'), {
  maxage: 365 * 24 * 60 * 60 * 1000
}));

// logger
server.use(async(ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

let ssrRouter = require('./utils/ssr');

if (process.env.NODE_ENV === 'development') {
  ssrRouter = require('./utils/dev-ssr');
}

server
  .use(ssrRouter.routes())
  .use(ssrRouter.allowedMethods());

server.listen(3031, 'localhost', () => {
  console.log('server is listening on port' + 3030);
});
