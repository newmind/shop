
import { NetworkError } from "@packages/errors";
import { sendEvent } from '@sys.packages/rabbit';

import Sagas from 'node-sagas';

import updateGallery from './gallery/update';
import restoreGallery from './gallery/restore';

import updateAttribute from './attribute/update';
import restoreAttributes from './attribute/restore';

import updateBrand from './brand/update';
import restoreBrand from './brand/restore';

import updateTypes from './types/update';
import restoreTypes from './types/restore';

import updateCategory from './category/update';
import restoreCategory from './category/restore';

import getProduct from './product/get';
import updateProduct from './product/update';
import restoreProduct from './product/restore';

import updatePromotion from './promotion/update';
import restorePromotion from './promotion/restore';


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
    const body = ctx['request']['body'];

    return sagaBuilder
      .step('Update gallery')
      .invoke(async (params) => {
        const gallery = await updateGallery(uuid, body['gallery']);
        params.setGallery(gallery);
      })
      .withCompensation(async (params) => {
        const gallery = params.getGallery();
        await restoreGallery(gallery);
      })

      .step('Update attribute')
      .invoke(async (params) => {
        const attributes = await updateAttribute(uuid, body['attributes']);
        params.setAttributes(uuid, attributes);
      })
      .withCompensation(async (params) => {
        const attributes = params.getAttributes();
        await restoreAttributes(uuid, attributes);
      })

      .step('Update brand')
      .invoke(async (params) => {
        const result = await updateBrand(uuid, body['brandId']);
        params.setBrand(result);
      })
      .withCompensation(async (params) => {
        const brandId = params.getBrand();
        await restoreBrand(uuid, brandId);
      })

      .step('Update types')
      .invoke(async (params) => {
        const result = await updateTypes(uuid, body['types']);
        params.setTypes(result);
      })
      .withCompensation(async (params) => {
        const types = params.getTypes();
        await restoreTypes(uuid, types);
      })

      .step('Update categories')
      .invoke(async (params) => {
        const categories = await updateCategory(uuid, body['categories']);
        params.setCategories(categories);
      })
      .withCompensation(async (params) => {
        const categories = params.getCategories();
        await restoreCategory(uuid, categories);
      })

      .step('Update product')
      .invoke(async (params) => {
        const product = await updateProduct(uuid, body);
        params.setProduct(product);
      })
      .withCompensation(async (params) => {
        const product = params.getProduct();
        await restoreProduct(uuid, product);
      })

      .step('Update promotion')
      .invoke(async (params) => {
        const promotions = await updatePromotion(uuid, body['promotions']);
        params.setPromotions(promotions)
      })
      .withCompensation(async (params) => {
        const promotions = params.getPromotions();
        await restorePromotion(uuid, promotions);
      })

      .step('Get product')
      .invoke(async (params) => {
        const product = await getProduct(uuid);
        params.setProduct(product)
      })

      .step('Send event')
      .invoke(async (params) => {
        const product = params.getProduct();
        await sendEvent(process.env['EXCHANGE_PRODUCT_UPDATE'], JSON.stringify(product));
      })

      .build();
  }
}
