'use strict';

const mock = require('egg-mock');

describe('test/naf-eureka.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/naf-eureka-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, eureka')
      .expect(200);
  });
});
