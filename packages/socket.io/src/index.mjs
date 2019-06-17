'use strict';

import SocketIO from 'socket.io';

let io = null;

export default async (server) => {
  try {
    io = new SocketIO(server, {
      path: '/admin-gw',
      transports: ['websocket'],
    });
    io.on('connection', client => {
      client.on('disconnect', () => { console.log('Socket disconnect') });
      console.log('Socket connected');
    });

    return io;

  } catch(error) {
    console.log(error)
  }
}

export const emit = (type, payload) => {
  io.sockets.emit('action', {
    type: `@@SOCKET/${type}`,
    payload,
  });
};

export const on = (type, cb) => {
  io.on(type, cb);
};
