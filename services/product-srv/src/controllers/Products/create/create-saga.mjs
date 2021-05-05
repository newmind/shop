
import { NetworkError } from '@packages/errors';
import { sendEvent } from '@sys.packages/rabbit2';

import Sagas from 'node-sagas';

import getProduct from './getProduct';
import deleteProduct from './deleteProduct';
import createProperties from './createProperties';


export default class CreateSaga {
  ctx = null;

  constructor(ctx) {
    this.ctx = ctx;
  }

  async execute(params) {
    const saga = await this.getCreateProductSagaDefinition(this.ctx);
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

  async getCreateProductSagaDefinition() {
    const sagaBuilder = new Sagas.SagaBuilder();
    const body = this.ctx['request']['body'];

    return sagaBuilder
      .step('Create client-product properties')
      .invoke(async (params) => {
        const uuid = await createProperties(body);
        params.setProductUUID(uuid);
      })
      .withCompensation(async (params) => {
        const uuid = params.getProductUUID();
        await deleteProduct(uuid);
      })

      .step('Get client-product')
      .invoke(async (params) => {
        const uuid = params.getProductUUID();
        const product = await getProduct(uuid);
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
