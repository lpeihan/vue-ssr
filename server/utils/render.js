const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

module.exports = async(ctx, renderer) => {
  ctx.headers['Content-type'] = 'text/html';
  const context = { url: ctx.path };

  const template = fs.readFileSync(
    path.join(__dirname, '../template.ejs'),
    'utf-8'
  );

  try {
    const appString = await renderer.renderToString(context);

    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      initialState: context.renderState()
    });

    ctx.body = html;
  } catch (err) {
    console.log(err);
  }
};
