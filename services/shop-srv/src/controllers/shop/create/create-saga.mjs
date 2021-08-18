
import { NetworkError } from '@packages/errors';

import logger from '@sys.packages/logger';

import Sagas from 'node-sagas';

import getShop from './shop/get';
import createShop from './shop/create';
import deleteShop from './shop/delete';

import createPayments from './payments/create';
import deletePayments from './payments/delete';

import createDeliveries from './deliveries/create';
import deleteDeliveries from './deliveries/delete';


export default class CopySaga {
  ctx = null;

  constructor(ctx) {
    this.ctx = ctx;
  }

  async execute(params) {
    const saga = await this.getCreateShopSagaDefinition(this.ctx);
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

  async getCreateShopSagaDefinition() {
    const sagaBuilder = new Sagas.SagaBuilder();
    const body = this.ctx['request']['body'];

    console.log(body)

    return sagaBuilder
      .step('Create shop')
      .invoke(async (params) => {
        logger.info('Create shop');
        const uuid = await createShop(body);
        params.setShopId(uuid);
      })
      .withCompensation(async (params) => {
        logger.info('Restore shop');
        const uuid = params.getShopId();
        await deleteShop(uuid);
        await deleteDeliveries(uuid);
        await deletePayments(uuid);
      })

      .step('Create shop deliveries')
      .invoke(async () => {
        await createDeliveries(body['uuid'], body['deliveries']);
      })

      .step('Create shop payments')
      .invoke(async () => {
        await createPayments(body['uuid'], body['payments']);
      })

      .step('Get shop')
      .invoke(async (params) => {
        const uuid = params.getShopId();
        const shop = await getShop(uuid);
        params.setShop(shop)
      })

      .build();
  }
}
