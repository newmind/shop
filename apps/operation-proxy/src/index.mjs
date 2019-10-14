'use strict';

import http from 'http';

import databaseORM from '@sys.packages/db';
import appServer, { initRouter } from '@sys.packages/server';
import {
  bindQueueToExchange,
  channel as createChannel,
  connect as createConnection,
  createConsumer,
  // createExchange
} from "@sys.packages/rabbit";

import routes from './routes';


(async () => {

  databaseORM(`postgres://${process.env['DATA_BASE_USERNAME']}:${process.env['DATA_BASE_PASSWORD']}@${process.env['DATA_BASE_HOST']}:${process.env['DATA_BASE_PORT']}/${process.env['DATA_BASE_NAME']}`);

  createConnection(process.env['RABBIT_CONNECTION_HOST'], (error, connection) => {
    createChannel(connection, async () => {

      await createConsumer(process.env['RABBIT_OPERATION_PROXY_QUEUE_UNIT_UPDATED'], (message) => console.log(1, message));
      await createConsumer(process.env['RABBIT_OPERATION_PROXY_QUEUE_UNIT_CREATED'], (message) => console.log(2, message));
      await createConsumer(process.env['RABBIT_OPERATION_PROXY_QUEUE_UNIT_DELETED'], (message) => console.log(3, message));

      await createConsumer(process.env['RABBIT_OPERATION_PROXY_QUEUE_CATEGORY_UPDATED'], (message) => console.log(4, message));
      await createConsumer(process.env['RABBIT_OPERATION_PROXY_QUEUE_CATEGORY_CREATED'], (message) => console.log(5, message));
      await createConsumer(process.env['RABBIT_OPERATION_PROXY_QUEUE_CATEGORY_DELETED'], (message) => console.log(6, message));

      await createConsumer(process.env['RABBIT_OPERATION_PROXY_QUEUE_PRODUCT_UPDATED'], (message) => console.log(7, message));
      await createConsumer(process.env['RABBIT_OPERATION_PROXY_QUEUE_PRODUCT_CREATED'], (message) => console.log(8, message));
      await createConsumer(process.env['RABBIT_OPERATION_PROXY_QUEUE_PRODUCT_DELETED'], (message) => console.log(9, message));

      await createConsumer(process.env['RABBIT_OPERATION_PROXY_QUEUE_STOCK_PRODUCT_CREATED'], (message) => console.log(10, message));
      await createConsumer(process.env['RABBIT_OPERATION_PROXY_QUEUE_STOCK_PRODUCT_UPDATED'], (message) => console.log(11, message));
      await createConsumer(process.env['RABBIT_OPERATION_PROXY_QUEUE_STOCK_PRODUCT_DELETED'], (message) => console.log(12, message));


      await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_UNIT_CREATED'], process.env['RABBIT_OPERATION_PROXY_QUEUE_UNIT_CREATED']);
      await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_UNIT_UPDATED'], process.env['RABBIT_OPERATION_PROXY_QUEUE_UNIT_UPDATED']);
      await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_UNIT_DELETED'], process.env['RABBIT_OPERATION_PROXY_QUEUE_UNIT_DELETED']);

      await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CATEGORY_CREATED'], process.env['RABBIT_OPERATION_PROXY_QUEUE_CATEGORY_CREATED']);
      await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CATEGORY_UPDATED'], process.env['RABBIT_OPERATION_PROXY_QUEUE_CATEGORY_UPDATED']);
      await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CATEGORY_DELETED'], process.env['RABBIT_OPERATION_PROXY_QUEUE_CATEGORY_DELETED']);

      await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_CREATED'], process.env['RABBIT_OPERATION_PROXY_QUEUE_PRODUCT_CREATED']);
      await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_UPDATED'], process.env['RABBIT_OPERATION_PROXY_QUEUE_PRODUCT_UPDATED']);
      await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_DELETED'], process.env['RABBIT_OPERATION_PROXY_QUEUE_PRODUCT_DELETED']);

      await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_STOCK_PRODUCT_CREATED'], process.env['RABBIT_OPERATION_PROXY_QUEUE_STOCK_PRODUCT_CREATED']);
      await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_STOCK_PRODUCT_UPDATED'], process.env['RABBIT_OPERATION_PROXY_QUEUE_STOCK_PRODUCT_UPDATED']);
      await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_STOCK_PRODUCT_DELETED'], process.env['RABBIT_OPERATION_PROXY_QUEUE_STOCK_PRODUCT_DELETED']);
    });
  });

  const httpServer = http.createServer(appServer.callback());

  initRouter(routes);

  httpServer.listen(process.env['PORT'], () => console.log('Server started on port', process.env['PORT']));
})();
