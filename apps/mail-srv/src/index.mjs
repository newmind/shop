
import appServer, { initRouter } from '@sys.packages/server';

import http from 'http';

import routes from './routes';


(async () => {

  const httpServer = http.createServer(appServer.callback());

  initRouter(routes);

  httpServer.listen(process.env['PORT'], () => console.log('Server started on port', process.env['PORT']));
})();
