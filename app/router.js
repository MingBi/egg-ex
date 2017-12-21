'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.get('/pgtest/test',controller.pgtest.test);
  router.get('/pgtest/testService',controller.pgtest.testService);
  router.get('/pgtest/testSeq',controller.pgtest.testSeq);

  router.get('/getAndPost/receiveGet',controller.getAndPost.receiveGet);
  router.post('/getAndPost/receivePost',controller.getAndPost.receivePost);
  router.get('/getAndPost/sendGet',controller.getAndPost.sendGet);
  router.get('/getAndPost/sendPost',controller.getAndPost.sendPost);

  router.post('/stream/uploadFile',controller.stream.uploadFile);
  router.post('/stream/uploadManyFiles',controller.stream.uploadManyFiles);

  router.get('/login/login',controller.login.login);

};
