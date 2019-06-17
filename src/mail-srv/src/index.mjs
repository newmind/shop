'use strict';

import http from 'http';

import appServer, { initRouter } from '@packages/server';

import routes from './routes/index';


(async () => {

  const httpServer = http.createServer(appServer.callback());

  initRouter(routes);

  httpServer.listen(process.env['PORT'], () => console.log('Server started on port', process.env['PORT']));
})();
