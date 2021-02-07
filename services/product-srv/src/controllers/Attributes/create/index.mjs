
import { models } from '@sys.packages/db';
import { sendEvent } from "@sys.packages/rabbit2";


export default () => async (ctx) => {
  const { Attribute, Units } = models;
  const formData = ctx['request']['body'];

  await Attribute.create({
    value: formData['value'],
    type: formData['type'],
    description: formData['description'],
    unitId: formData['unit'] ? formData['unit']['id'] : null,
  });

  const result = await Attribute.findOne({
    attributes: ['id', 'value', 'type', 'description'],
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

  await sendEvent(process.env['EXCHANGE_ATTRIBUTE_CREATE'], JSON.stringify(attr));

  ctx.body = {
    success: true,
    data: attr,
  };
};
