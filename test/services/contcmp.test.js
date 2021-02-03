const assert = require('assert');
const app = require('../../src/app');

describe('\'contcmp\' service', () => {
  it('registered the service', () => {
    const service = app.service('contcmp');

    assert.ok(service, 'Registered the service');
  });
});
