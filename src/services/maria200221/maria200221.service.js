// Initializes the `maria200221` service on path `/maria200221`
const { Maria200221 } = require('./maria200221.class');
const hooks = require('./maria200221.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/maria200221', new Maria200221(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('maria200221');

  service.hooks(hooks);
};
