//返回数据格式化处理
module.exports = () => {
  return async function bejson(ctx,next) {
    try {
      await next();

      

      if(ctx.response.status===404){
        let e= new Error()
        e.status=404;
        e.message='404 not found'
        throw e
      }

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
    } catch (err) {
      throw err;
    }


  };
};
