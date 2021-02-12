
import database from '@sys.packages/db';
import logger from '@sys.packages/logger';
import { Server } from '@sys.packages/server';

import routes from './routes';


(async () => {
  try {
    await database(process.env['DB_CONNECTION_HOST']);

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
