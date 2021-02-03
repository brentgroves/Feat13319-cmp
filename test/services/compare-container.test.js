const assert = require('assert');
const app = require('../../src/app');

describe('\'CompareContainer\' service', () => {
  it('registered the service', () => {
    const service = app.service('CompareContainer');

    assert.ok(service, 'Registered the service');
  });
});
