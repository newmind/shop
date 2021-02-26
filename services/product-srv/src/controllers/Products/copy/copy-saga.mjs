
import { models } from "@sys.packages/db";
import { NetworkError } from '@packages/errors';
import { sendEvent } from '@sys.packages/rabbit2';

import Sagas from 'node-sagas';

import getProduct from './getProduct';
import createProperties from './createProperties';


export default class CopySaga {
  ctx = null;

  constructor(ctx) {
    this.ctx = ctx;
  }

  async execute(params) {
    const saga = await this.getCopyProductSagaDefinition(this.ctx);
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

  async getCopyProductSagaDefinition(ctx) {
    const sagaBuilder = new Sagas.SagaBuilder();

    const { uuid } = ctx['params'];
    const { uuid: newUuid } = ctx['request']['body'];
    const { Product } = models;

    return sagaBuilder
      .step('Get Product')
      .invoke(async (params) => {
        const product = await getProduct(uuid);
        params.setProduct(product);
      })

      .step('Copy product')
      .invoke(async (props) => {
        const { price, name, description, status, fiscal, currency } = props.getProduct();
        await Product.create({ uuid: newUuid, price, name, description, status, fiscal, currencyCode: currency['code'] });
      })

      .step('Create attributes')
      .invoke(async (props) => {
        const product = props.getProduct();
        await createProperties(newUuid, product);
      })

      .step('Get product')
      .invoke(async (params) => {
        const product = await getProduct(newUuid);
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
