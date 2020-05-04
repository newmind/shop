
import connectToDatabase from '@sys.packages/db';
import appServer, { initRouter } from '@sys.packages/server';
import { connectToRabbit, createExchange } from "@sys.packages/rabbit";

import http from 'http';

import routes from './routes';


(async () => {

  await connectToDatabase(process.env['DB_CONNECTION_HOST']);
  await connectToRabbit(process.env['RABBIT_CONNECTION_HOST']);

  await createExchange(process.env['RABBIT_GALLERY_PROXY_EXCHANGE_GALLERY_DELETED']);


  const httpServer = http.createServer(appServer.callback());

  initRouter(routes);

  httpServer.listen(process.env['PORT'], () => console.log('Server started on port', process.env['PORT']));
})();
