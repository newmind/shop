
import { consumer } from '@sys.packages/rabbit2';

import { createCurrency, updateCurrency, deleteCurrency } from '../../actions/currency';


export default async function() {

  await consumer(process.env['QUEUE_CURRENCY_CREATE'], async (message, cb) => {
    const data = JSON.parse(message);
    await createCurrency(data);
    cb(true);
  });

  await consumer(process.env['QUEUE_CURRENCY_UPDATE'], async (message, cb) => {
    const data = JSON.parse(message);
    await updateCurrency(data);
    cb(true);
  });

  await consumer(process.env['QUEUE_CURRENCY_DELETE'], async (message, cb) => {
    const data = JSON.parse(message);
    await deleteCurrency(data);
    cb(true);
  });
}
