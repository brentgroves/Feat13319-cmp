const assert = require('assert');
const app = require('../../src/app');

describe('\'sproc200221\' service', () => {
  it('registered the service', () => {
    const service = app.service('sproc200221');

    assert.ok(service, 'Registered the service');
  });
});
