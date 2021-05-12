
import CreateSagaParams from "./create-saga-params.mjs";
import CreateSaga from "./create-saga.mjs";


export default () => async (ctx) => {
  const sagaParams = new CreateSagaParams();
  const saga = new CreateSaga(ctx);

  const params = await saga.execute(sagaParams);

  ctx.body = {
    success: true,
    data: params.getProduct(),
  };
};
