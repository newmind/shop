
import { NetworkError } from '@packages/errors';
import { sendCommand } from '@sys.packages/rabbit2';

import Sagas from 'node-sagas';

import createCustomer from './customer/create';
import deleteCustomer from './customer/delete';

import getPrice from './product/price';

import getOrder from './order/get';
import createOrder from './order/create';
import deleteOrder from './order/delete';

import createProducts from './product/create';
import deleteProducts from './product/delete';


export default class CreateSaga {
  ctx = null;

  constructor(ctx) {
    this.ctx = ctx;
  }

  async execute(params) {
    const saga = await this.getCreateOrderSagaDefinition(this.ctx);
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

  async getCreateOrderSagaDefinition() {
    const sagaBuilder = new Sagas.SagaBuilder();
    const body = this.ctx['request']['body'];

    return sagaBuilder
      .step('Create customer')
      .invoke(async (params) => {
        const result = await createCustomer(body);
        params.setCustomerId(result['id']);
      })
      .withCompensation(async (params) => {
        await deleteCustomer(params.getCustomerId());
      })

      .step('Get price')
      .invoke(async (params) => {
        const result = await getPrice(body['items']);
        params.setPrices(result);
      })
      .withCompensation((params) => {
        params.setPrices(null);
      })

      .step('Create order')
      .invoke(async (params) => {
        const price = params.getPrices();
        const result = await createOrder(params.getCustomerId(), {
          ...body,
          price: price[1],
          currencyCode: price[0],
        });
        params.setOrderId(result['id']);
      })
      .withCompensation(async (params) => {
        await deleteOrder(params.getOrderId());
      })

      .step('Create products')
      .invoke(async (params) => {
        await createProducts(params.getOrderId(), body['items']);
      })
      .withCompensation(async (params) => {
        await deleteProducts(params.getOrderId());
      })

      .step('Get order')
      .invoke(async (params) => {
        const result = await getOrder(params.getOrderId());
        params.setOrder(result);
      })

      .step('Send event')
      .invoke(async (params) => {
        const order = params.getOrder();
        const result = await sendCommand(process.env['QUEUE_ORDER_CREATED'], JSON.stringify(order), { reply: true });
        const data = JSON.parse(result);
        if ( ! data['success']) {
          throw Error('no send');
        }
      })

      .build();
  }
}
