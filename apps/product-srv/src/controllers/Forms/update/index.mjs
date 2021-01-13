
import {sendEvent} from "@sys.packages/rabbit";
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Form } = models;
  const { id } = ctx['params'];
  const data = ctx['request']['body'];

  const transaction = await sequelize.transaction();

  await Form.update(data, {
    where: { id },
    transaction
  });

  const result = await Form.findOne({
    where: { id },
    transaction
  });

  await sendEvent(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_FORM_UPDATED'], JSON.stringify(result.toJSON()));

  await transaction.commit();

  ctx.body = {
    success: true,
    data: result.toJSON(),
  };
};