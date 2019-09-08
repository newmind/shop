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
    console.log('Connected')
  });
  socket.on('disconnect', () => console.log('Disconnected'));

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

export const reconnect = () => {

  socket.disconnect();
};

export const instance = () => {
  return socket;
};
