
import { NetworkError } from "@packages/errors";

import logger from '@sys.packages/logger';
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
        logger.info('Update gallery');
        const gallery = await updateGallery(uuid, body['gallery']);
        params.setGallery(gallery);
      })
      .withCompensation(async (params) => {
        logger.info('Restore update gallery');
        const gallery = params.getGallery();
        await restoreGallery(uuid, gallery);
      })

      .step('Update attribute')
      .invoke(async (params) => {
        logger.info('Update attributes');
        const attributes = await updateAttribute(uuid, body['characteristics']);
        params.setAttributes(uuid, attributes);
      })
      .withCompensation(async (params) => {
        logger.info('Restore update attributes');
        const attributes = params.getAttributes();
        await restoreAttributes(uuid, attributes);
      })

      .step('Update brand')
      .invoke(async (params) => {
        logger.info('Update brand');
        const result = await updateBrand(uuid, body['brandId']);
        params.setBrand(result);
      })
      .withCompensation(async (params) => {
        logger.info('Restore update brand');
        const brandId = params.getBrand();
        await restoreBrand(uuid, brandId);
      })

      .step('Update types')
      .invoke(async (params) => {
        logger.info('Update types');
        const result = await updateTypes(uuid, body['types']);
        params.setTypes(result);
      })
      .withCompensation(async (params) => {
        logger.info('Restore update types');
        const types = params.getTypes();
        await restoreTypes(uuid, types);
      })

      .step('Update categories')
      .invoke(async (params) => {
        logger.info('Update categories');
        const categories = await updateCategory(uuid, body['categories']);
        params.setCategories(categories);
      })
      .withCompensation(async (params) => {
        logger.info('Restore update categories');
        const categories = params.getCategories();
        await restoreCategory(uuid, categories);
      })

      .step('Update product')
      .invoke(async (params) => {
        logger.info('Update product');
        const product = await updateProduct(uuid, body);
        params.setProduct(product);
      })
      .withCompensation(async (params) => {
        logger.info('Restore update product');
        const product = params.getProduct();
        await restoreProduct(uuid, product);
      })

      .step('Update promotion')
      .invoke(async (params) => {
        if (body['promotions']) {
          logger.info('Update promotions');
          const promotions = await updatePromotion(uuid, body['promotions']);
          params.setPromotions(promotions);
        }
      })
      .withCompensation(async (params) => {
        logger.info('Restore update promotions');
        const promotions = params.getPromotions();
        if (promotions) {
          await restorePromotion(uuid, promotions);
        }
      })

      .step('Get product')
      .invoke(async (params) => {
        logger.info('Get product');
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
