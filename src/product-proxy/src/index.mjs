'use strict';

import http from 'http';

import databaseORM from '@packages/db';
import createSocket from '@packages/socket.io';
import appServer, { initRouter } from '@packages/server';
import { connect as createConnection, channel as createChannel, createExchange } from "@packages/rabbit";

import routes from './routes/index';


(async () => {

  databaseORM(`postgres://${process.env['DATA_BASE_USERNAME']}:${process.env['DATA_BASE_PASSWORD']}@${process.env['DATA_BASE_HOST']}:${process.env['DATA_BASE_PORT']}/${process.env['DATA_BASE_NAME']}`);

  createConnection(process.env['RABBIT_CONNECTION_HOST'], (error, connection) => {
    createChannel(connection, async (error, channel) => {

      await createExchange(channel, process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_UPDATED']);
      await createExchange(channel, process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_CREATED']);
      await createExchange(channel, process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_DELETED']);

      await createExchange(channel, process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_STOCK_PRODUCT_CREATED']);
      await createExchange(channel, process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_STOCK_PRODUCT_UPDATED']);
      await createExchange(channel, process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_STOCK_PRODUCT_DELETED']);
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
