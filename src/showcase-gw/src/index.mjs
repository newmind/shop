'use strict';

import http from 'http';
import koaCORS from "koa-cors2";

import createSocket from '@packages/socket.io';
import appServer, { initRouter } from '@packages/server';
import {
  connect as createConnection,
  channel as createChannel,
  createConsumer,
  bindQueueToExchange
} from '@packages/rabbit';

import routes from './routes';


(async () => {

  createConnection(process.env['RABBIT_CONNECTION_HOST'], async (error, connection) => {
    createChannel(connection, async () => {

      // QUEUES

      await createConsumer(process.env['RABBIT_SHOWCASE_GW_QUEUE_UNIT_UPDATED'], (message) =>{ console.log(90); io.emit('action', { type: process.env['SOCKET_UNIT_UPDATED'], payload: JSON.parse(message) })});
      await createConsumer(process.env['RABBIT_SHOWCASE_GW_QUEUE_UNIT_CREATED'], (message) => io.emit('action', { type: process.env['SOCKET_UNIT_CREATED'], payload: JSON.parse(message) }));
      await createConsumer(process.env['RABBIT_SHOWCASE_GW_QUEUE_UNIT_DELETED'], (message) => io.emit('action', { type: process.env['SOCKET_UNIT_DELETED'], payload: Number(message) }));

      await createConsumer(process.env['RABBIT_SHOWCASE_GW_QUEUE_CATEGORY_UPDATED'], (message) => io.emit('action', { type: process.env['SOCKET_CATEGORY_UPDATED'], payload: JSON.parse(message) }));
      await createConsumer(process.env['RABBIT_SHOWCASE_GW_QUEUE_CATEGORY_CREATED'], (message) => io.emit('action', { type: process.env['SOCKET_CATEGORY_CREATED'], payload: JSON.parse(message) }));
      await createConsumer(process.env['RABBIT_SHOWCASE_GW_QUEUE_CATEGORY_DELETED'], (message) => io.emit('action', { type: process.env['SOCKET_CATEGORY_DELETED'], payload: Number(message) }));

      await createConsumer(process.env['RABBIT_SHOWCASE_GW_QUEUE_PRODUCT_UPDATED'], (message) => io.emit('action', { type: process.env['SOCKET_PRODUCT_UPDATED'], payload: JSON.parse(message) }));
      await createConsumer(process.env['RABBIT_SHOWCASE_GW_QUEUE_PRODUCT_CREATED'], (message) => io.emit('action', { type: process.env['SOCKET_PRODUCT_CREATED'], payload: JSON.parse(message) }));
      await createConsumer(process.env['RABBIT_SHOWCASE_GW_QUEUE_PRODUCT_DELETED'], (message) => io.emit('action', { type: process.env['SOCKET_PRODUCT_DELETED'], payload: Number(message) }));

      await createConsumer(process.env['RABBIT_SHOWCASE_GW_QUEUE_STOCK_PRODUCT_CREATED'], (message) => io.emit('action', { type: process.env['SOCKET_STOCK_PRODUCT_CREATED'], payload: JSON.parse(message) }));
      await createConsumer(process.env['RABBIT_SHOWCASE_GW_QUEUE_STOCK_PRODUCT_UPDATED'], (message) => io.emit('action', { type: process.env['SOCKET_STOCK_PRODUCT_UPDATED'], payload: JSON.parse(message) }));
      await createConsumer(process.env['RABBIT_SHOWCASE_GW_QUEUE_STOCK_PRODUCT_DELETED'], (message) => io.emit('action', { type: process.env['SOCKET_STOCK_PRODUCT_DELETED'], payload: Number(message) }));


      // EXCHANGES

      await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_UNIT_CREATED'], process.env['RABBIT_SHOWCASE_GW_QUEUE_UNIT_CREATED']);
      await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_UNIT_UPDATED'], process.env['RABBIT_SHOWCASE_GW_QUEUE_UNIT_UPDATED']);
      await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_UNIT_DELETED'], process.env['RABBIT_SHOWCASE_GW_QUEUE_UNIT_DELETED']);

      await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CATEGORY_CREATED'], process.env['RABBIT_SHOWCASE_GW_QUEUE_CATEGORY_CREATED']);
      await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CATEGORY_UPDATED'], process.env['RABBIT_SHOWCASE_GW_QUEUE_CATEGORY_UPDATED']);
      await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CATEGORY_DELETED'], process.env['RABBIT_SHOWCASE_GW_QUEUE_CATEGORY_DELETED']);

      await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_CREATED'], process.env['RABBIT_SHOWCASE_GW_QUEUE_PRODUCT_CREATED']);
      await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_UPDATED'], process.env['RABBIT_SHOWCASE_GW_QUEUE_PRODUCT_UPDATED']);
      await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_DELETED'], process.env['RABBIT_SHOWCASE_GW_QUEUE_PRODUCT_DELETED']);

      await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_STOCK_PRODUCT_CREATED'], process.env['RABBIT_SHOWCASE_GW_QUEUE_STOCK_PRODUCT_CREATED']);
      await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_STOCK_PRODUCT_UPDATED'], process.env['RABBIT_SHOWCASE_GW_QUEUE_STOCK_PRODUCT_UPDATED']);
      await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_STOCK_PRODUCT_DELETED'], process.env['RABBIT_SHOWCASE_GW_QUEUE_STOCK_PRODUCT_DELETED']);
    });
  });

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
