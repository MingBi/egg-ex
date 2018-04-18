const Controller=require('egg').Controller;

//参数校验的具体规则在https://github.com/node-modules/parameter
const showRule={
  id:'string',
};

const createRule={
  name:{type: 'string', max:20,min:1 },//姓名长度最大为20,最小为1
  email:'email',

}

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

    ctx.validate(showRule,ctx.params);

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
    ctx.validate(createRule);
    console.log(ctx.request.body);

    const id=await ctx.service.users.create(ctx.request.body);

    ctx.body='ok'
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