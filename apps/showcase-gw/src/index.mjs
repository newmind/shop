
import createSocket from '@sys.packages/socket.io';
import appServer, { initRouter } from '@sys.packages/server';
import { connectToRabbit, createConsumer, bindQueueToExchange } from '@sys.packages/rabbit';

import http from 'http';
import koaCORS from "koa-cors2";

import routes from './routes';


(async () => {

  await connectToRabbit(process.env['RABBIT_CONNECTION_HOST']);

  await createConsumer(process.env['RABBIT_CLIENT_GW_QUEUE_CATEGORY_UPDATED'], (message) => io.emit('action', { type: process.env['SOCKET_CATEGORY_UPDATED'], payload: JSON.parse(message) }));
  await createConsumer(process.env['RABBIT_CLIENT_GW_QUEUE_COLOR_UPDATED'], (message) => io.emit('action', { type: process.env['SOCKET_COLOR_UPDATED'], payload: JSON.parse(message) }));
  await createConsumer(process.env['RABBIT_CLIENT_GW_QUEUE_COMMENT_UPDATED'], (message) => io.emit('action', { type: process.env['SOCKET_COMMENT_UPDATED'], payload: JSON.parse(message) }));
  await createConsumer(process.env['RABBIT_CLIENT_GW_QUEUE_CURRENCY_UPDATED'], (message) => io.emit('action', { type: process.env['SOCKET_CURRENCY_UPDATED'], payload: JSON.parse(message) }));
  await createConsumer(process.env['RABBIT_CLIENT_GW_QUEUE_FORM_UPDATED'], (message) => io.emit('action', { type: process.env['SOCKET_FORM_UPDATED'], payload: JSON.parse(message) }));
  await createConsumer(process.env['RABBIT_CLIENT_GW_QUEUE_MATERIAL_UPDATED'], (message) => io.emit('action', { type: process.env['SOCKET_MATERIAL_UPDATED'], payload: JSON.parse(message) }));
  await createConsumer(process.env['RABBIT_CLIENT_GW_QUEUE_PRODUCT_UPDATED'], (message) => io.emit('action', { type: process.env['SOCKET_PRODUCT_UPDATED'], payload: JSON.parse(message) }));
  await createConsumer(process.env['RABBIT_CLIENT_GW_QUEUE_TYPE_UPDATED'], (message) => io.emit('action', { type: process.env['SOCKET_TYPE_UPDATED'], payload: JSON.parse(message) }));
  await createConsumer(process.env['RABBIT_CLIENT_GW_QUEUE_UNIT_UPDATED'], (message) => io.emit('action', { type: process.env['SOCKET_UNIT_UPDATED'], payload: JSON.parse(message) }));

  // EXCHANGES

  await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CATEGORY_UPDATED'], process.env['RABBIT_CLIENT_GW_QUEUE_CATEGORY_UPDATED']);
  await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_COLOR_UPDATED'], process.env['RABBIT_CLIENT_GW_QUEUE_COLOR_UPDATED']);
  await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_COMMENT_UPDATED'], process.env['RABBIT_CLIENT_GW_QUEUE_COMMENT_UPDATED']);
  await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CURRENCY_UPDATED'], process.env['RABBIT_CLIENT_GW_QUEUE_CURRENCY_UPDATED']);
  await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_FORM_UPDATED'], process.env['RABBIT_CLIENT_GW_QUEUE_FORM_UPDATED']);
  await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_MATERIAL_UPDATED'], process.env['RABBIT_CLIENT_GW_QUEUE_MATERIAL_UPDATED']);
  await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_UPDATED'], process.env['RABBIT_CLIENT_GW_QUEUE_PRODUCT_UPDATED']);
  await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_TYPE_UPDATED'], process.env['RABBIT_CLIENT_GW_QUEUE_TYPE_UPDATED']);
  await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_UNIT_UPDATED'], process.env['RABBIT_CLIENT_GW_QUEUE_UNIT_UPDATED']);


  appServer.use(koaCORS({
    credentials: true,
    origin: process.env['HTTP_ORIGINS'],
    allowMethods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  }));

  const httpServer = http.createServer(appServer.callback());
  const io = await createSocket(httpServer, { path: '/showcase.socket.io' });

  appServer.use(async (ctx, next) => {
    ctx.io = io.sockets;
    await next();
  });

  initRouter(routes);

  httpServer.listen(process.env['PORT'], () => console.log('Server started on port', process.env['PORT']));
})();
