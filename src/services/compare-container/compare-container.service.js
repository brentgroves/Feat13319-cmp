// Initializes the `CompareContainer` service on path `/CompareContainer`
const { CompareContainer } = require('./compare-container.class');
const hooks = require('./compare-container.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/CompareContainer', new CompareContainer(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('CompareContainer');

  service.hooks(hooks);
};
