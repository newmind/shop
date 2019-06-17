'use strict';

import http from 'http';

import createSocket from '@packages/socket.io';
import appServer, { initRouter } from '@packages/server';
import {
  connect as createConnection,
  channel as createChannel,
  createConsumer,
  bindQueueToExchange
} from '@packages/rabbit';

import routes from './routes/index';


(async () => {

  const httpServer = http.createServer(appServer.callback());
  const io = await createSocket(httpServer);

  const connection = await createConnection(process.env['RABBIT_CONNECTION_HOST']);
  const channel = await createChannel(connection);

  await createConsumer(channel, process.env['RABBIT_SHOWCASE_GW_QUEUE_PRODUCT_UPDATED'], (message) => {
    io.emit('action', { type: process.env['SOCKET_PRODUCT_UPDATED'], payload: JSON.parse(message) });
  });

  await bindQueueToExchange(channel, process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_UPDATED'], process.env['RABBIT_SHOWCASE_GW_QUEUE_PRODUCT_UPDATED']);

  appServer.use(async (ctx, next) => {
    ctx.io = io.sockets;
    await next();
  });

  initRouter(routes);

  httpServer.listen(process.env['PORT'], () => console.log('Server started on port', process.env['PORT']));
})();
