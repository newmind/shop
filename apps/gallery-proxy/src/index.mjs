
import databaseORM from '@sys.packages/db';
import appServer, { initRouter } from '@sys.packages/server';
import { channel as createChannel, connect as createConnection, createExchange } from "@sys.packages/rabbit";

import http from 'http';

import routes from './routes';


(async () => {

  databaseORM(`postgres://${process.env['DATA_BASE_USERNAME']}:${process.env['DATA_BASE_PASSWORD']}@${process.env['DATA_BASE_HOST']}:${process.env['DATA_BASE_PORT']}/${process.env['DATA_BASE_NAME']}`);

  createConnection(process.env['RABBIT_CONNECTION_HOST'], (error, connection) => {
    createChannel(connection, async () => {

      await createExchange(process.env['RABBIT_GALLERY_PROXY_EXCHANGE_GALLERY_DELETED']);
    });
  });

  const httpServer = http.createServer(appServer.callback());

  initRouter(routes);

  httpServer.listen(process.env['PORT'], () => console.log('Server started on port', process.env['PORT']));
})();
