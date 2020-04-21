
import databaseORM from '@sys.packages/db';
import appServer, { initRouter } from '@sys.packages/server';
import { connect as createConnection, channel as createChannel, createExchange, bindQueueToExchange, createConsumer } from "@sys.packages/rabbit";

import http from 'http';

import { createProduct, updateProductById, deleteProductById } from './controllers/Products';
import { createImage } from './controllers/Gallery';

import routes from './routes';


(async () => {

  databaseORM(`postgres://${process.env['DATA_BASE_USERNAME']}:${process.env['DATA_BASE_PASSWORD']}@${process.env['DATA_BASE_HOST']}:${process.env['DATA_BASE_PORT']}/${process.env['DATA_BASE_NAME']}`);

  createConnection(process.env['RABBIT_CONNECTION_HOST'], (error, connection) => {
    createChannel(connection, async () => {

      await createExchange(process.env['RABBIT_OPERATION_PROXY_EXCHANGE_UPDATED']);
      await createExchange(process.env['RABBIT_OPERATION_PROXY_EXCHANGE_CREATED']);

      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_GALLERY_CREATED']);

      await createConsumer(process.env['RABBIT_OPERATION_PROXY_QUEUE_PRODUCT_CREATED'], (event) => { createProduct(JSON.parse(event)); })
      await createConsumer(process.env['RABBIT_OPERATION_PROXY_QUEUE_PRODUCT_UPDATED'], (event) => { updateProductById(JSON.parse(event)); })
      await createConsumer(process.env['RABBIT_OPERATION_PROXY_QUEUE_PRODUCT_DELETED'], (event) => { deleteProductById(JSON.parse(event)); })

      await createConsumer(process.env['RABBIT_OPERATION_PROXY_QUEUE_GALLERY_CREATED'], (event) => { createImage(JSON.parse(event)); })

      await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_CREATED'], process.env['RABBIT_OPERATION_PROXY_QUEUE_PRODUCT_CREATED']);
      await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_UPDATED'], process.env['RABBIT_OPERATION_PROXY_QUEUE_PRODUCT_UPDATED']);
      await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_DELETED'], process.env['RABBIT_OPERATION_PROXY_QUEUE_PRODUCT_DELETED']);

      await bindQueueToExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_GALLERY_CREATED'], process.env['RABBIT_OPERATION_PROXY_QUEUE_GALLERY_CREATED']);
    });
  });

  const httpServer = http.createServer(appServer.callback());

  initRouter(routes);

  httpServer.listen(process.env['PORT'], () => console.log('Server started on port', process.env['PORT']));
})();
