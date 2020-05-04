
import logger from '@sys.packages/logger';
import appServer, { initRouter } from '@sys.packages/server';

import http from 'http';

import routes from './routes';


(async () => {
  try {
    const httpServer = http.createServer(appServer.callback());

    initRouter(routes);

    httpServer.listen(process.env['PORT'], () => logger['info']('Server started on port: ' + process.env['PORT']));
  }
  catch(error) {
    logger['error'](error);
  }
})();
