const assert = require('assert');
const app = require('../../src/app');

describe('\'hourlyoeevalues\' service', () => {
  it('registered the service', () => {
    const service = app.service('hourlyoeevalues');

    assert.ok(service, 'Registered the service');
  });
});
