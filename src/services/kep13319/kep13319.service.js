// Initializes the `kep13319` service on path `/kep13319`
const { Kep13319 } = require('./kep13319.class');
const hooks = require('./kep13319.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/kep13319', new Kep13319(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('kep13319');

  service.hooks(hooks);
};
