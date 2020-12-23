
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Form } = models;

  const result = await Form.findAll({
    attributes: ['id', 'value', 'description'],
    order: [['createdAt', 'desc']],
  });

  ctx.body = {
    success: true,
    data: [ ...result ],
  };
};
