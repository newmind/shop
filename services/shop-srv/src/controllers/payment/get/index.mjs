
import { models } from '@sys.packages/db';

import paymentBuilder from './builder/paymentBuilder.mjs';


export default () => async (ctx) => {
  const { Payment } = models;

  const shops = await Payment.findAll();

  ctx.body = {
    success: true,
    data: shops.map((item) => paymentBuilder(item.toJSON())),
  };
};
