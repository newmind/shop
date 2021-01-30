
import { models } from "@sys.packages/db";
import { NetworkError } from '@packages/errors';
import { sendEvent } from '@sys.packages/rabbit2';
import { getFiles } from '@sys.packages/sys.utils';

import Sagas from 'node-sagas';

import getProduct from './getProduct';
import saveImages from './saveImages';
import deleteImages from './deleteImages';
import deleteProduct from './deleteProduct';
import createProperties from './createProperties';


export default class CreateSaga {
  ctx = null;

  constructor(ctx) {
    this.ctx = ctx;
  }

  async execute(params) {
    const saga = await this.getCreateProductSagaDefinition(this.ctx);
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

  async getCreateProductSagaDefinition(ctx) {
    const sagaBuilder = new Sagas.SagaBuilder();

    const { files, fields } = await getFiles(ctx['req']);
    const { Gallery } = models;

    return sagaBuilder
      .step('Create product properties')
      .invoke(async (params) => {
        const uuid = await createProperties(fields);
        params.setProductUUID(uuid);
      })
      .withCompensation(async (params) => {
        const uuid = params.getProductUUID();
        await deleteProduct(uuid);
      })

      .step('Сохранение изображений')
      .invoke(async (params) => {
        const uuid = params.getProductUUID();
        if (Object.keys(files).length) {
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

      .step('Get product')
      .invoke(async (params) => {
        const uuid = params.getProductUUID();
        const product = await getProduct(uuid);
        params.setProduct(product)
      })

      .step('Send event')
      .invoke(async (params) => {
        const product = params.getProduct();
        await sendEvent(process.env['EXCHANGE_PRODUCT_CREATE'], JSON.stringify(product));
      })

      .build();
  }
}
