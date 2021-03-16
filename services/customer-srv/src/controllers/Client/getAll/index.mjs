
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const where = {};

  const { Client, Address, Meta } = models;
  const { id, isSystem } = ctx['request']['query'];

  if (id) {
    where['id'] = id;
  }

  if (isSystem) {
    where['isSystem'] = isSystem;
  }

  const result = await Client.findAndCountAll({
    where: { ...where, },
    distinct: true,
    order: [['id', 'desc']],
    attributes: ['id', 'name', 'patronymic', 'surname', 'gender', 'age', 'birthday'],
    include: [
      {
        model: Address,
        required: false,
        as: 'address',
        attributes: ['postalCode', 'country', 'province', 'locality', 'street', 'house', 'entrance', 'floor', 'flat']
      },
      {
        model: Meta,
        required: false,
        as: 'meta',
        attributes: ['email', 'phone']
      },
    ]
  });

  ctx.body = {
    success: true,
    data: result['rows'],
    meta: {
      total: result['count'],
    },
  };
};
