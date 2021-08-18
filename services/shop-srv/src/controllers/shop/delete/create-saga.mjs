
import { NetworkError } from '@packages/errors';

import logger from '@sys.packages/logger';

import Sagas from 'node-sagas';

import getShops from './shop/get';
import createShops from './shop/create';
import deleteShops from './shop/delete';

import deleteDeliveries from './deliveries/delete';


export default class CopySaga {
  ctx = null;

  constructor(ctx) {
    this.ctx = ctx;
  }

  async execute(params) {
    const saga = await this.getDeleteShopSagaDefinition(this.ctx);
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

  async getDeleteShopSagaDefinition() {
    const sagaBuilder = new Sagas.SagaBuilder();
    const body = this.ctx['request']['body'];

    return sagaBuilder
      .step('Get shops')
      .invoke(async (params) => {
        logger.info('Get shops');
        const shops = await getShops(body['uuid']);
        params.setShops(shops);
      })

      .step('Delete shop deliveries')
      .invoke(async () => {
        await deleteDeliveries(body['uuid']);
      })

      .step('Delete shops')
      .invoke(async () => {
        logger.info('Update shop');
        await deleteShops(body['uuid']);
      })
      .withCompensation(async (params) => {
        logger.info('Restore shops');
        const shops = params.getShops();
        await createShops(shops);
      })

      .build();
  }
}
