
import { middlewareErrors } from '@packages/errors';

import koaCORS from '@sys.packages/cors';
import logger from '@sys.packages/logger';
import createSocket from '@sys.packages/socket.io';
import { checkCookie, getCookie } from "@sys.packages/jwt";
import appServer, { initRouter } from '@sys.packages/server';

import http from 'http';
import cookie from 'koa-cookie';

import routes from './routes';

import rabbit from './rabbit';


(async () => {
  try {
    appServer.use(middlewareErrors);

    appServer.use(koaCORS({
      credentials: true,
      allowedOrigins: process.env['HTTP_ORIGINS'].split(','),
      allowMethods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    }));

    appServer.use(cookie.default());

    const httpServer = http.createServer(appServer.callback());
    const io = await createSocket(httpServer, { path: '/client.socket.io' });

    await rabbit(io);

    appServer.use(async (ctx, next) => {
      ctx.io = io.sockets;
      await next();
    });

    appServer.use(async (ctx, next) => {
      const cookie = await getCookie(ctx, process.env['COOKIE_NAME'], { silent: true });

      if (cookie) {
        const { data } = await checkCookie(cookie, {
          serviceUrl: process.env['IDENTITY_API_SRV'],
        });

        if ( ! data) {
          ctx.user = null;
        }
        else {
          ctx.user = data['data'];
        }
      }
      else {
        ctx.user = null;
      }

      await next();
    });

    initRouter(routes);

    httpServer.listen(process.env['PORT'], () => {
      logger['info']('Server started on port: ' + process.env['PORT']);
    });
  }
  catch(error) {
    logger['error'](error);
  }
})();
