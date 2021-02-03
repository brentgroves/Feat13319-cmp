// Initializes the `PartProdRate` service on path `/part-prod-rate`
const { PartProdRate } = require('./part-prod-rate.class');
const hooks = require('./part-prod-rate.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/part-prod-rate', new PartProdRate(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('part-prod-rate');

  service.hooks(hooks);
};
