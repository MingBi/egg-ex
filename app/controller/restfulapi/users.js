const Controller=require('egg').Controller;

class UserController extends Controller{

  // GET /users 触发
  async index(){
    this.ctx.body='this is users'
  }

  // GET /users/new 触发
  async new(){

  }

  // GET /users/:id 触发
  async show(){
    //查询一个user

    const {ctx,app}=this;

    console.log(ctx.params)
    let id=ctx.params.id;

    const user=await ctx.service.users.show(id);

    ctx.body={
      user:user
    };
  }

  // GET /users/:id/edit 触发
  async edit(){

  }

  // POST /users 触发
  async create(){
    //创建一个user

    const {ctx,app}=this;

    const id=await ctx.service.users.create(ctx.request.body);

    ctx.body={
      id:id
    }
  }

  // PUT /users/:id 触发
  async update(){
    //重复代码懒的写
  }

  // DELETE /users/:id 触发
  async destory(){
    //重复代码懒的写
  }

}

module.exports=UserController;