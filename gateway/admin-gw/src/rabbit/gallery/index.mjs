
import { emit } from '@sys.packages/socket.io';
import { bindToExchange } from '@sys.packages/rabbit2';


export default async function() {
  const salt = Date.now();

  await bindToExchange(process.env['QUEUE_IMAGE_DELETE'] + '_' + salt, process.env['EXCHANGE_IMAGE_DELETE'], (data, cb) => {
    const result = JSON.parse(data);
    emit(process.env['SOCKET_IMAGE_DELETE'], result);
    cb(true);
  });

}
