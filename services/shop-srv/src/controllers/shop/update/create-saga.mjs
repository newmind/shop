
import { NetworkError } from '@packages/errors';

import logger from '@sys.packages/logger';

import Sagas from 'node-sagas';

import getShop from './shop/get';
import updateShop from './shop/update';

import getDeliveries from './deliveries/get';
import deleteDelivery from './deliveries/delete';
import updateDelivery from './deliveries/update';

import getPayments from './payments/get';
import deletePayments from './payments/delete';
import updatePayments from './payments/update';


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

      .step('Get shop deliveries')
      .invoke(async (params) => {
        logger.info('Get shop deliveries');
        const deliveries = await getDeliveries(body['uuid']);
        params.setDeliveries(deliveries);
      })
      .withCompensation(async (params) => {
        const deliveries = params.getDeliveries();
        await deleteDelivery(body['uuid']);
        await updateDelivery(body['uuid'], deliveries);
      })

      .step('Update deliveries status')
      .invoke(async () => {
        logger.info('Update deliveries status');
        await deleteDelivery(body['uuid']);
        await updateDelivery(body['uuid'], body['deliveries']);
      })

      .step('Get shop payments')
      .invoke(async (params) => {
        logger.info('Get shop payments');
        const payments = await getPayments(body['uuid']);
        params.setPayments(payments);
      })
      .withCompensation(async (params) => {
        logger.info('Restore shop payments');
        const payments = params.getPayments();
        await deletePayments(body['uuid']);
        await updatePayments(body['uuid'], payments);
      })

      .step('Update payments status')
      .invoke(async () => {
        logger.info('Update payments status');
        await deletePayments(body['uuid']);
        await updatePayments(body['uuid'], body['payments']);
      })

      .step('Get shop')
      .invoke(async (params) => {
        const shop = await getShop(requestParams['uuid']);
        params.setShop(shop)
      })

      .build();
  }
}
