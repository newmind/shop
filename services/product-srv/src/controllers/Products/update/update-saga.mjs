
import Sagas from 'node-sagas';


export default class UpdateSaga {
  ctx = null;

  constructor(ctx) {
    this.ctx = ctx;
  }

  async execute(params) {
    const saga = this.getUpdateProductSagaDefinition();
    try {
      return await saga.execute(params);
    }
    catch (e) {
      if (e instanceof Sagas.SagaExecutionFailed) {
        // Throws, when invocation flow was failed, but compensation has been completed
        console.log('SagaExecutionFailed', e.message);
      }
      if (e instanceof Sagas.SagaCompensationFailed) {
        // Throws, when compensation flow was failed
        console.log('SagaCompensationFailed');
      }
    }
  }

  getUpdateProductSagaDefinition() {
    const sagaBuilder = new Sagas.SagaBuilder();

    return sagaBuilder
      .step()
      .invoke((params) => {

      })
      .withCompensation((params) => {

      })
      .step()
      .invoke((params) => {

      })
      .withCompensation((params) => {

      })
      .step()
      .invoke((params) => {
        this.ctx.body = 'hello world';
      })
      .build();
  }
}
