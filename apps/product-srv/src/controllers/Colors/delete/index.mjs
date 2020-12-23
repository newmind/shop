
import {sendEvent} from "@sys.packages/rabbit";
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Color } = models;
  const { id } = ctx['request']['body'];

  const transaction = await sequelize.transaction();

  await Color.destroy({
    where: { id },
  }, {
    transaction,
  });

  await sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_COLOR_DELETED'], JSON.stringify(id));

  await transaction.commit();

  ctx.body = {
    success: true,
    data: id,
  };
};
