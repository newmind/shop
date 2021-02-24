
import { NetworkError } from "@packages/errors";
import { sendEvent } from '@sys.packages/rabbit2';

import Sagas from 'node-sagas';

import getProduct from './getProduct';
import updateProperties from './updateProperties';


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
      .step('Update product properties')
      .invoke(async () => {
        await updateProperties(uuid, body);
      })

      .step('Get product')
      .invoke(async (params) => {
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
