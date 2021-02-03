const assert = require('assert');
const app = require('../../src/app');

describe('\'maria200206\' service', () => {
  it('registered the service', () => {
    const service = app.service('maria200206');

    assert.ok(service, 'Registered the service');
  });
});
