const Controller = require('egg').Controller;

class getAndPostController extends Controller{

  //接收get请求
  async receiveGet(){
    const {app,ctx}=this;

    //get请求样例 http://localhost:8000/getAndPost/receiveGet?user=admin&pass=123&x=5
    //get请求的参数获取
    const {user,pass,x:y}=ctx.request.query;
    //x:y 给x变量重新命名为y

    ctx.body={
      user:user,
      pass:pass,
      z:y
    }
  }

  //接收post请求
  async receivePost(){
    const {app,ctx}=this;

    //post请求参数获取
    const {user,pass,x:y}=ctx.request.body;

    ctx.body={
      user:user,
      pass:pass,
      z:y
    }
  }

  //发送一个get请求
  async sendGet(){
    const {app,ctx} = this;
    const url='localhost:8000/getAndPost/receiveGet?user=admin&pass=123&x=5';

    let reusult=await ctx.curl(url,{
      method:'GET',
      dataType:'json'
    });

    ctx.body=reusult.data;
  }

  //发送一个post请求
  async sendPost(){
    const {app,ctx}=this;

    let url='localhost:8000/getAndPost/receivePost';

    let results=await ctx.curl(url,{
      method:'POST',
      contentType: 'json',
      data:{
        user:'admin',
        pass:'pass',
        x:5
      }
    });

    ctx.body=results.data;
  }



}

module.exports=getAndPostController;