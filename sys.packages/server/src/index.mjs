
import logger from '@sys.packages/logger';

import Koa from 'koa';
import Router from 'koa-router';

import koaBodyParser from 'koa-bodyparser';

const app = new Koa();
const router = new Router();


app.use(async (ctx, next) => {

  logger['info'](`REQUEST ---> [${ctx.request.method}] "${ctx.request.url}" (${ctx.request.body ? JSON.stringify(ctx.request.body) : 'null'})`);

  await next();

  let response = null;
  const body = ctx.response.body;

  if (body) {
    if (body.constructor === Object) {
      response = JSON.stringify(body);
    } else if (body.constructor === Array) {
      response = JSON.stringify(body);
    }
  }

  logger['info'](`RESPONSE <--- [${ctx.request.method}] "${ctx.request.url}" [${ctx.response.status}] (${response})`);
});

app.use(koaBodyParser({
  enableTypes: ['json', 'form'],
  onerror: (err, ctx) => {
    ctx.throw(422, 'body parse error');
  }
}));

app.use(async (ctx, next) => {
  try {
    await next();
  }
  catch(error) {
    console.log(error)
    ctx.status = error['status'];
    ctx.body = error['data'];
  }
});

export const initRouter = (callback) => {

  callback(router);

  app.use(router.routes());
  app.use(router.allowedMethods());
};

export default app;
