// Initializes the `maria200206` service on path `/maria200206`
const { Maria200206 } = require('./maria200206.class');
const hooks = require('./maria200206.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/maria200206', new Maria200206(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('maria200206');

  service.hooks(hooks);
};
