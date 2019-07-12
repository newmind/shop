'use strict';

import http from 'http';

import databaseORM from '@sys.packages/db';
import createSocket from '@sys.packages/socket.io';
import appServer, { initRouter } from '@sys.packages/server';
import { connect as createConnection, channel as createChannel, createExchange } from "@sys.packages/rabbit";

import routes from './routes';


(async () => {

  databaseORM(`postgres://${process.env['DATA_BASE_USERNAME']}:${process.env['DATA_BASE_PASSWORD']}@${process.env['DATA_BASE_HOST']}:${process.env['DATA_BASE_PORT']}/${process.env['DATA_BASE_NAME']}`);

  createConnection(process.env['RABBIT_CONNECTION_HOST'], (error, connection) => {
    createChannel(connection, async () => {

      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_UNIT_UPDATED']);
      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_UNIT_CREATED']);
      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_UNIT_DELETED']);

      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CURRENCY_UPDATED']);
      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CURRENCY_CREATED']);
      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CURRENCY_DELETED']);

      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CATEGORY_UPDATED']);
      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CATEGORY_CREATED']);
      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CATEGORY_DELETED']);

      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_UPDATED']);
      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_CREATED']);
      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_DELETED']);

      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_STOCK_PRODUCT_CREATED']);
      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_STOCK_PRODUCT_UPDATED']);
      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_STOCK_PRODUCT_DELETED']);
    });
  });

  const httpServer = http.createServer(appServer.callback());
  const io = await createSocket(httpServer);

  appServer.use(async (ctx, next) => {
    ctx.io = io.sockets;
    await next();
  });

  initRouter(routes);

  httpServer.listen(process.env['PORT'], () => console.log('Server started on port', process.env['PORT']));
})();
