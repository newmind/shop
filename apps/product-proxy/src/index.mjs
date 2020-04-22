
import databaseORM from '@sys.packages/db';
import { deleteImages } from "./controllers/Gallery";
import appServer, { initRouter } from '@sys.packages/server';
import {
  connect as createConnection,
  channel as createChannel,
  createExchange,
  createConsumer, bindQueueToExchange
} from "@sys.packages/rabbit";

import http from 'http';

import routes from './routes';


(async () => {

  databaseORM(`postgres://${process.env['DATA_BASE_USERNAME']}:${process.env['DATA_BASE_PASSWORD']}@${process.env['DATA_BASE_HOST']}:${process.env['DATA_BASE_PORT']}/${process.env['DATA_BASE_NAME']}`);

  createConnection(process.env['RABBIT_CONNECTION_HOST'], (error, connection) => {
    createChannel(connection, async () => {

      // EXCHANGES

      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CATEGORY_UPDATED']);
      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CATEGORY_CREATED']);
      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CATEGORY_DELETED']);

      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_COLOR_UPDATED']);
      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_COLOR_CREATED']);
      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_COLOR_DELETED']);

      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_COMMENT_UPDATED']);
      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_COMMENT_CREATED']);
      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_COMMENT_DELETED']);

      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CURRENCY_UPDATED']);
      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CURRENCY_CREATED']);
      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CURRENCY_DELETED']);

      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_FORM_UPDATED']);
      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_FORM_CREATED']);
      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_FORM_DELETED']);

      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_MATERIAL_UPDATED']);
      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_MATERIAL_CREATED']);
      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_MATERIAL_DELETED']);

      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_UPDATED']);
      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_CREATED']);
      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_DELETED']);

      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_TYPE_UPDATED']);
      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_TYPE_CREATED']);
      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_TYPE_DELETED']);

      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_UNIT_UPDATED']);
      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_UNIT_CREATED']);
      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_UNIT_DELETED']);

      await createExchange(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_GALLERY_CREATED']);

      await createExchange(process.env['RABBIT_GALLERY_PROXY_EXCHANGE_GALLERY_DELETED']);

      // CONSUMER

      await createConsumer(process.env['RABBIT_PRODUCT_PROXY_QUEUE_GALLERY_DELETE'], (event) => { deleteImages(JSON.parse(event)); })


      // BIND QUEUE TO EXCHANGE

      await bindQueueToExchange(process.env['RABBIT_GALLERY_PROXY_EXCHANGE_GALLERY_DELETED'], process.env['RABBIT_PRODUCT_PROXY_QUEUE_GALLERY_DELETE']);

    });
  });

  const httpServer = http.createServer(appServer.callback());

  initRouter(routes);

  httpServer.listen(process.env['PORT'], () => console.log('Server started on port', process.env['PORT']));
})();
