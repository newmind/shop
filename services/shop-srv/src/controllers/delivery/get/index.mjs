
import { models } from '@sys.packages/db';

import deliveryBuilder from './builder/deliveryBuilder.mjs';


export default () => async (ctx) => {
  const { Delivery } = models;

  const shops = await Delivery.findAll();

  ctx.body = {
    success: true,
    data: shops.map((item) => deliveryBuilder(item.toJSON())),
  };
};
