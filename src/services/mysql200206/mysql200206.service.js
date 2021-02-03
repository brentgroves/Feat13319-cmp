// Initializes the `mysql200206` service on path `/mysql200206`
const { Mysql200206 } = require('./mysql200206.class');
const hooks = require('./mysql200206.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/mysql200206', new Mysql200206(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('mysql200206');

  service.hooks(hooks);
};

