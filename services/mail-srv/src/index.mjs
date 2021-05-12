
import logger from '@sys.packages/logger';
import { Server } from '@sys.packages/server';
import { connection as connectToRabbit } from '@sys.packages/rabbit';

import path from 'path';
import nunjucks from 'nunjucks';

import routes from './routes';
import rabbit from './rabbit';


(async () => {
  try {
    await connectToRabbit(process.env['RABBIT_CONNECTION_HOST']);
    await rabbit();

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
