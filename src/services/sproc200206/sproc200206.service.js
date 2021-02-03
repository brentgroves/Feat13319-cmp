// Initializes the `sproc200206` service on path `/sproc200206`
const { Sproc200206 } = require('./sproc200206.class');
const hooks = require('./sproc200206.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/sproc200206', new Sproc200206(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('sproc200206');

  service.hooks(hooks);
};
