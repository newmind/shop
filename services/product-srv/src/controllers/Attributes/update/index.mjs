
import { sendEvent } from '@sys.packages/rabbit2';
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { id } = ctx['params'];
  const formData = ctx['request']['body'];

  const { Attribute, Units } = models;

  await Attribute.update({
    value: formData['value'],
    description: formData['description'],
    unitId: formData['unit'] ? formData['unit']['id'] : null,
  }, {
    where: { id },
  });

  const result = await Attribute.findOne({
    attributes: ['id', 'value', 'description'],
    order: [['id', 'desc']],
    include: [
      {
        model: Units,
        attributes: ['id', 'value'],
        as: 'unit',
      }
    ],
  });

  const attr = result.toJSON();

  await sendEvent(process.env['EXCHANGE_ATTRIBUTE_UPDATE'], JSON.stringify(attr));

  ctx.body = {
    success: true,
    data: attr,
  };
};
