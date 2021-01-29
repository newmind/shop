
import { io } from 'socket.io-client';


let socket = null;
let room = null;


export default (host, options) => {
  socket = io(host, {
    forceNew: true,
    path: options['path'] || '/socket.io',
    transports: ['websocket'],
    reconnection: true,
  });

  socket.on('connect', () => {
    if (room) {
      joinToRoom(room);
    }
    process.env['NODE_ENV'] === 'development' && console.debug(`Socket has been connected to ${host}${options['path']}`);
  });
  socket.on('disconnect', (reason) => process.env['NODE_ENV'] === 'development' && console.debug('Disconnected: ' + reason));

  return socket;
}

export const connect = () => {
  if ( ! socket) {
    return void 0;
  }
  socket.open();
};

export const disconnect = () => {
  if ( ! socket) {
    return void 0;
  }
  socket.close();
};

export const joinToRoom = (roomName) => {

  socket.emit('join', String(roomName));
  room = roomName;
};

export const leaveFromRoom = (roomName) => {

  socket.emit('leave', String(roomName));
  room = null;
};

export const on = (eventName, cb) => {
  if (socket) {
    socket.on(eventName, (event) => {
      cb(event);
    });
  }
  else {
    setTimeout(() => on(eventName, cb), 1000);
  }
};

export const off = (eventName) => {
  if (socket) {
    socket.off(eventName);
  }
  else {
    setTimeout(() => off(eventName), 1000);
  }
};

export const middleware = (socket) => {
  return ({ dispatch }) => {
    socket.on('action', dispatch);
    return (next) => (action) => {
      return next(action);
    };
  };
};
