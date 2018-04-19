const jwt = require('jwt-simple');

module.exports = () => {
  /*
  jwt用来解析token
  在这里的做法是请求会携带userid，获取这个userid放在ctx里，以便在controller里获取使用
  token里的userid如何在前端请求里详见Controller里的login
   */
  return async function jwtauth(ctx,next) {

    const token = ctx.request.headers.token || (ctx.request.body && ctx.request.body.token) ||
      (ctx.request.query && ctx.request.query.token);

    if (token) {
      try {

        const decoded = jwt.decode(token, 'secret');

        //exp为有效时间
        if (decoded.exp <= Date.now()) {
          throw new Error('Access token has expired');
        }

        ctx.request.userid = decoded.userid;

      } catch (err) {
        throw new Error(err);
      }
    }else{
      //去掉此处token开启token验证
      //throw new Error('no token');
    }

    await next();

  };
};
