
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const where = {};

  const { Client, ClientAddress } = models;
  const { id } = ctx['request']['query'];

  if (id) {
    where['id'] = id;
  }

  const result = await Client.findAndCountAll({
    where: { ...where },
    distinct: true,
    order: [['id', 'desc']],
    attributes: ['id', 'name', 'patronymic', 'surname', 'gender', 'age', 'birthday'],
    include: [
      {
        model: ClientAddress,
        required: true,
        as: 'address',
        attributes: ['postcode', 'country', 'region', 'district', 'locality', 'street', 'home', 'float', 'flat']
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
