'use strict';

import http from 'http';

import databaseORM from '@sys.packages/db';
import appServer, { initRouter } from '@sys.packages/server';

import { connect as createConnection, channel as createChannel, createExchange } from "@sys.packages/rabbit";


import routes from './routes';


(async () => {

  databaseORM(`postgres://${process.env['DATA_BASE_USERNAME']}:${process.env['DATA_BASE_PASSWORD']}@${process.env['DATA_BASE_HOST']}:${process.env['DATA_BASE_PORT']}/${process.env['DATA_BASE_NAME']}`);

  createConnection(process.env['RABBIT_CONNECTION_HOST'], (error, connection) => {
    createChannel(connection, async () => {

      await createExchange(process.env['RABBIT_IDENTITY_SRV_EXCHANGE_PASSPORT_UPDATED']);
    });
  });


  const httpServer = http.createServer(appServer.callback());

  initRouter(routes);

  httpServer.listen(process.env['PORT'], () => console.log('Server started on port', process.env['PORT']));

})();
