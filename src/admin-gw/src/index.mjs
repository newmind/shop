'use strict';

import http from 'http';

import createSocket from '@packages/socket.io';
import appServer, { initRouter } from '@packages/server';
import { connect as createConnection, channel as createChannel, createConsumer, bindQueueToExchange } from "@packages/rabbit";

import routes from './routes/index';


(async () => {

  try {

    createConnection(process.env['RABBIT_CONNECTION_HOST'], async (error, connection) => {
      createChannel(connection, async (error, channel) => {

        createConsumer(channel, process.env['RABBIT_ADMIN_GW_QUEUE_PRODUCT_UPDATED'], (message) => {
          io.emit('action', { type: process.env['SOCKET_PRODUCT_UPDATED'], payload: JSON.parse(message) })
        });

        createConsumer(channel, process.env['RABBIT_ADMIN_GW_QUEUE_PRODUCT_CREATED'], (message) => {
          io.emit('action', { type: process.env['SOCKET_PRODUCT_CREATED'], payload: JSON.parse(message) })
        });

        await createConsumer(channel, process.env['RABBIT_ADMIN_GW_QUEUE_PRODUCT_DELETED'], (message) => {
          io.emit('action', { type: process.env['SOCKET_PRODUCT_DELETED'], payload: Number(message) })
        });


        await createConsumer(channel, process.env['RABBIT_ADMIN_GW_QUEUE_STOCK_PRODUCT_CREATED'], (message) => {
          io.emit('action', { type: process.env['SOCKET_STOCK_PRODUCT_CREATED'], payload: JSON.parse(message) })
        });

        await createConsumer(channel, process.env['RABBIT_ADMIN_GW_QUEUE_STOCK_PRODUCT_UPDATED'], (message) => {
          io.emit('action', { type: process.env['SOCKET_STOCK_PRODUCT_UPDATED'], payload: JSON.parse(message) })
        });

        await createConsumer(channel, process.env['RABBIT_ADMIN_GW_QUEUE_STOCK_PRODUCT_DELETED'], (message) => {
          io.emit('action', { type: process.env['SOCKET_STOCK_PRODUCT_DELETED'], payload: Number(message) })
        });


        await bindQueueToExchange(channel, process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_CREATED'], process.env['RABBIT_ADMIN_GW_QUEUE_PRODUCT_CREATED']);
        await bindQueueToExchange(channel, process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_UPDATED'], process.env['RABBIT_ADMIN_GW_QUEUE_PRODUCT_UPDATED']);
        await bindQueueToExchange(channel, process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_DELETED'], process.env['RABBIT_ADMIN_GW_QUEUE_PRODUCT_DELETED']);

        await bindQueueToExchange(channel, process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_STOCK_PRODUCT_CREATED'], process.env['RABBIT_ADMIN_GW_QUEUE_STOCK_PRODUCT_CREATED']);
        await bindQueueToExchange(channel, process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_STOCK_PRODUCT_UPDATED'], process.env['RABBIT_ADMIN_GW_QUEUE_STOCK_PRODUCT_UPDATED']);
        await bindQueueToExchange(channel, process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_STOCK_PRODUCT_DELETED'], process.env['RABBIT_ADMIN_GW_QUEUE_STOCK_PRODUCT_DELETED']);
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

  } catch(error) {
    console.log(2, error);
  }
})();
