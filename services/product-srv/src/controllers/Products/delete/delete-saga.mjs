
import { NetworkError } from "@packages/errors";
import { sendEvent } from '@sys.packages/rabbit2';

import Sagas from 'node-sagas';

import deleteImages from './deleteImages';
import deleteProperties from './deleteProperties';


export default class DeleteSaga {
  ctx = null;

  constructor(ctx) {
    this.ctx = ctx;
  }

  async execute(params) {
    const saga = await this.getDeleteProductSagaDefinition(this.ctx);
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

  async getDeleteProductSagaDefinition(ctx) {
    const sagaBuilder = new Sagas.SagaBuilder();

    const { uuid } = ctx['request']['body'];

    return sagaBuilder
      .step('Удаление изображений')
      .invoke(async () => {
        await deleteImages(uuid);
      })

      .step('Удаление товара')
      .invoke(async (params) => {
        await deleteProperties(uuid);
        params.setProductUuid(uuid);
      })

      .step('Send event')
      .invoke(async () => {
        await sendEvent(process.env['EXCHANGE_PRODUCT_DELETE'], JSON.stringify(uuid));
      })

      .build();
  }
}
