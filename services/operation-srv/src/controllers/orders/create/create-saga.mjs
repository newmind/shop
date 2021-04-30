
import { NetworkError } from '@packages/errors';
import { sendCommand } from '@sys.packages/rabbit2';

import Sagas from 'node-sagas';

import createCustomer from './customer/create';
import deleteCustomer from './customer/delete';

import getPrice from './product/price';
import getProducts from './product/get';

import getOrder from './order/get';
import createOrder from './order/create';
import deleteOrder from './order/delete';
import updateOrder from './order/update';

import createProducts from './product/create';
import deleteProducts from './product/delete';

import createPikassaOperation from './pikassa/create';


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
        params.setCustomer(result);
      })
      .withCompensation(async (params) => {
        const customer = params.getCustomer();
        await deleteCustomer(customer['id']);
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
        const customer = params.getCustomer();
        const result = await createOrder(customer['id'], {
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

      .step('Create online pay')
      .invoke(async (params) => {
        const order = params.getOrder();
        const customer = params.getCustomer();

        const result = await createPikassaOperation({
          externalId: order['externalId'],
          amount: order['price'],
          currency: order['currency']['code'],
          description: 'Order',
          phone: customer['meta']['phone'],
          email: customer['meta']['email'],
          name: customer['name'],
          surname: customer['surname'],
          address: customer['meta']['address'],
        });
        params.setPikassa(result);
      })

      .step('Update online payment')
      .invoke(async (params) => {
        const order = params.getOrder();
        if (order['payment']['code'] === 'online') {
          const pikassa = params.getPikassa();
          await updateOrder(pikassa['externalId'], { paymentUUID: pikassa['uuid'], paymentLink: pikassa['paymentLink'] });
        }
      })

      .step('Get products')
      .invoke(async function(params) {
        const order = params.getOrder();
        const result = await getProducts(order['products'].map(item => item['uuid']));
        params.setProducts(result);
      })

      .step('Send event')
      .invoke(async (params) => {
        const order = params.getOrder();
        const customer = params.getCustomer();
        const pikassa = params.getPikassa();
        const products = params.getProducts();

        order['products'] = order['products'].map((product) => {
          const item = products.find((item) => item['uuid'] === product['uuid']);
          return {
            ...product,
            ...item,
          };
        });

        await sendCommand(process.env['QUEUE_ORDER_CREATED'], JSON.stringify({...order, ...customer, ...pikassa }));
      })

      .build();
  }
}
