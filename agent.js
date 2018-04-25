'use strict';

const eureka = require('./lib/eureka');

module.exports = agent => {
  if (agent.config.eureka) eureka(agent);
};
