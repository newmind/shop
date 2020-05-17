'use strict';

import SocketIO from 'socket.io-client';


let socket = null;
let room = null;

export default (host, options) => {
  socket = SocketIO(host, {
    forceNew: true,
    path: options['path'] || '/admin.socket.io',
    transports: ['websocket'],
    reconnection: true,
  });

  socket.on('connect', () => {
    if (room) {
      joinToRoom(room);
    }
    process.env['NODE_ENV'] === 'development' && console.log('Connected')
  });
  socket.on('disconnect', () => process.env['NODE_ENV'] === 'development' && console.log('Disconnected'));

  return socket;
}

export const connect = () => {

  socket.open();
};

export const disconnect = () => {

  socket.close();
};

export const joinToRoom = (roomName) => {

  socket.emit('join', roomName);
  room = roomName;
};

export const instance = () => {
  return socket;
};

export const on = (eventName, cb) => {
  if (socket) {
    socket.on('action', (event) => {
      if (event['type'] === eventName) {
        cb(event['payload']);
      }
    });
  } else {
    setTimeout(() => on(eventName, cb), 1000);
  }
};