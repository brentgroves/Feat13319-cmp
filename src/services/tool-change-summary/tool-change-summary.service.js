// Initializes the `ToolChangeSummary` service on path `/tool-change-summary`
const { ToolChangeSummary } = require('./tool-change-summary.class');
const hooks = require('./tool-change-summary.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/tool-change-summary', new ToolChangeSummary(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('tool-change-summary');

  service.hooks(hooks);
};
