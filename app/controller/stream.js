'use strict';
const xlsx = require('node-xlsx');
const sendToWormhole = require('stream-wormhole');

const Controller = require('egg').Controller;
class StreamController extends Controller{

  //单个文件上传
  async uploadFile(){
    const {app,ctx}=this;

    //得到stream
    const stream = await ctx.getFileStream();

    //得到参数
    const {x,y,z}=stream.fields;

    /*
     得到文件的buffer,需要将stream读成buffer
     之后可以对buffer进行操作
     比如node-xlsx插件 xlsx.parse()
     */
    const buffer=await ctx.helper.streamToBuffer(stream);

    // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
    await sendToWormhole(stream);

    ctx.body='ok';

  }

  async uploadManyFiles(){
    const {app,ctx}=this;
    const parts=ctx.multipart();

    let part;

    while((part=await parts())!=null){


      if(part.length){
        //不是文件流参数
        console.log('field: ' + part[0]);
        console.log('value: ' + part[1]);
        console.log('valueTruncated: ' + part[2]);
        console.log('fieldnameTruncated: ' + part[3]);

      }else{
        if(!part.filename){
          // 这时是用户没有选择文件就点击了上传(part 是 file stream，但是 part.filename 为空)
          // 需要做出处理，例如给出错误提示消息
          return;
        }

        // part 是上传的文件流
        console.log('field: ' + part.fieldname);
        console.log('filename: ' + part.filename);
        console.log('encoding: ' + part.encoding);
        console.log('mime: ' + part.mime);

        let buff;
        buff=await ctx.helper.streamToBuffer(part);

        await sendToWormhole(part);

        let obj=xlsx.parse(buff);
        console.log(obj[0].data);
      }

    }

    ctx.body='ok'
  }

}

module.exports=StreamController;