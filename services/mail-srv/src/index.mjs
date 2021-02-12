
import logger from '@sys.packages/logger';
import { Server } from '@sys.packages/server';
import { connectToRabbit, queueToExchange } from '@sys.packages/rabbit';

import path from 'path';
import nunjucks from 'nunjucks';

import routes from './routes/index.mjs';
import { orderCreated } from './actions/order/index.mjs';


(async () => {
  try {
    await connectToRabbit(process.env['RABBIT_CONNECTION_HOST']);

    await queueToExchange(process.env['RABBIT_OPERATION_SRV_QUEUE_ORDER_CREATED'], process.env['RABBIT_OPERATION_SRV_EXCHANGE_ORDER_CREATED'], orderCreated());

    nunjucks.configure(path.resolve(process.cwd(), 'src/templates'), {
      autoescape: true,
      watch: true,
    });

    const server = new Server({
      server: {
        port: process.env['PORT'],
      },
      routes: [
        routes,
      ],
    });

    await server.start();
  }
  catch(error) {

    logger['error'](error);
  }
})();
