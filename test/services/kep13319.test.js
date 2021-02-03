const assert = require('assert');
const app = require('../../src/app');

describe('\'kep13319\' service', () => {
  it('registered the service', () => {
    const service = app.service('kep13319');

    assert.ok(service, 'Registered the service');
  });
});
