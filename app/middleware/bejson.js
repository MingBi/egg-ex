//返回数据格式化处理
module.exports = () => {
  return async function bejson(ctx,next) {
    try {
      await next();

      //如果返回的是文件
      if (Buffer.isBuffer(ctx.body)) return;

      //如果没有返回
      if (!ctx.body) {
        ctx.body = '';
      }

      //返回格式化
      ctx.body = {
        code: 0,
        status: 'success',
        data: ctx.body,
      };
    } catch (error) {

      //如果next报错
      ctx.body = {
        code: 1,
        status: 'failed',
        message: error,
      };
      //把这个error扔给下一个中间件处理，在本项目中，给logging
      throw error;
    }


  };
};
