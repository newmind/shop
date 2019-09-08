'use strict';

import http from 'http';

import koaCORS from "koa-cors2";
import cookie from 'koa-cookie';

import jwtToken from '@sys.packages/jwt';
import createSocket, { emitToRoom } from '@sys.packages/socket.io';
import appServer, { initRouter } from '@sys.packages/server';
import { connect as createConnection, channel as createChannel, createConsumer, bindQueueToExchange } from "@sys.packages/rabbit";

import routes from './routes';


(async () => {

  try {

    appServer.use(koaCORS({
      credentials: true,
      origin: process.env['HTTP_ORIGINS'],
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
    const io = await createSocket(httpServer);

    createConnection(process.env['RABBIT_CONNECTION_HOST'], async (error, connection) => {
      createChannel(connection, async () => {

        // QUEUES

        await createConsumer(process.env['RABBIT_IDENTITY_SRV_QUEUE_PASSPORT_UPDATED'], (message) => {
          const passport = JSON.parse(message);
          emitToRoom(passport['id'], process.env['SOCKET_PASSPORT_UPDATED'], passport);
        });

        await createConsumer(process.env['RABBIT_ADMIN_GW_QUEUE_UNIT_UPDATED'], (message) => io.emit('action', { type: process.env['SOCKET_UNIT_UPDATED'], payload: JSON.parse(message) }));
        await createConsumer(process.env['RABBIT_ADMIN_GW_QUEUE_UNIT_CREATED'], (message) => io.emit('action', { type: process.env['SOCKET_UNIT_CREATED'], payload: JSON.parse(message) }));
        await createConsumer(process.env['RABBIT_ADMIN_GW_QUEUE_UNIT_DELETED'], (message) => io.emit('action', { type: process.env['SOCKET_UNIT_DELETED'], payload: Number(message) }));

        await createConsumer(process.env['RABBIT_ADMIN_GW_QUEUE_CATEGORY_UPDATED'], (message) => io.emit('action', { type: process.env['SOCKET_CATEGORY_UPDATED'], payload: JSON.parse(message) }));
        await createConsumer(process.env['RABBIT_ADMIN_GW_QUEUE_CATEGORY_CREATED'], (message) => io.emit('action', { type: process.env['SOCKET_CATEGORY_CREATED'], payload: JSON.parse(message) }));
        await createConsumer(process.env['RABBIT_ADMIN_GW_QUEUE_CATEGORY_DELETED'], (message) => io.emit('action', { type: process.env['SOCKET_CATEGORY_DELETED'], payload: Number(message) }));

        await createConsumer(process.env['RABBIT_ADMIN_GW_QUEUE_PRODUCT_UPDATED'], (message) => io.emit('action', { type: process.env['SOCKET_PRODUCT_UPDATED'], payload: JSON.parse(message) }));
        await createConsumer(process.env['RABBIT_ADMIN_GW_QUEUE_PRODUCT_CREATED'], (message) => io.emit('action', { type: process.env['SOCKET_PRODUCT_CREATED'], payload: JSON.parse(message) }));
        await createConsumer(process.env['RABBIT_ADMIN_GW_QUEUE_PRODUCT_DELETED'], (message) => io.emit('action', { type: process.env['SOCKET_PRODUCT_DELETED'], payload: Number(message) }));

        await createConsumer(process.env['RABBIT_ADMIN_GW_QUEUE_STOCK_PRODUCT_CREATED'], (message) => io.emit('action', { type: process.env['SOCKET_STOCK_PRODUCT_CREATED'], payload: JSON.parse(message) }));
        await createConsumer(process.env['RABBIT_ADMIN_GW_QUEUE_STOCK_PRODUCT_UPDATED'], (message) => io.emit('action', { type: process.env['SOCKET_STOCK_PRODUCT_UPDATED'], payload: JSON.parse(message) }));
        await createConsumer(process.env['RABBIT_ADMIN_GW_QUEUE_STOCK_PRODUCT_DELETED'], (message) => io.emit('action', { type: process.env['SOCKET_STOCK_PRODUCT_DELETED'], payload: Number(message) }));


        // EXCHANGES

        await bindQueueToExchange(process.env['RABBIT_IDENTITY_SRV_EXCHANGE_PASSPORT_UPDATED'], process.env['RABBIT_IDENTITY_SRV_QUEUE_PASSPORT_UPDATED']);

        await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_UNIT_CREATED'], process.env['RABBIT_ADMIN_GW_QUEUE_UNIT_CREATED']);
        await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_UNIT_UPDATED'], process.env['RABBIT_ADMIN_GW_QUEUE_UNIT_UPDATED']);
        await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_UNIT_DELETED'], process.env['RABBIT_ADMIN_GW_QUEUE_UNIT_DELETED']);

        await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CATEGORY_CREATED'], process.env['RABBIT_ADMIN_GW_QUEUE_CATEGORY_CREATED']);
        await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CATEGORY_UPDATED'], process.env['RABBIT_ADMIN_GW_QUEUE_CATEGORY_UPDATED']);
        await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CATEGORY_DELETED'], process.env['RABBIT_ADMIN_GW_QUEUE_CATEGORY_DELETED']);

        await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_CREATED'], process.env['RABBIT_ADMIN_GW_QUEUE_PRODUCT_CREATED']);
        await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_UPDATED'], process.env['RABBIT_ADMIN_GW_QUEUE_PRODUCT_UPDATED']);
        await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_DELETED'], process.env['RABBIT_ADMIN_GW_QUEUE_PRODUCT_DELETED']);

        await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_STOCK_PRODUCT_CREATED'], process.env['RABBIT_ADMIN_GW_QUEUE_STOCK_PRODUCT_CREATED']);
        await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_STOCK_PRODUCT_UPDATED'], process.env['RABBIT_ADMIN_GW_QUEUE_STOCK_PRODUCT_UPDATED']);
        await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_STOCK_PRODUCT_DELETED'], process.env['RABBIT_ADMIN_GW_QUEUE_STOCK_PRODUCT_DELETED']);
      });
    });

    appServer.use(async (ctx, next) => {
      ctx.io = io.sockets;
      await next();
    });

    initRouter(routes);

    httpServer.listen(process.env['PORT'], () => console.log('Server started on port', process.env['PORT']));

  } catch(error) {
    console.log(2, error);
  }
})();
