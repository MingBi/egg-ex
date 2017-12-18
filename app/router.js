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
};
