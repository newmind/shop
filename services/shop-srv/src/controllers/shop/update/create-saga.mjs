
import { NetworkError } from '@packages/errors';

import logger from '@sys.packages/logger';

import Sagas from 'node-sagas';

import getShop from './shop/get';
import updateShop from './shop/update';


export default class CopySaga {
  ctx = null;

  constructor(ctx) {
    this.ctx = ctx;
  }

  async execute(params) {
    const saga = await this.getUpdateShopSagaDefinition(this.ctx);
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

  async getUpdateShopSagaDefinition() {
    const sagaBuilder = new Sagas.SagaBuilder();
    const requestParams = this.ctx['params'];
    const body = this.ctx['request']['body'];

    return sagaBuilder
      .step('Get shop')
      .invoke(async (params) => {
        logger.info('Get shop');
        const shop = await getShop(requestParams['uuid']);
        params.setShop(shop);
      })

      .step('Update shop')
      .invoke(async () => {
        logger.info('Update shop');
        await updateShop(requestParams['uuid'], body);
      })
      .withCompensation(async (params) => {
        logger.info('Restore shop');
        const shop = params.getShop();
        await updateShop(requestParams['uuid'], shop);
      })

      .step('Get shop')
      .invoke(async (params) => {
        const shop = await getShop(requestParams['uuid']);
        params.setShop(shop)
      })

      .build();
  }
}
