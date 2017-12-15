const jwt = require('jwt-simple');

module.exports = () => {
  return async function jwtauth(ctx,next) {

    const token = ctx.request.headers.token || (ctx.request.body && ctx.request.body.token) ||
      (ctx.request.query && ctx.request.query.token);

    if (token) {
      try {

        const decoded = jwt.decode(token, 'secret');

        if (decoded.exp <= Date.now()) {
          throw new Error('Access token has expired');
        }

        ctx.request.userid = decoded.userid;

      } catch (err) {
        throw new Error(err);
      }
    }

    await next();

  };
};
