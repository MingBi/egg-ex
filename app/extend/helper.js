module.exports={
  async streamToBuffer(stream){
    return await new Promise((resolve,reject)=>{
      const chunks=[];
      let size=0;
      
      stream.on('data',function (chunk) {
        chunks.push(chunk);
        size+=chunk.length;
      });

      let data;
      stream.on('end', function() {
        switch (chunks.length) {
          case 0: data = new Buffer(0);
            break;
          case 1: data = chunks[0];
            break;
          default:
            data = new Buffer(size);
            for (let i = 0, pos = 0, l = chunks.length; i < l; i++) {
              const chunk = chunks[i];
              chunk.copy(data, pos);
              pos += chunk.length;
            }
            break;
        }

        resolve(data);

      });
    });
  }
}