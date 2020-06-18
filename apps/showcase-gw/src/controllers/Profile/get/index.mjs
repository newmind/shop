
export default () => (ctx) => {

  ctx.status = 200;
  ctx.body = {
    success: true,
    data: null,
  };
};
