'use strict';

import http from 'http';

import databaseORM from '@packages/db';
import createSocket from '@packages/socket.io';
import appServer, { initRouter } from '@packages/server';
import { connect as createConnection, channel as createChannel, createExchange } from "@packages/rabbit";

import routes from './routes/index';


(async () => {

  const httpServer = http.createServer(appServer.callback());
  const io = await createSocket(httpServer);

  const connection = await createConnection(process.env['RABBIT_CONNECTION_HOST']);
  const channel = await createChannel(connection);

  await createExchange(channel, process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_UPDATED']);
  await createExchange(channel, process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_CREATED']);
  await createExchange(channel, process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_DELETED']);

  await createExchange(channel, process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_STOCK_PRODUCT_CREATED']);
  await createExchange(channel, process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_STOCK_PRODUCT_UPDATED']);
  await createExchange(channel, process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_STOCK_PRODUCT_DELETED']);

  appServer.use(async (ctx, next) => {
    ctx.io = io.sockets;
    ctx.rabbit = channel;
    await next();
  });

  initRouter(routes);

  databaseORM();

  httpServer.listen(process.env['PORT'], () => console.log('Server started on port', process.env['PORT']));
})();
