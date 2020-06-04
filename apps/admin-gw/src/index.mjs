
import koaCORS from '@sys.packages/cors';
import jwtToken from '@sys.packages/jwt';
import logger from '@sys.packages/logger';
import appServer, { initRouter } from '@sys.packages/server';
import createSocket from '@sys.packages/socket.io';
import { connectToRabbit, queueToExchange } from "@sys.packages/rabbit";

import http from 'http';

import cookie from 'koa-cookie';

import routes from './routes';

import { updatePassport } from './actions/passport';
import { createComment, updateComment, deleteComment } from './actions/comments';
import { createType, updateType, deleteTypes } from './actions/type';


(async () => {
  try {

    await connectToRabbit(process.env['RABBIT_CONNECTION_HOST']);

    // QUEUES

    await queueToExchange(process.env['RABBIT_IDENTITY_SRV_QUEUE_PASSPORT_UPDATED'], process.env['RABBIT_IDENTITY_SRV_EXCHANGE_PASSPORT_UPDATED'], updatePassport());

    await queueToExchange(process.env['RABBIT_ADMIN_GW_QUEUE_COMMENT_CREATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_COMMENT_CREATED'], createComment());
    await queueToExchange(process.env['RABBIT_ADMIN_GW_QUEUE_COMMENT_UPDATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_COMMENT_UPDATED'], updateComment());
    await queueToExchange(process.env['RABBIT_ADMIN_GW_QUEUE_COMMENT_DELETED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_COMMENT_DELETED'], deleteComment());

    await queueToExchange(process.env['RABBIT_ADMIN_GW_QUEUE_TYPE_CREATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_TYPE_CREATED'], createType());
    await queueToExchange(process.env['RABBIT_ADMIN_GW_QUEUE_TYPE_UPDATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_TYPE_UPDATED'], updateType());
    await queueToExchange(process.env['RABBIT_ADMIN_GW_QUEUE_TYPE_DELETED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_TYPE_DELETED'], deleteTypes());

    await queueToExchange(process.env['RABBIT_ADMIN_GW_QUEUE_CATEGORY_CREATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CATEGORY_CREATED'], (message) => io.emit('action', { type: process.env['SOCKET_CATEGORY_CREATED'], payload: JSON.parse(message) }));
    await queueToExchange(process.env['RABBIT_ADMIN_GW_QUEUE_CATEGORY_UPDATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CATEGORY_UPDATED'], (message) => io.emit('action', { type: process.env['SOCKET_CATEGORY_UPDATED'], payload: JSON.parse(message) }));
    await queueToExchange(process.env['RABBIT_ADMIN_GW_QUEUE_CATEGORY_DELETED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CATEGORY_DELETED'], (message) => io.emit('action', { type: process.env['SOCKET_CATEGORY_DELETED'], payload: JSON.parse(message) }));

    await queueToExchange(process.env['RABBIT_ADMIN_GW_QUEUE_COLOR_CREATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_COLOR_CREATED'], (message) => io.emit('action', { type: process.env['SOCKET_COLOR_CREATED'], payload: JSON.parse(message) }));
    await queueToExchange(process.env['RABBIT_ADMIN_GW_QUEUE_COLOR_UPDATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_COLOR_UPDATED'], (message) => io.emit('action', { type: process.env['SOCKET_COLOR_UPDATED'], payload: JSON.parse(message) }));
    await queueToExchange(process.env['RABBIT_ADMIN_GW_QUEUE_COLOR_DELETED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_COLOR_DELETED'], (message) => io.emit('action', { type: process.env['SOCKET_COLOR_DELETED'], payload: JSON.parse(message) }));

    await queueToExchange(process.env['RABBIT_ADMIN_GW_QUEUE_CURRENCY_CREATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CURRENCY_CREATED'], (message) => io.emit('action', { type: process.env['SOCKET_CURRENCY_CREATED'], payload: JSON.parse(message) }));
    await queueToExchange(process.env['RABBIT_ADMIN_GW_QUEUE_CURRENCY_UPDATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CURRENCY_UPDATED'], (message) => io.emit('action', { type: process.env['SOCKET_CURRENCY_UPDATED'], payload: JSON.parse(message) }));
    await queueToExchange(process.env['RABBIT_ADMIN_GW_QUEUE_CURRENCY_DELETED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CURRENCY_DELETED'], (message) => io.emit('action', { type: process.env['SOCKET_CURRENCY_DELETED'], payload: JSON.parse(message) }));

    await queueToExchange(process.env['RABBIT_ADMIN_GW_QUEUE_FORM_CREATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_FORM_CREATED'], (message) => io.emit('action', { type: process.env['SOCKET_FORM_CREATED'], payload: JSON.parse(message) }));
    await queueToExchange(process.env['RABBIT_ADMIN_GW_QUEUE_FORM_UPDATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_FORM_UPDATED'], (message) => io.emit('action', { type: process.env['SOCKET_FORM_UPDATED'], payload: JSON.parse(message) }));
    await queueToExchange(process.env['RABBIT_ADMIN_GW_QUEUE_FORM_DELETED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_FORM_DELETED'], (message) => io.emit('action', { type: process.env['SOCKET_FORM_DELETED'], payload: JSON.parse(message) }));

    await queueToExchange(process.env['RABBIT_ADMIN_GW_QUEUE_MATERIAL_CREATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_MATERIAL_CREATED'], (message) => io.emit('action', { type: process.env['SOCKET_MATERIAL_CREATED'], payload: JSON.parse(message) }));
    await queueToExchange(process.env['RABBIT_ADMIN_GW_QUEUE_MATERIAL_UPDATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_MATERIAL_UPDATED'], (message) => io.emit('action', { type: process.env['SOCKET_MATERIAL_UPDATED'], payload: JSON.parse(message) }));
    await queueToExchange(process.env['RABBIT_ADMIN_GW_QUEUE_MATERIAL_DELETED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_MATERIAL_DELETED'], (message) => io.emit('action', { type: process.env['SOCKET_MATERIAL_DELETED'], payload: JSON.parse(message) }));

    await queueToExchange(process.env['RABBIT_ADMIN_GW_QUEUE_PRODUCT_CREATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_CREATED'], (message) => io.emit('action', { type: process.env['SOCKET_PRODUCT_CREATED'], payload: JSON.parse(message) }));
    await queueToExchange(process.env['RABBIT_ADMIN_GW_QUEUE_PRODUCT_UPDATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_UPDATED'], (message) => io.emit('action', { type: process.env['SOCKET_PRODUCT_UPDATED'], payload: JSON.parse(message) }));
    await queueToExchange(process.env['RABBIT_ADMIN_GW_QUEUE_PRODUCT_DELETED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_DELETED'], (message) => io.emit('action', { type: process.env['SOCKET_PRODUCT_DELETED'], payload: JSON.parse(message) }));


    await queueToExchange(process.env['RABBIT_ADMIN_GW_QUEUE_UNIT_CREATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_UNIT_CREATED'], (message) => io.emit('action', { type: process.env['SOCKET_UNIT_CREATED'], payload: JSON.parse(message) }));
    await queueToExchange(process.env['RABBIT_ADMIN_GW_QUEUE_UNIT_UPDATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_UNIT_UPDATED'], (message) => io.emit('action', { type: process.env['SOCKET_UNIT_UPDATED'], payload: JSON.parse(message) }));
    await queueToExchange(process.env['RABBIT_ADMIN_GW_QUEUE_UNIT_DELETED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_UNIT_DELETED'], (message) => io.emit('action', { type: process.env['SOCKET_UNIT_DELETED'], payload: JSON.parse(message) }));


    appServer.use(koaCORS({
      credentials: true,
      origin: process.env['HTTP_ORIGINS'].split(','),
      allowMethods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    }));

    appServer.use(cookie.default());

    appServer.use(async (ctx, next) => {
      const { url, method } = ctx.request;

      if (/^\/sign-in/.test(url) && method === 'POST') {
        await next();
      } else {
        await jwtToken({ name: process.env['COOKIE_NAME'], serviceUrl: process.env['INVOICE_API_SRV'] })(ctx, next);
      }
    });

    const httpServer = http.createServer(appServer.callback());
    const io = await createSocket(httpServer, {
      path: process.env['SOCKET_PATH'],
    });

    appServer.use(async (ctx, next) => {
      ctx.io = io.sockets;
      await next();
    });

    initRouter(routes);

    httpServer.listen(process.env['PORT'], () => {
      logger['info']('Server started on port ' + process.env['PORT'])
    });
  }
  catch(error) {

    logger['error'](error);
  }
})();
