
import connectToDatabase from '@sys.packages/db';
import appServer, { initRouter } from '@sys.packages/server';
import { connectToRabbit, createExchange, queueToExchange } from "@sys.packages/rabbit";

import { deleteImages } from "./controllers/Gallery";

import http from 'http';

import routes from './routes';


(async () => {

  await connectToDatabase(process.env['DB_CONNECTION_HOST']);
  await connectToRabbit(process.env['RABBIT_CONNECTION_HOST']);

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

  // CONSUMER

  await queueToExchange(process.env['RABBIT_PRODUCT_PROXY_QUEUE_GALLERY_DELETE'], process.env['RABBIT_GALLERY_PROXY_EXCHANGE_GALLERY_DELETED'], (event) => { deleteImages(JSON.parse(event)); });


  const httpServer = http.createServer(appServer.callback());

  initRouter(routes);

  httpServer.listen(process.env['PORT'], () => console.log('Server started on port', process.env['PORT']));
})();
