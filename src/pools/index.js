const sql = require('mssql');

const pools = {};

// manage a set of pools by name (config will be required to create the pool)
// a pool will be removed when it is closed
//https://www.npmjs.com/package/mssql#connection-pools
async function getPool(name, config) {
  if (!Object.prototype.hasOwnProperty.call(pools, name)) {
    const pool = new sql.ConnectionPool(config);
    // we are going to replace the original objects close method,
    // but we still want to be able to access it and have it's this
    // object point to the pool
    const close = pool.close.bind(pool);
    // close is an existing method of a connection pool and we are overwriting it.
    // the closure will have access to the pools module level object
    pool.close = (...args) => {
      delete pools[name];
      // we are going to call the original close() method after we 
      // delect the name of the pool in the pools array.
      return close(...args);
    };
    await pool.connect();
    pools[name] = pool;
  }
  return pools[name];
}

// close all pools
function closeAll() {
  return Promise.all(Object.values(pools).map((pool) => {
    return pool.close();
  }));
}

module.exports = {
  closeAll,
  getPool
};