
import logger from '@sys.packages/logger';
import connectToDatabase from '@sys.packages/db';
import { middlewareErrors } from "@packages/errors";
import appServer, { initRouter } from '@sys.packages/server';
// import { connectToRabbit, queueToExchange, createExchange } from "@sys.packages/rabbit";

import http from 'http';

// import { createImage, deleteImage } from './actions/Gallery/index.mjs';
// import { createCurrency, updateCurrency, deleteCurrencies } from './actions/Currency/index.mjs';
// import { createProduct, updateProductById, deleteProductById } from './actions/Products/index.mjs';

import routes from './routes';


(async () => {
  try {
    await connectToDatabase(process.env['DB_CONNECTION_HOST']);
    // await connectToRabbit(process.env['RABBIT_CONNECTION_HOST']);
    //
    // // EXCHANGES
    //
    // await createExchange(process.env['RABBIT_OPERATION_SRV_EXCHANGE_ORDER_CREATED']);
    // await createExchange(process.env['RABBIT_OPERATION_SRV_EXCHANGE_ORDER_UPDATED']);
    //
    // // CONSUMER
    //
    // await queueToExchange(process.env['RABBIT_OPERATION_SRV_QUEUE_GALLERY_DELETE'], process.env['RABBIT_GALLERY_SRV_EXCHANGE_GALLERY_DELETED'], deleteImage);
    //
    // await queueToExchange(process.env['RABBIT_OPERATION_SRV_QUEUE_GALLERY_CREATED'], process.env['RABBIT_PRODUCT_SRV_EXCHANGE_GALLERY_CREATED'], createImage);
    //
    // await queueToExchange(process.env['RABBIT_OPERATION_SRV_QUEUE_PRODUCT_CREATED'], process.env['RABBIT_PRODUCT_SRV_EXCHANGE_PRODUCT_CREATED'], createProduct);
    // await queueToExchange(process.env['RABBIT_OPERATION_SRV_QUEUE_PRODUCT_UPDATED'], process.env['RABBIT_PRODUCT_SRV_EXCHANGE_PRODUCT_UPDATED'], updateProductById);
    // await queueToExchange(process.env['RABBIT_OPERATION_SRV_QUEUE_PRODUCT_DELETED'], process.env['RABBIT_PRODUCT_SRV_EXCHANGE_PRODUCT_DELETED'], deleteProductById);
    //
    // await queueToExchange(process.env['RABBIT_OPERATION_SRV_QUEUE_CURRENCY_CREATED'], process.env['RABBIT_PRODUCT_SRV_EXCHANGE_CURRENCY_CREATED'], createCurrency);
    // await queueToExchange(process.env['RABBIT_OPERATION_SRV_QUEUE_CURRENCY_UPDATED'], process.env['RABBIT_PRODUCT_SRV_EXCHANGE_CURRENCY_UPDATED'], updateCurrency);
    // await queueToExchange(process.env['RABBIT_OPERATION_SRV_QUEUE_CURRENCY_DELETED'], process.env['RABBIT_PRODUCT_SRV_EXCHANGE_CURRENCY_DELETED'], deleteCurrencies);

    appServer.use(middlewareErrors());

    const httpServer = http.createServer(appServer.callback());

    initRouter(routes);

    httpServer.listen(process.env['PORT'], () => logger['info']('Server started on port: ' + process.env['PORT']));
  }
  catch(error) {
    logger['error'](error);
  }
})();
