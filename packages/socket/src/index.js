'use strict';

import SocketIO from 'socket.io-client';


let socket = null;

export default (host) => {
  socket = SocketIO(host, {
    forceNew: true,
    path: '/admin.socket.io',
    transports: ['websocket'],
    reconnection: true,
  });

  socket.on('connect', () => console.log('Connected'));

  socket.on('disconnect', () => console.log('Disconnected'));

  return socket;
}

export const reconnect = () => {

  socket.disconnect();
};

export const instance = () => {
  return socket;
};
