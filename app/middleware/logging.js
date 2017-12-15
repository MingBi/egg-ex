module.exports = () => {
  return async function logging(ctx,next) {
    ctx.logger.info(ctx.request.url);
    try {
      await next();
    } catch (error) {
      ctx.logger.error(error);
    }

  };
};
