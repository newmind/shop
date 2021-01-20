
import { connectToRabbit, createExchange } from "@sys.packages/rabbit";


export default async function() {
  await connectToRabbit(process.env['RABBIT_CONNECTION_HOST']);

  await createExchange(process.env['RABBIT_GALLERY_SRV_EXCHANGE_GALLERY_DELETED']);

}
