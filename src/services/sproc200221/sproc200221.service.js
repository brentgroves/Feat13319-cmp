// Initializes the `sproc200221` service on path `/sproc200221`
const { Sproc200221 } = require('./sproc200221.class');
const hooks = require('./sproc200221.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/sproc200221', new Sproc200221(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('sproc200221');

  service.hooks(hooks);
};
