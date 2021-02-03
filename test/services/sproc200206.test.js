const assert = require('assert');
const app = require('../../src/app');

describe('\'sproc200206\' service', () => {
  it('registered the service', () => {
    const service = app.service('sproc200206');

    assert.ok(service, 'Registered the service');
  });
});
