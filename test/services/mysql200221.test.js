const assert = require('assert');
const app = require('../../src/app');

describe('\'mysql200221\' service', () => {
  it('registered the service', () => {
    const service = app.service('mysql200221');

    assert.ok(service, 'Registered the service');
  });
});
