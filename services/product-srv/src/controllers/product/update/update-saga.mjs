
import { NetworkError } from "@packages/errors";

import logger from '@sys.packages/logger';
import { sendEvent } from '@sys.packages/rabbit';

import Sagas from 'node-sagas';

import updateGallery from './gallery/update';
import restoreGallery from './gallery/restore';

import updateAttribute from './attribute/update';
import restoreAttributes from './attribute/restore';

import updateOption from './option/update';
import restoreOption from './option/restore';

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

import updateShops from './shops/update';
import restoreShops from './shops/restore';


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

      .step('Update shops')
      .invoke(async (params) => {
        logger.info('Update shops');
        const shops = await updateShops(uuid, body['shops']);
        params.setShops(shops);
      })
      .withCompensation(async (params) => {
        logger.info('Restore update shops');
        const shops = params.getShops();
        await restoreShops(uuid, shops);
      })

      .step('Update attribute')
      .invoke(async (params) => {
        logger.info('Update attributes');
        const attributes = await updateAttribute(uuid, body['characteristics']);
        params.setAttributes(attributes);
      })
      .withCompensation(async (params) => {
        logger.info('Restore update attributes');
        const attributes = params.getAttributes();
        await restoreAttributes(uuid, attributes);
      })

      .step('Update options')
      .invoke(async (params) => {
        logger.info('Update options');
        const options = await updateOption(uuid, body['options']);
        params.setOptions(options);
      })
      .withCompensation(async (params) => {
        logger.info('Restore update options');
        const options = params.getOptions();
        await restoreOption(uuid, options);
      })

      .step('Update brand')
      .invoke(async (params) => {
        logger.info('Update brand');
        const brand = await updateBrand(uuid, body['brand']);
        params.setBrand(brand);
      })
      .withCompensation(async (params) => {
        logger.info('Restore update brand');
        const brand = params.getBrand();
        await restoreBrand(uuid, brand);
      })

      .step('Update type')
      .invoke(async (params) => {
        logger.info('Update type');
        const result = await updateTypes(uuid, body['type']);
        params.setTypes(result);
      })
      .withCompensation(async (params) => {
        logger.info('Restore update type');
        const type = params.getTypes();
        await restoreTypes(uuid, type);
      })

      .step('Update category')
      .invoke(async (params) => {
        logger.info('Update category');
        const category = await updateCategory(uuid, body['category']);
        params.setCategories(category);
      })
      .withCompensation(async (params) => {
        logger.info('Restore update category');
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
