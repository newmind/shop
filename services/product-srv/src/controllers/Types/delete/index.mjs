
import {sendEvent} from "@sys.packages/rabbit2";
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Type, TypeCategory, ProductType } = models;
  const { id } = ctx['request']['body'];

  const transaction = await sequelize.transaction();

  await Type.destroy({ where: { id }});
  await TypeCategory.destroy({ where: { typeId: id }});
  await ProductType.destroy({ where: { typeId: id }});

  await transaction.commit();

  await sendEvent(process.env['EXCHANGE_TYPE_DELETE'], JSON.stringify(id));

  ctx.body = {
    success: true,
    data: id,
  };
};
