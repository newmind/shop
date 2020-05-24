
import { sendEvent } from "@sys.packages/rabbit";
import { getFiles } from "@sys.packages/sys.utils";
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {
  try {
    const { Category } = models;
    const { files = [], fields = {}} = await getFiles(ctx['req']);

    console.log(fields, files)

    // const transaction = await sequelize.transaction();
    //
    // const result = await Category.create(formData, { transaction });
    //
    // await sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CATEGORY_CREATED'], JSON.stringify(result.toJSON()));
    //
    // await transaction.commit();

    ctx.body = {
      success: true,
      data: '', //result.toJSON(),
    };
  }
  catch(error) {

    console.log(error);

    ctx.status = 500;
    ctx.body = { success: false, error: { code: '500', message: error['message'] }};
  }
};
