
import koaCORS from '@sys.packages/cors';
import { checkCookie, getCookie } from "@sys.packages/jwt";
import logger from '@sys.packages/logger';
import createSocket from '@sys.packages/socket.io';
import appServer, { initRouter } from '@sys.packages/server';
import { connectToRabbit, queueToExchange } from '@sys.packages/rabbit';

import http from 'http';
import cookie from 'koa-cookie';

import routes from './routes';

import { createComment, updateComment, deleteComment } from './actions/comments';
import { updateForm } from './actions/forms';
import { updateType } from './actions/types';


(async () => {
  try {
    await connectToRabbit(process.env['RABBIT_CONNECTION_HOST']);

    await queueToExchange(process.env['RABBIT_CLIENT_GW_QUEUE_COMMENT_CREATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_COMMENT_CREATED'], createComment());
    await queueToExchange(process.env['RABBIT_CLIENT_GW_QUEUE_COMMENT_UPDATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_COMMENT_UPDATED'], updateComment());
    await queueToExchange(process.env['RABBIT_CLIENT_GW_QUEUE_COMMENT_DELETED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_COMMENT_DELETED'], deleteComment());

    await queueToExchange(process.env['RABBIT_CLIENT_GW_QUEUE_FORM_UPDATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_FORM_UPDATED'], updateForm());
    await queueToExchange(process.env['RABBIT_CLIENT_GW_QUEUE_TYPE_UPDATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_TYPE_UPDATED'], updateType());
    await queueToExchange(process.env['RABBIT_CLIENT_GW_QUEUE_UNIT_UPDATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_UNIT_UPDATED'], (message) => io.emit('action', { type: process.env['SOCKET_UNIT_UPDATED'], payload: JSON.parse(message) }));
    await queueToExchange(process.env['RABBIT_CLIENT_GW_QUEUE_COLOR_UPDATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_COLOR_UPDATED'], (message) => io.emit('action', { type: process.env['SOCKET_COLOR_UPDATED'], payload: JSON.parse(message) }));
    await queueToExchange(process.env['RABBIT_CLIENT_GW_QUEUE_PRODUCT_UPDATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_UPDATED'], (message) => io.emit('action', { type: process.env['SOCKET_PRODUCT_UPDATED'], payload: JSON.parse(message) }));
    await queueToExchange(process.env['RABBIT_CLIENT_GW_QUEUE_MATERIAL_UPDATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_MATERIAL_UPDATED'], (message) => io.emit('action', { type: process.env['SOCKET_MATERIAL_UPDATED'], payload: JSON.parse(message) }));
    await queueToExchange(process.env['RABBIT_CLIENT_GW_QUEUE_CURRENCY_UPDATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CURRENCY_UPDATED'], (message) => io.emit('action', { type: process.env['SOCKET_CURRENCY_UPDATED'], payload: JSON.parse(message) }));
    await queueToExchange(process.env['RABBIT_CLIENT_GW_QUEUE_CATEGORY_UPDATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CATEGORY_UPDATED'], (message) => io.emit('action', { type: process.env['SOCKET_CATEGORY_UPDATED'], payload: JSON.parse(message) }));


    appServer.use(koaCORS({
      credentials: true,
      allowedOrigins: process.env['HTTP_ORIGINS'].split(','),
      allowMethods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    }));

    appServer.use(cookie.default());

    const httpServer = http.createServer(appServer.callback());
    const io = await createSocket(httpServer, { path: '/showcase.socket.io' });

    appServer.use(async (ctx, next) => {
      ctx.io = io.sockets;
      await next();
    });

    appServer.use(async (ctx, next) => {
      const cookie = await getCookie(ctx, process.env['COOKIE_NAME'], { silent: true });

      if (cookie) {
        const { data } = await checkCookie(cookie, {
          serviceUrl: process.env['IDENTITY_API_SRV'],
        });

        if ( ! data) {
          ctx.user = null;
        }
        else {
          ctx.user = data['data'];
        }
      }
      else {
        ctx.user = null;
      }

      await next();
    });

    initRouter(routes);

    httpServer.listen(process.env['PORT'], () => logger['info']('Server started on port: ' + process.env['PORT']));
  }
  catch(error) {
    logger['error'](error);
  }
})();
