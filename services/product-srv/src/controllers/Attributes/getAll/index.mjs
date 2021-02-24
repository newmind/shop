
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Attribute, Unit } = models;

  const result = await Attribute.findAll({
    attributes: ['id', 'value', 'type', 'description'],
    order: [['value', 'asc']],
    include: [
      {
        model: Unit,
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
