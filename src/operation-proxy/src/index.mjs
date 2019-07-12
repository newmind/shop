'use strict';

import http from 'http';

import databaseORM from '@sys.packages/db';
import appServer, { initRouter } from '@sys.packages/server';
// import { connect as createConnection, channel as createChannel, createExchange } from "@sys.packages/rabbit";

import routes from './routes';


(async () => {

  databaseORM(`postgres://${process.env['DATA_BASE_USERNAME']}:${process.env['DATA_BASE_PASSWORD']}@${process.env['DATA_BASE_HOST']}:${process.env['DATA_BASE_PORT']}/${process.env['DATA_BASE_NAME']}`);

  const httpServer = http.createServer(appServer.callback());

  // const connection = await createConnection(process.env['RABBIT_CONNECTION_HOST']);
  // const channel = await createChannel(connection);
  //
  // await createExchange(channel, process.env['RABBIT_OPERATION_PROXY_EXCHANGE_ORDER_UPDATED']);
  // await createExchange(channel, process.env['RABBIT_OPERATION_PROXY_EXCHANGE_ORDER_CREATED']);
  //
  // appServer.use(async (ctx, next) => {
  //   ctx.rabbit = channel;
  //   await next();
  // });

  initRouter(routes);

  httpServer.listen(process.env['PORT'], () => console.log('Server started on port', process.env['PORT']));
})();
