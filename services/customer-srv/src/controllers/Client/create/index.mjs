
import { models, sequelize } from '@sys.packages/db';

export default () => async (ctx) => {
  const data = ctx['request']['body'];
  const { Client, Address } = models;

  const transaction = await sequelize.transaction();

  const { id } = await Client.create({
    name: data['name'],
    patronymic: data['patronymic'],
    surname: data['surname'],
    email: data['email'],
    phone: data['phone'].replace('+', ''),
  }, {
    transaction,
  });

  await Address.create({
    clientId: id,
    ...data['address'],
  }, {
    transaction,
  });

  await transaction.commit();

  const result = await Client.findOne({
    where: { id },
    distinct: true,
    order: [['id', 'desc']],
    attributes: ['id', 'name', 'patronymic', 'surname', 'gender', 'age', 'birthday'],
    include: [
      {
        model: Address,
        required: true,
        as: 'address',
        attributes: ['postalCode', 'country', 'province', 'locality', 'street', 'house', 'entrance', 'floor', 'flat']
      },
    ]
  });

  ctx.body = {
    success: true,
    data: result.toJSON(),
  };
};
