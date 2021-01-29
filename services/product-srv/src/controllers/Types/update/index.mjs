
import {sendEvent} from "@sys.packages/rabbit2";
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Type, TypeCategory, Category } = models;
  const { id } = ctx['params'];
  const data = ctx['request']['body'];

  const transaction = await sequelize.transaction();

  await Type.update(data, { where: { id }, transaction });

  await TypeCategory.destroy({ where: { typeId: data['id'] }, transaction });
  await TypeCategory.bulkCreate(data['categories'].map((category) => ({ typeId: data['id'], categoryId: category })), { transaction });

  await transaction.commit();

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
  });

  const type = result.toJSON();

  await sendEvent(process.env['EXCHANGE_TYPE_UPDATE'], JSON.stringify(type));

  ctx.body = {
    success: true,
    data: type,
  };
};
