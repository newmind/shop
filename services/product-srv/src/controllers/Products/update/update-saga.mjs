
import { models } from "@sys.packages/db";
import { NetworkError } from "@packages/errors";
import { sendEvent } from '@sys.packages/rabbit2';
import { getFiles } from '@sys.packages/sys.utils';

import Sagas from 'node-sagas';

import getProduct from './getProduct';
import saveImages from './saveImages';
import deleteImages from './deleteImages';
import updateProperties from './updateProperties';


export default class UpdateSaga {
  ctx = null;

  constructor(ctx) {
    this.ctx = ctx;
  }

  async execute(params) {
    const saga = await this.getUpdateProductSagaDefinition(this.ctx);
    try {
      return await saga.execute(params);
    }
    catch (e) {
      if (e instanceof Sagas.SagaExecutionFailed) {
        throw new NetworkError({ code: '2.0.0', message: e['message'] });
      }
      if (e instanceof Sagas.SagaCompensationFailed) {
        throw new NetworkError({ code: '2.0.1', message: e['message'] });
      }
    }
  }

  async getUpdateProductSagaDefinition(ctx) {
    const sagaBuilder = new Sagas.SagaBuilder();

    const { uuid } = ctx['params'];
    const { files, fields } = await getFiles(ctx['req']);
    const { Gallery } = models;

    return sagaBuilder
      .step('Сохранение изображений')
      .invoke(async (params) => {
        if ( !! Object.keys(files).length) {
          const imagesID = await saveImages(files);
          params.setImageIDs(imagesID);
          await Gallery.bulkCreate(imagesID.map((item) => ({
            productUuid: uuid,
            uuid: item,
          })));
        }
      })
      .withCompensation(async (params) => {
        const ids = params.getImageIDs();
        if (ids) {
          await deleteImages(ids);
          await Gallery.destroy({ where: { uuid: ids }});
        }
      })

      .step('Update product properties')
      .invoke(async () => {
        await updateProperties(uuid, fields);
      })

      .step('Get product')
      .invoke(async (params) => {
        const product = await getProduct(uuid);
        params.setProduct(product)
      })

      .step('Send event')
      .invoke(async (params) => {
        const product = params.getProduct();
        await sendEvent(process.env['RABBIT_PRODUCT_SRV_EXCHANGE_PRODUCT_UPDATED'], JSON.stringify(product));
      })

      .build();
  }
}
