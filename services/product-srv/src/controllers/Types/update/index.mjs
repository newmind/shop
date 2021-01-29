
import {sendEvent} from "@sys.packages/rabbit2";
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Type, TypeCategory, Category } = models;
  const { id } = ctx['params'];
  const data = ctx['request']['body'];

  const transaction = await sequelize.transaction();

  await Type.update(data, {
    where: { id },
    transaction
  });

  await TypeCategory.destroy({ where: { typeId: data['id'] }});
  await TypeCategory.bulkCreate(data['categories'].map((category) => ({ typeId: data['id'], categoryId: category })));

  const result = await Type.findOne({
    where: { id },
    include: [
      {
        model: Category,
        as: 'categories',
        attributes: ['id', 'value', 'description'],
        through: { attributes: [] },
      }
    ],
    transaction,
  });

  await transaction.commit();

  await sendEvent(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_TYPE_UPDATED'], JSON.stringify(result.toJSON()));

  ctx.body = {
    success: true,
    data: result.toJSON(),
  };
};
