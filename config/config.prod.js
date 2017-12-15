'use strict';

module.exports = appInfo =>{
  const config={};

  config.yushan = {
    user: 'user',
    database: 'database',
    password: 'password',
    host: 'host_prod',
    port: 'port_prod',
    max: 10,
    idleTimeoutMillis: 30000,
  };

  config.name = 'prod';

  return config;
}