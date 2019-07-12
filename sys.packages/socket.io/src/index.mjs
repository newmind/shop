'use strict';

import SocketIO from 'socket.io';

let io = null;

export default async (server, options = {}) => {
  try {
    io = new SocketIO(server, {
      path: options['path'] || '/admin.socket.io',
      transports: ['websocket'],
    });
    io.on('connection', client => {
      client.on('disconnect', () => { console.log('Socket disconnect') });
      console.log('SocketIO connected');
    });

    console.log('SocketIO created');

    return io;

  } catch(error) {
    console.log('SocketIO error:', error)
  }
}

export const emit = (type, payload) => {
  io.sockets.emit('action', {
    type: `@@socket/${type}`,
    payload,
  });
};

export const on = (type, cb) => {
  io.on(type, cb);
};
