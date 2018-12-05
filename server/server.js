const Koa = require('koa');
const server = new Koa();
const ssrRouter = require('./utils/dev-ssr');

// logger
server.use(async(ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

server
  .use(ssrRouter.routes())
  .use(ssrRouter.allowedMethods());

server.listen(3031, 'localhost', () => {
  console.log('server is listening on port' + 3030);
});
