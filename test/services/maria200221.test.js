const assert = require('assert');
const app = require('../../src/app');

describe('\'maria200221\' service', () => {
  it('registered the service', () => {
    const service = app.service('maria200221');

    assert.ok(service, 'Registered the service');
  });
});
