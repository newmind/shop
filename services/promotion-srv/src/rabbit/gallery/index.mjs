
import { consumer } from '@sys.packages/rabbit2';

import { deleteImages } from '../../controllers/Gallery';


export default async function() {

  await consumer(process.env['EVENT_IMAGE_DELETE'], async (message, cb) => {
    const uuid = JSON.parse(message);
    await deleteImages(uuid);
    cb(true);
  });
}
