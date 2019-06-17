'use strict';

import Koa from 'koa';
import Router from 'koa-router';
import convert from 'koa-convert';

import koaCORS from 'koa-cors2';
import koaBodyParser from 'koa-bodyparser';
import logger from 'koa-logger';

const app = new Koa();
const router = new Router();


app.use(async (ctx, next) => {

  console.log(`REQUEST ---> [${ctx.request.method}] "${ctx.request.url}" (${ctx.request.body ? JSON.stringify(ctx.request.body) : 'null'})`);

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


  console.log(`RESPONSE <--- [${ctx.request.method}] "${ctx.request.url}" ${ctx.response.status} (${response})`);
});


app.use(convert(koaCORS({
  credentials: true,
  origin: process.env['HTTP_ORIGINS'],
  allowMethods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
})));


app.use(koaBodyParser({
  enableTypes: ['json', 'form'],
  onerror: (err, ctx) => {
    ctx.throw(422, 'body parse error');
  }
}));

app.use(async (ctx, next) => {

  try {
    await next();
  } catch(e) {

    const { status, message } = ctx.response;

    ctx.status = e.status || status;
    ctx.body = {
      status: status,
      message: e['message'] || message,
    };
  }
});

export const initRouter = (callback) => {

  callback(router);

  app.use(router.routes());
  app.use(router.allowedMethods());
};

export default app;
