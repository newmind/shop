'use strict';

import http from 'http';

import koaCORS from "koa-cors2";
import cookie from 'koa-cookie';
import cookies from 'cookie';
import request from 'axios';


import createSocket from '@packages/socket.io';
import appServer, { initRouter } from '@packages/server';
import { connect as createConnection, channel as createChannel, createConsumer, bindQueueToExchange } from "@packages/rabbit";

import routes from './routes';


(async () => {

  try {

    createConnection(process.env['RABBIT_CONNECTION_HOST'], async (error, connection) => {
      createChannel(connection, async (error, channel) => {

        createConsumer(process.env['RABBIT_ADMIN_GW_QUEUE_PRODUCT_UPDATED'], (message) => {
          io.emit('action', { type: process.env['SOCKET_PRODUCT_UPDATED'], payload: JSON.parse(message) })
        });

        createConsumer(process.env['RABBIT_ADMIN_GW_QUEUE_PRODUCT_CREATED'], (message) => {
          io.emit('action', { type: process.env['SOCKET_PRODUCT_CREATED'], payload: JSON.parse(message) })
        });

        await createConsumer(process.env['RABBIT_ADMIN_GW_QUEUE_PRODUCT_DELETED'], (message) => {
          io.emit('action', { type: process.env['SOCKET_PRODUCT_DELETED'], payload: Number(message) })
        });

        await createConsumer(process.env['RABBIT_ADMIN_GW_QUEUE_STOCK_PRODUCT_CREATED'], (message) => {
          io.emit('action', { type: process.env['SOCKET_STOCK_PRODUCT_CREATED'], payload: JSON.parse(message) })
        });

        await createConsumer(process.env['RABBIT_ADMIN_GW_QUEUE_STOCK_PRODUCT_UPDATED'], (message) => {
          io.emit('action', { type: process.env['SOCKET_STOCK_PRODUCT_UPDATED'], payload: JSON.parse(message) })
        });

        await createConsumer(process.env['RABBIT_ADMIN_GW_QUEUE_STOCK_PRODUCT_DELETED'], (message) => {
          io.emit('action', { type: process.env['SOCKET_STOCK_PRODUCT_DELETED'], payload: Number(message) })
        });


        await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_CREATED'], process.env['RABBIT_ADMIN_GW_QUEUE_PRODUCT_CREATED']);
        await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_UPDATED'], process.env['RABBIT_ADMIN_GW_QUEUE_PRODUCT_UPDATED']);
        await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_DELETED'], process.env['RABBIT_ADMIN_GW_QUEUE_PRODUCT_DELETED']);

        await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_STOCK_PRODUCT_CREATED'], process.env['RABBIT_ADMIN_GW_QUEUE_STOCK_PRODUCT_CREATED']);
        await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_STOCK_PRODUCT_UPDATED'], process.env['RABBIT_ADMIN_GW_QUEUE_STOCK_PRODUCT_UPDATED']);
        await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_STOCK_PRODUCT_DELETED'], process.env['RABBIT_ADMIN_GW_QUEUE_STOCK_PRODUCT_DELETED']);
      });
    });

    appServer.use(koaCORS({
      credentials: true,
      origin: process.env['HTTP_ORIGINS'],
      allowMethods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    }));

    appServer.use(cookie.default());

    appServer.use(async (ctx, next) => {
      const { url } = ctx.request;

      if (/^\/sign-in/.test(url)) {

        await next();

      } else {
        try {
          const { admin = null } = ctx.cookie;

          if ( ! admin) {
            ctx.throw(500, 'Неверный объект cookie');
          }

          const { token = null } = JSON.parse(decodeURIComponent(admin));

          if ( ! token) {
            ctx.throw(500, 'Неверное свойство cookie');
          }

          await request({
            url: `${process.env['INVOICE_API_SRV']}/check`,
            method: 'post',
            data: {
              token: token,
            },
          });

          await next();

        } catch(error) {

          const { data } = error.response;

          ctx.throw(data['status'], data['message']);
        }
      }
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
