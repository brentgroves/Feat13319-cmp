// Initializes the `mysql200221` service on path `/mysql200221`
const { Mysql200221 } = require('./mysql200221.class');
const hooks = require('./mysql200221.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/mysql200221', new Mysql200221(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('mysql200221');

  service.hooks(hooks);
};
