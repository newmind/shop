
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Attribute, Units } = models;

  const result = await Attribute.findAll({
    attributes: ['id', 'value', 'description', 'type'],
    order: [['id', 'desc']],
    include: [
      {
        model: Units,
        attributes: ['id', 'value'],
        as: 'unit',
      }
    ],
  });

  ctx.body = {
    success: true,
    data: result.map(item => item.toJSON()),
  };
};
