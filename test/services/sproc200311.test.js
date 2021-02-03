const assert = require('assert');
const app = require('../../src/app');

describe('\'sproc200311\' service', () => {
  it('registered the service', () => {
    const service = app.service('sproc200311');

    assert.ok(service, 'Registered the service');
  });
});
