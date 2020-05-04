
import connectToDatabase from '@sys.packages/db';
import appServer, { initRouter } from '@sys.packages/server';
import { connectToRabbit, queueToExchange, createExchange } from "@sys.packages/rabbit";

import http from 'http';

import { createImage, deleteImage } from './controllers/Gallery';
import { createCurrency, updateCurrency, deleteCurrencies } from './controllers/Currency';
import { createProduct, updateProductById, deleteProductById } from './controllers/Products';

import routes from './routes';


(async () => {
  try {
    await connectToDatabase(process.env['DB_CONNECTION_HOST']);
    await connectToRabbit(process.env['RABBIT_CONNECTION_HOST']);

    // EXCHANGES

    await createExchange(process.env['RABBIT_OPERATION_PROXY_EXCHANGE_ORDER_CREATED']);
    await createExchange(process.env['RABBIT_OPERATION_PROXY_EXCHANGE_ORDER_UPDATED']);

    // CONSUMER

    await queueToExchange(process.env['RABBIT_OPERATION_PROXY_QUEUE_GALLERY_DELETE'], process.env['RABBIT_GALLERY_PROXY_EXCHANGE_GALLERY_DELETED'], (event) => deleteImage(JSON.parse(event)));

    await queueToExchange(process.env['RABBIT_OPERATION_PROXY_QUEUE_GALLERY_CREATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_GALLERY_CREATED'],(event) => createImage(JSON.parse(event))    );

    await queueToExchange(process.env['RABBIT_OPERATION_PROXY_QUEUE_PRODUCT_CREATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_CREATED'],(event) => createProduct(JSON.parse(event))    );
    await queueToExchange(process.env['RABBIT_OPERATION_PROXY_QUEUE_PRODUCT_UPDATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_UPDATED'],(event) => updateProductById(JSON.parse(event))    );
    await queueToExchange(process.env['RABBIT_OPERATION_PROXY_QUEUE_PRODUCT_DELETED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_DELETED'],(event) => deleteProductById(JSON.parse(event))    );

    await queueToExchange(process.env['RABBIT_OPERATION_PROXY_QUEUE_CURRENCY_CREATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CURRENCY_CREATED'],(event) => createCurrency(JSON.parse(event))    );
    await queueToExchange(process.env['RABBIT_OPERATION_PROXY_QUEUE_CURRENCY_UPDATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CURRENCY_UPDATED'],(event) => updateCurrency(JSON.parse(event))    );
    await queueToExchange(process.env['RABBIT_OPERATION_PROXY_QUEUE_CURRENCY_DELETED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CURRENCY_DELETED'],(event) => deleteCurrencies(JSON.parse(event))    );


    const httpServer = http.createServer(appServer.callback());

    initRouter(routes);

    httpServer.listen(process.env['PORT'], () => console.log('Server started on port', process.env['PORT']));
  }
  catch(error) {
    console.log(error);
    process.exit(-1);
  }
})();
