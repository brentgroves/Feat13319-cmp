// Initializes the `UpcomingToolChanges` service on path `/upcoming-tool-changes`
const { UpcomingToolChanges } = require('./upcoming-tool-changes.class');
const hooks = require('./upcoming-tool-changes.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/upcoming-tool-changes', new UpcomingToolChanges(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('upcoming-tool-changes');

  service.hooks(hooks);
};
