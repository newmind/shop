
import logger from '@sys.packages/logger';
import { Server } from '@sys.packages/server';

import routes from './routes';

import rabbit from './rabbit';


(async () => {
  try {
    await rabbit();

    const server = new Server({
      server: {
        port: process.env['PORT'],
        origins: process.env['HTTP_ORIGINS'],
      },
      socket: {
        path: process.env['SOCKET_PATH'],
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
