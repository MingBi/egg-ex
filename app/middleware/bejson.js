module.exports = () => {
  return async function bejson(ctx,next) {
    try {
      await next();

      if (Buffer.isBuffer(ctx.body)) return;

      if (!ctx.body) {
        ctx.body = '';
      }
      ctx.body = {
        code: 0,
        status: 'success',
        data: ctx.body,
      };
    } catch (error) {

      ctx.body = {
        code: 1,
        status: 'failed',
        message: error,
      };
      throw error;
    }


  };
};
