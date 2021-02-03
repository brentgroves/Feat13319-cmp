const assert = require('assert');
const app = require('../../src/app');

describe('\'myhourlyoeevalues\' service', () => {
  it('registered the service', () => {
    const service = app.service('myhourlyoeevalues');

    assert.ok(service, 'Registered the service');
  });
});
