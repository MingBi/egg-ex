'use strict';

const moment = require('moment');
const crypto = require('crypto');
const jwt = require('jwt-simple');


const Controller=require('egg').Controller;

const loginRule={
  username:'string',
  password:'string',
  key:'string'
}

class LoginController extends Controller{

  async login(){
    const{app,ctx}=this;
    ctx.validate(loginRule,ctx.request.query);
    const {username,password,key}=ctx.request.query;
    const expires=moment().add(1,'days').valueOf();
    //数据库中存的是md5之后的password
    const sql='数据库中通过username获取password';

    const results=await app.yushanQuery(sql,[username]);

    if (results.length === 0) {
      throw new Error('no such user');
    }

    /*
    前端传来的密码应该md5
    我们md5一下就跟数据库的一样了
     */
    const md5 = crypto.createHash('md5');
    const pass = md5.update(results[0].password + key).digest('hex');

    if (pass === password) {

      ctx.cookies.set('username', encodeURI(username), { maxAge: 600000 });
      ctx.cookies.set('last_login_date', encodeURI(results[0].last_login_date), { maxAge: 600000 });

      const token = jwt.encode({
        userid: results[0].id,
        exp: expires,
      }, 'secret');

      ctx.body = {
        token,
        data: results[0],
      };

    }
  }

}

module.exports=LoginController;