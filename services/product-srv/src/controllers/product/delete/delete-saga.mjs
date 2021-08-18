
import { NetworkError } from "@packages/errors";
import { sendEvent } from '@sys.packages/rabbit';

import Sagas from 'node-sagas';

import destroyGallery from './gallery/destroy';
// import restoreGallery from './gallery/restore';

import destroyAttribute from './attribute/destroy';
// import restoreAttributes from './attribute/restore';

import destroyOption from './option/destroy';
// import restoreOption from './option/restore';

import destroyBrand from './brand/destroy';
// import restoreBrand from './brand/restore';

import destroyTypes from './types/destroy';
// import restoreTypes from './types/restore';

import destroyCategory from './category/destroy';
// import restoreCategory from './category/restore';

import destroyProduct from './product/destroy';
// import restoreProduct from './product/restore';

import destroyPromotion from './promotion/destroy';
// import restorePromotion from './promotion/restore';

import destroyComment from './comments/destroy';
// import restorePromotion from './promotion/restore';

import destroyShops from './shops/destroy';
// import restorePromotion from './promotion/restore';


export default class DeleteSaga {
  ctx = null;

  constructor(ctx) {
    this.ctx = ctx;
  }

  async execute(params) {
    const saga = await this.getDeleteProductSagaDefinition(this.ctx);
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

  async getDeleteProductSagaDefinition(ctx) {
    const sagaBuilder = new Sagas.SagaBuilder();

    const { uuid } = ctx['request']['body'];

    return sagaBuilder
      .step('Destroy gallery')
      .invoke(async () => {
        await destroyGallery(uuid);
      })

      .step('Destroy shops')
      .invoke(async () => {
        await destroyShops(uuid);
      })

      .step('Destroy comments')
      .invoke(async () => {
        await destroyComment(uuid);
      })

      .step('Destroy attributes')
      .invoke(async () => {
        await destroyAttribute(uuid);
      })

      .step('Destroy brand')
      .invoke(async () => {
        await destroyBrand(uuid);
      })

      .step('Destroy category')
      .invoke(async () => {
        await destroyCategory(uuid);
      })

      .step('Destroy option')
      .invoke(async () => {
        await destroyOption(uuid);
      })

      .step('Destroy types')
      .invoke(async () => {
        await destroyTypes(uuid);
      })

      .step('Destroy promotions')
      .invoke(async () => {
        await destroyPromotion(uuid);
      })

      .step('Destroy product')
      .invoke(async () => {
        await destroyProduct(uuid);
      })

      .step('Send event')
      .invoke(async () => {
        await sendEvent(process.env['EXCHANGE_PRODUCT_DELETE'], JSON.stringify(uuid));
      })

      .build();
  }
}
