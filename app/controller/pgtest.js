'use strict';

const Controller = require('egg').Controller;

class PgtestController extends Controller{

  async test(){
    const {app,ctx}=this;

    ctx.body = await app.yushanQuery('select * from tb_third_account limit 1',[]);
  }

  async testseq(){
    const {app,ctx}=this;

    ctx.body = await app.sequelize.authenticate()
      .then(()=>{
        return 'ok';
      })
      .catch(err=>{
        return 'nok:'+err;
      })
  }

}

module.exports=PgtestController;