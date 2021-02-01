
import {sendEvent} from "@sys.packages/rabbit2";
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Type, TypeCategory, Category } = models;
  const data = ctx['request']['body'];

  const { id } = await Type.create(data);

  await TypeCategory.bulkCreate(data['categories'].map((category) => ({ typeId: id, categoryId: category })));

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

  await sendEvent(process.env['EXCHANGE_TYPE_CREATE'], JSON.stringify(type));

  ctx.body = {
    success: true,
    data: type,
  };
};
