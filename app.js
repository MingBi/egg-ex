'use strict';

const pg = require('pg');
const Sequelize = require('sequelize');

module.exports = app =>{
  app.beforeStart(async () =>{
    app.logger.debug('the config is ' + app.config.name);

    app.pool_yushan = new pg.Pool(app.config.yushan);

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


  app.yushanQuery = function(sql, param) {
    return new Promise(function(resolve, reject) {
      app.pool_yushan.connect(function(err, client, done) {
        if (err) {
          return console.error('error fetching client from pool', err);
        }
        client.query(sql, param, function(error, results) {
          done();
          if (error) {
            console.log(sql);
            console.log(param);
            return reject(error);
          }
          resolve(results.rows);
        });
      });
    });
  };
}