'use strict';

const path=require('path');

module.exports = appInfo => {
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1513067096519_9462';

  // add your config here
  config.middleware = ['jwtauth', 'logging', 'bejson'];

  config.logger = {
    dir: path.join(path.dirname(__dirname), '/logs'),
  };

  config.name='default';

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.multipart={
    fileExtensions: [ '.xlsx' ], // 增加对 .apk 扩展名的支持
  }



  return config;
};
