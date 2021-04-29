
import logger from '@sys.packages/logger';
import { consumer } from '@sys.packages/rabbit2';

import { orderCreated } from '../../actions/order';


export default async function() {

  await consumer(process.env['QUEUE_ORDER_CREATED'],async(message, cb) => {
    try {
      await orderCreated(JSON.parse(message));
      cb(true);
    }
    catch(error) {
      logger['error'](error['message']);
      cb(false);
    }
  });
}