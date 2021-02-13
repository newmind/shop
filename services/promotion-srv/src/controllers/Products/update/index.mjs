
import UpdateSagaParams from './update-saga-params.mjs';
import UpdateSaga from './update-saga.mjs';


export default () => async (ctx) => {
  const sagaParams = new UpdateSagaParams();
  const saga = new UpdateSaga(ctx);

  const params = await saga.execute(sagaParams);

  ctx.body = {
    success: true,
    data: params.getProduct(),
  };
};
