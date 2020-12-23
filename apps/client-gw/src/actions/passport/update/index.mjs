
import logger from '@sys.packages/logger';
import { emitToRoom } from "@sys.packages/socket.io";


export default async (event) => {
  try {
    const fields = JSON.parse(event);

    emitToRoom(fields['id'], process.env['SOCKET_PASSPORT_UPDATED'], fields);
  }
  catch(error) {
    logger['error'](error);
  }
};