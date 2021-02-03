const assert = require('assert');
const app = require('../../src/app');

describe('\'ToolChangeSummary\' service', () => {
  it('registered the service', () => {
    const service = app.service('tool-change-summary');

    assert.ok(service, 'Registered the service');
  });
});
