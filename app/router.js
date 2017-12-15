'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.get('/test',controller.pgtest.test);
  router.get('/testseq',controller.pgtest.testseq);
};
