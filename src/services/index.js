const users = require('./users/users.service.js');
const sproc200206 = require('./sproc200206/sproc200206.service.js');
const sproc200221 = require('./sproc200221/sproc200221.service.js');
const sproc200311 = require('./sproc200311/sproc200311.service.js');
const mysql200206 = require('./mysql200206/mysql200206.service.js');
const mysql200221 = require('./mysql200221/mysql200221.service.js');
const maria200206 = require('./maria200206/maria200206.service.js');
const maria200221 = require('./maria200221/maria200221.service.js');
const kep13319 = require('./kep13319/kep13319.service.js');
const compareContainer = require('./compare-container/compare-container.service.js');
const partProdRate = require('./part-prod-rate/part-prod-rate.service.js');
const upcomingToolChanges = require('./upcoming-tool-changes/upcoming-tool-changes.service.js');
const toolChangeSummary = require('./tool-change-summary/tool-change-summary.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(sproc200206);
  app.configure(sproc200221);
  app.configure(sproc200311);
  app.configure(mysql200206);
  app.configure(mysql200221);
  app.configure(maria200206);
  app.configure(maria200221);
  app.configure(kep13319);
  app.configure(compareContainer);
  app.configure(partProdRate);
  app.configure(upcomingToolChanges);
  app.configure(toolChangeSummary);
};
/*
module.exports = function (app) {
  app.configure(users);
  app.configure(messages);
  app.configure(test);
  app.configure(mstest);
  app.configure(myhourlyoeevalues);
  app.configure(hourlyoeevalues);
  app.configure(sproc200206);
};

*/
