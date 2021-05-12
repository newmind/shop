
import { NetworkError } from '@packages/errors';
import { sendEvent } from '@sys.packages/rabbit';

import Sagas from 'node-sagas';

import createGallery from './gallery/create';
import restoreGallery from './gallery/restore';

import createAttribute from './attribute/create';
import restoreAttributes from './attribute/restore';

import createBrand from './brand/create';
import restoreBrand from './brand/restore';

import createTypes from './types/create';
import restoreTypes from './types/restore';

import createCategory from './category/create';
import restoreCategory from './category/restore';

import getProduct from './product/get';
import createProduct from './product/create';
import restoreProduct from './product/restore';

import createPromotion from './promotion/create';
import restorePromotion from './promotion/restore';


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

  async getCreateProductSagaDefinition() {
    const sagaBuilder = new Sagas.SagaBuilder();
    const body = this.ctx['request']['body'];

    return sagaBuilder
      .step('Create product')
      .invoke(async (params) => {
        const uuid = await createProduct(body);
        params.setProductUUID(uuid);
      })
      .withCompensation(async (params) => {
        const uuid = params.getProductUUID();
        await restoreProduct(uuid);
      })

      .step('Create gallery')
      .invoke(async (params) => {
        const productUuid = params.getProductUUID();
        await createGallery(productUuid, body['gallery']);
      })
      .withCompensation(async (params) => {
        const uuid = params.getProductUUID();
        await restoreGallery(uuid);
      })

      .step('Create attributes')
      .invoke(async (params) => {
        const productUuid = params.getProductUUID();
        await createAttribute(productUuid, body['attributes']);
      })
      .withCompensation(async (params) => {
        const uuid = params.getProductUUID();
        await restoreAttributes(uuid);
      })

      .step('Create brand')
      .invoke(async (params) => {
        const productUuid = params.getProductUUID();
        await createBrand(productUuid, body['brandId']);
      })
      .withCompensation(async (params) => {
        const uuid = params.getProductUUID();
        await restoreBrand(uuid);
      })

      .step('Create types')
      .invoke(async (params) => {
        const productUuid = params.getProductUUID();
        await createTypes(productUuid, body['types']);
      })
      .withCompensation(async (params) => {
        const uuid = params.getProductUUID();
        await restoreTypes(uuid);
      })

      .step('Create category')
      .invoke(async (params) => {
        const productUuid = params.getProductUUID();
        await createCategory(productUuid, body['categories']);
      })
      .withCompensation(async (params) => {
        const uuid = params.getProductUUID();
        await restoreCategory(uuid);
      })

      .step('Create promotions')
      .invoke(async (params) => {
        const productUuid = params.getProductUUID();
        await createPromotion(productUuid, body['promotions']);
      })
      .withCompensation(async (params) => {
        const uuid = params.getProductUUID();
        await restorePromotion(uuid);
      })

      .step('Get client-product')
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
