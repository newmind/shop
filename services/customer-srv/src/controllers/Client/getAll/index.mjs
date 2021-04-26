
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const where = {};
  let offset = {};
  let options = {};

  const { Client, Meta } = models;
  const {
    id = null,
    isSystem = null,
    limit = null,
    skip = null,
    take = null,
  } = ctx['request']['query'];

  if (id) {
    where['id'] = id;
  }

  if (isSystem) {
    where['isSystem'] = isSystem;
  }

  if (limit) {
    options['limit'] = Number(limit);
  }

  if (skip && take) {
    offset['offset'] = Number(skip);
    offset['limit'] = Number(take);
  }

  const result = await Client.findAndCountAll({
    where: { ...where, },
    ...options,
    ...offset,
    distinct: true,
    order: [['id', 'desc']],
    attributes: ['id', 'name', 'patronymic', 'surname', 'gender', 'age', 'birthday'],
    include: [
      {
        model: Meta,
        required: false,
        as: 'meta',
        attributes: ['email', 'phone', 'address']
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
