
import { UUID } from '@sys.packages/sys.utils';
import { sequelize, models } from '@sys.packages/db';
import { sendEvent } from "@sys.packages/rabbit";


export default () => async (ctx) => {
  try {

    const fields = ctx.request.body;

    const externalId = await sequelize.transaction(async (transaction) => {

      const externalId = UUID();

      const { id } = await models['Operation'].create({ externalId, ...fields }, { transaction });

      const items = fields['items'].map((item) => ({ operationId: id, ...item }));

      await models['OperationStock'].bulkCreate(items, { transaction });

      return externalId;
    });

    sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_OPERATION_CREATED'], JSON.stringify(externalId));

    ctx.body = {
      success: true,
      data: {
        externalId,
      }
    };
  }
  catch (error) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: error.original.code,
        message: error.original.detail,
      }
    };
  }
};
