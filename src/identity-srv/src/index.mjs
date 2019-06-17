'use strict';

import http from 'http';
import createSocket from '@packages/socket.io';

import appServer, { initRouter } from './bin/createServer';
import databaseORM from './bin/createORM';

import routes from './routes/index';


(async () => {

  const httpServer = http.createServer(appServer.callback());
  const io = await createSocket(httpServer);

  appServer.use(async (ctx, next) => {
    ctx.io = io.sockets;
    await next();
  });

  initRouter(routes);

  databaseORM();

  httpServer.listen(process.env['PORT'], () => console.log('Server started on port', process.env['PORT']));
})();
