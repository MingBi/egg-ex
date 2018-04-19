//返回数据格式化处理
module.exports = () => {
    return async function errorHandle(ctx,next) {
      try {
        await next();
      } catch (err) {
        console.log(JSON.stringify(err))
        console.log(err.toString());
        console.log(err.status);
        console.log(Object.keys(err))
        console.log(typeof err)

  
        //ctx.app.emit('error',err,ctx)
  
        const status = err.statusCode || err.status || 500;
        // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
        const error = status === 500 && ctx.app.config.env === 'prod'
          ? 'Internal Server Error'
          : err.message;
  
        // 从 error 对象上读出各个属性，设置到响应中
        ctx.body = { 
          code:1,
          status:'failed',
          message:error
        };
        
        if (status === 422) {
          ctx.body.detail = err.errors;
        }
        ctx.status = status;
  
        
        //如果next报错
  
        //把这个error扔给下一个中间件处理，在本项目中，给logging
        throw error;
      }
  
  
    };
  };
  