const assert = require('assert');
const app = require('../../src/app');

describe('\'PartProdRate\' service', () => {
  it('registered the service', () => {
    const service = app.service('part-prod-rate');

    assert.ok(service, 'Registered the service');
  });
});
