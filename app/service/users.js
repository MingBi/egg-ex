const Service=require('egg').Service;

class UserService extends Service{

  async create(param){
    const {app,ctx}=this;
    let {name,age}=param;

    await app.yushanQuery('insert into TABLE_USER values($1,$2)',[name,age]);

    let results=await app.yushanQuery('select id from TABLE_USER where name=$1',[name]);

    return results[0].id;
  }

  async show(id){
    const {app,ctx}=this;

    let results=await app.yushanQuery('select * from TABLE_USER wherer id=$1',[id]);

    return results[0];
  }

}

module.exports=UserService;