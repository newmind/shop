
import { middlewareErrors } from '@packages/errors';

import logger from '@sys.packages/logger';
import appServer, { initRouter } from '@sys.packages/server';
import { connectToRabbit, queueToExchange } from '@sys.packages/rabbit';

import path from 'path';
import http from 'http';
import nunjucks from 'nunjucks';

import routes from './routes';
import { orderCreated } from './actions/order';


(async () => {
  try {
    await connectToRabbit(process.env['RABBIT_CONNECTION_HOST']);

    await queueToExchange(process.env['RABBIT_OPERATION_SRV_QUEUE_ORDER_CREATED'], process.env['RABBIT_OPERATION_SRV_EXCHANGE_ORDER_CREATED'], orderCreated());

    nunjucks.configure(path.resolve(process.cwd(), 'src/templates'), {
      autoescape: true,
      watch: true,
    });

    appServer.use(middlewareErrors());

    const httpServer = http.createServer(appServer.callback());

    initRouter(routes);

    httpServer.listen(process.env['PORT'], () => {
      logger['info']('Server started on port: ' + process.env['PORT'])
    });
  }
  catch(error) {

    logger['error'](error);
  }
})();
