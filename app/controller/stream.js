'use strict';

const Controller = require('Controller');
class StreamController extends Controller{

  //上传文件
  async uploadFile(){
    const {app,ctx}=this;

    //得到stream
    const stream = await ctx.getFileStream();

    //得到参数
    const {x,y,z}=stream.fields;

    //得到文件的buffer,之后可以对buffer进行操作，比如node-xlsx插件 xlsx.parse()
    const buffer=await ctx.helper.streamToBuffer(stream);

    await sendToWormhole(stream);

    ctx.body='ok';buffer

  }

}

module.exports=StreamController;