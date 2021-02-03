const assert = require('assert');
const app = require('../../src/app');

describe('\'mstest\' service', () => {
  it('registered the service', () => {
    const service = app.service('mstest');

    assert.ok(service, 'Registered the service');
  });
});
