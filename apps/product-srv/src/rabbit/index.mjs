
import {connectToRabbit, createExchange, queueToExchange} from "@sys.packages/rabbit";

import {deleteImages} from "../controllers/Gallery";


export default async function() {
  await connectToRabbit(process.env['RABBIT_CONNECTION_HOST']);

  // EXCHANGES

  await createExchange(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_CATEGORY_UPDATED']);
  await createExchange(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_CATEGORY_CREATED']);
  await createExchange(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_CATEGORY_DELETED']);

  await createExchange(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_COLOR_UPDATED']);
  await createExchange(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_COLOR_CREATED']);
  await createExchange(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_COLOR_DELETED']);

  await createExchange(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_COMMENT_UPDATED']);
  await createExchange(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_COMMENT_CREATED']);
  await createExchange(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_COMMENT_DELETED']);

  await createExchange(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_CURRENCY_UPDATED']);
  await createExchange(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_CURRENCY_CREATED']);
  await createExchange(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_CURRENCY_DELETED']);

  await createExchange(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_FORM_UPDATED']);
  await createExchange(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_FORM_CREATED']);
  await createExchange(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_FORM_DELETED']);

  await createExchange(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_MATERIAL_UPDATED']);
  await createExchange(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_MATERIAL_CREATED']);
  await createExchange(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_MATERIAL_DELETED']);

  await createExchange(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_PRODUCT_UPDATED']);
  await createExchange(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_PRODUCT_CREATED']);
  await createExchange(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_PRODUCT_DELETED']);

  await createExchange(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_TYPE_UPDATED']);
  await createExchange(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_TYPE_CREATED']);
  await createExchange(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_TYPE_DELETED']);

  await createExchange(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_UNIT_UPDATED']);
  await createExchange(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_UNIT_CREATED']);
  await createExchange(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_UNIT_DELETED']);

  await createExchange(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_GALLERY_CREATED']);

  // CONSUMER

  await queueToExchange(process.env['RABBIT_PRODUCT_SRV_QUEUE_GALLERY_DELETE'], process.env['RABBIT_GALLERY_SRV_EXCHANGE_GALLERY_DELETED'], (event) => { deleteImages(JSON.parse(event)); });
}
