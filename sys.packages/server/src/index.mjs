
import logger from '@sys.packages/logger';

import Koa from 'koa';
import Router from 'koa-router';

import koaBodyParser from 'koa-bodyparser';

const app = new Koa();
const router = new Router();


app.use(async (ctx, next) => {

  logger['info'](`[REQUEST] ---> [${ctx.request.method}] "${ctx.request.url}" (${ctx.request.body ? JSON.stringify(ctx.request.body) : 'null'})`);

  await next();

  let response = null;
  const body = ctx.response.body;

  if (body) {
    if (body['req']) {
      response = ctx.response.message;
    }
    else {
      if (body instanceof Object) {
        response = JSON.stringify(body);
      }
      else if (Array.isArray(body)) {
        response = JSON.stringify(body);
      }
    }
  }

  logger['info'](`[RESPONSE] <--- [${ctx.request.method}] "${ctx.request.url}" [${ctx.response.status}] (${response})`);
});

app.use(koaBodyParser({
  enableTypes: ['json', 'form'],
  onerror: (err, ctx) => {
    ctx.throw(422, 'body parse error');
  }
}));

export const initRouter = (callback) => {

  callback(router);

  app.use(router.routes());
  app.use(router.allowedMethods());
};

export default app;
