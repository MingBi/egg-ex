const Service=require('egg').Service;

class sqlTestService extends Service{

  async find(){
    const {app,ctx}=this;
    return await app.yushanQuery('select * from TABLE',[]);
  }

}

module.exports=sqlTestService;