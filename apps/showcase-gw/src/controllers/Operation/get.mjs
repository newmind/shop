
import { sleep, UUID } from '@sys.packages/sys.utils';

export default () => async (ctx) => {

  const externalId = UUID();

  await sleep(3000);

  ctx.body = {
    externalId,
  };
};

