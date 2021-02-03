// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
var datetime = require('node-datetime');
var nextTableNumber = 0

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data } = context;
    const dateTime = datetime.create();
    const md = dateTime.format('md');
    const tableNumber = nextTableNumber++;
    const table = "rpt" + md + tableNumber;

    var newData = {
      ...data,
      table
    };
    context.data = newData;

    return context;
  };
};
