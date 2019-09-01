'use strict';

import SocketIO from 'socket.io';


let io = null;

export default async (server, options = {}) => {
  try {
    io = new SocketIO(server, {
      path: options['path'] || '/admin.socket.io',
      transports: ['websocket'],
    });

    io.use((socket, next) => {
      return next();
    });

    io.on('connection', client => {

      client.on('join', (room) => {
        client.join(room);
      });

      client.on('disconnect', () => { console.log('Socket disconnect') });
      console.log('SocketIO connected');
    });

    console.log('SocketIO created');

    return io;

  } catch(error) {
    console.log('SocketIO error:', error)
  }
}

export const emitToRoom = (room, type, payload) => {

  io.in(room).emit('action', {
    type: `@@socket/${type}`,
    payload,
  });
};

export const emit = (type, payload) => {

  console.log(333, type);

  io.sockets.emit('action', {
    type: `@@socket/${type}`,
    payload,
  });
};

export const on = (type, cb) => {
  io.on(type, cb);
};
