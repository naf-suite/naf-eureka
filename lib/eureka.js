'use strict';

const assert = require('assert');
const Eureka = require('eureka-js-client');

module.exports = app => {
  app.addSingleton('eureka', createClient);
};

/**
 * @param  {Object} config   框架处理之后的配置项
 * @param  {Application} app 当前的应用
 * @return {Object}          返回创建的 eureka 实例
 */
function createClient(config, app) {
  assert(config.instance && config.instance.app && config.name && config.eureka && config.eureka.host && config.eureka.port,
    `[egg-naf-eureka] 'instance: ${config.instance}', 'eureka: ${config.eureka}' are required on config`);

  app.coreLogger.info('[egg-naf-eureka] create eureka client.');

  const { listen } = app.config.cluster;
  const client = new Eureka({
    // application instance information
    instance: {
      ...config.instance,
      hostName: listen.hostname || 'localhost',
      port: listen.port || 7001,
    },
    eureka: config.eureka,
  });

  if (app.type === 'agent') {
    app.beforeStart(() => {
      if (app.eureka) {
        app.eureka.start();
        app.coreLogger.info('[egg-naf-eureka] Register with Eureka & start application heartbeats!');
      }
    });

    app.beforeClose(() => {
      if (app.eureka) {
        app.eureka.stop();
        app.coreLogger.info('[egg-naf-eureka] De-register with Eureka & stop application heartbeats!');
      }
    });

  }

  return client;
}
