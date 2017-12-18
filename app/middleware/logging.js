module.exports = () => {
  return async function logging(ctx,next) {

    //打印访问地址
    ctx.logger.info(ctx.request.url);
    try {
      await next();
    } catch (error) {
      //打印错误，不继续抛出错误。也可抛出给框架处理
      ctx.logger.error(error);
    }

  };
};
