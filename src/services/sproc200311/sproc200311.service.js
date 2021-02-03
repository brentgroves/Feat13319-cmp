// Initializes the `sproc200311` service on path `/sproc200311`
const { Sproc200311 } = require('./sproc200311.class');
const hooks = require('./sproc200311.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/sproc200311', new Sproc200311(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('sproc200311');

  service.hooks(hooks);
};
