
import { consumer } from '@sys.packages/rabbit2';


export default async function() {

  await consumer(process.env['EVENT_IMAGE_DELETE'], async () => {});
}
