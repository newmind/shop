
import logger from '@sys.packages/logger';
import { emit } from '@sys.packages/socket.io';


export default () => async (event) => {
  try {
    const fields = JSON.parse(event);

    emit(process.env['SOCKET_COMMENT_UPDATED'], {
      id: fields['id'],
      person: fields['person'],
      comment: fields['comment'],
      productId: fields['productId'],
      createdAt: fields['createdAt'],
      evaluation: fields['evaluation'],
    });
  }
  catch(error) {
    
    logger['error'](error);
  }
};