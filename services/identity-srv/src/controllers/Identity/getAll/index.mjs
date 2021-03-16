
import { models } from '@sys.packages/db';

import userBuilder from "./userBuilder.mjs";


export default () => async (ctx) => {
  const where = {};
  const { id } = ctx['request']['query'];

  if (id) {
    where['id'] = id;
  }

  const { User, Role, UserCustomer } = models;

  const result = await User.findAll({
    where: { ...where },
    attributes: ['id', 'login', 'createdAt', 'updatedAt'],
    include: [
      {
        model: UserCustomer,
        as: 'customer',
        attributes: ['customerId'],
      },
      {
        model: Role,
        as: 'role',
        attributes: ['code', 'name'],
        through: { attributes: [] },
      }
    ],
  });

  ctx.body = {
    success: true,
    data: result.map((item) => userBuilder(item.toJSON())),
  };
};
