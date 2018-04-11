'use strict';

const pg = require('pg');
const Sequelize = require('sequelize');

module.exports = app =>{
  app.beforeStart(async () =>{
    app.logger.debug('the config is ' + app.config.name);

    //创建一个连接池，具体参数见config，max为最大连接数
    app.pool_yushan = new pg.Pool(app.config.yushan);

    //sequelize没写完
    app.sequelize=new Sequelize(app.config.yushan.database,app.config.yushan.user,app.config.yushan.password,{
      host:app.config.yushan.host,
      port:app.config.yushan.port,
      dialect:'postgres',

      pool:{
        max:5,
        min:0,
        acquire: 30000,
        idle: 10000
      },
    })

  });


  //封装一个执行sql语句方法
  app.yushanQuery = function(sql, param) {
    return new Promise(function(resolve, reject) {
      //在连接池取出一个链接
      app.pool_yushan.connect(function(err, client, done) {
        if (err) {
          return console.error('error fetching client from pool', err);
        }
        //执行sql语句
        client.query(sql, param, function(error, results) {
          //断开与连接池的链接，如果不断开，这个链接将被占用
          done();
          if (error) {
            console.log(sql);
            console.log(param);
            return reject(error);
          }
          //返回查询结果
          resolve(results.rows);
        });
      });
    });
  };
}