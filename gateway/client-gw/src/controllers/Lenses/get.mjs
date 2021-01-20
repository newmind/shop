'use strict';

export default () => async (ctx) => {

  ctx.body = [
    { id: 1, value: 'Линза 1' },
    { id: 2, value: 'Линза 2' },
    { id: 3, value: 'Линза 3' },
    { id: 4, value: 'Линза 4' },
  ];
}
