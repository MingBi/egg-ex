'use strict';

module.exports = appInfo =>{
  const config={};

  config.yushan = {
    user: 'user',
    database: 'database',
    password: 'password',
    host: 'host_local',
    port: 'port_local',
    max: 10,
    idleTimeoutMillis: 30000,
  };

  config.name = 'local';

  return config;
}