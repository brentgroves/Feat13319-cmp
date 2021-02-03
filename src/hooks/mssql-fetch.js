// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
//https://github.com/feathersjs-ecosystem/feathers-sequelize#working-with-mssql
//https://docs.feathersjs.com/api/databases/querying.html#or
/* eslint-disable require-atomic-updates */

module.exports = function (options = {}) {
//  console.log("Hook before find");
  return async context => {
    const { query = {} } = context.params;
    // Sort by id field ascending (or any other property you want)
    // See https://docs.feathersjs.com/api/databases/querying.html#sort
    const $sort = { id: 1 };

    context.params.query = {
      $sort: {
        id:1  // Don't know if this can be overridden with explicit param in find()
        // This is needed for HTTP request that does not include a sort option.
        //https://github.com/feathersjs-ecosystem/feathers-sequelize#working-with-mssql
        // Probably don't need this as long as we include a sort option in find()
      },
      ...query
    }
//    console.log(`query: ${context.params.query}`)
    return context;
  }
}

/*
app.service('messages').find({
  query: {
    $limit: 10,
    $sort: {
      createdAt: -1
    }
  }
});
*/
