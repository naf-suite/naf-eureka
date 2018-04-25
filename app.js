'use strict';

const eureka = require('./lib/eureka');

module.exports = app => {
  if (app.config.eureka) eureka(app);
};
