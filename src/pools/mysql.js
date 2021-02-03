// https://www.npmjs.com/package/mysql
const sql = require("mysql");
const util = require("util");

//var cluster={};
//const pools={};

//PoolCluster provides multiple hosts connection. (group & retry & selector)
// https://mariadb.com/kb/en/connector-nodejs-promise-api/#createpooloptions-pool
// create
//var cluster = mysql.createPoolCluster();
//cluster.add("master", { host: 'mydb1.com', user: 'myUser', connectionLimit: 5 });

// add configurations (the config is a pool config object)
/*
poolCluster.add(config); // add configuration with automatic name
poolCluster.add('MASTER', masterConfig); // add a named configuration
poolCluster.add('SLAVE1', slave1Config);
poolCluster.add('SLAVE2', slave2Config);
*/
// https://codeburst.io/node-js-mysql-and-async-await-6fb25b01b628
// THIS IS NEEDED BECAUSE THE STANDARD NODE MYSQL DRIVER DOES NOT IMPLEMENT 
// A PROMISE INTERFACE AND THE MYSQL2 DRIVER THAT DOES IMPLEMENT THE INTERFACE
// IS MISSING CLUSTER SUPPORT AT THE TIME: 05/26/20
function makeDb(name, config) {
  var cluster = {};
  var pools = {};

  if (Object.keys(cluster).length === 0) {
    //    const createPoolCluster = util.promisify( sql.createPoolCluster);
    //    cluster = await createPoolCluster();
    console.log("before sql.createPoolCluster()");
    cluster = sql.createPoolCluster();
    // we are going to replace the original objects end method,
    // but we still want to be able to access it and have it's this
    // object point to the cluster.

    const end = cluster.end.bind(cluster);

    cluster.end = (...args) => {
      pools = {};
      // we are going to call the original end() method after we
      // delete all of the pool names from the pools array.

      return end(...args);
    };
  }
  if (!Object.prototype.hasOwnProperty.call(pools, name)) {
    console.log("before cluster.add(name,config)");
    /*
          pools.add(name, { 
            connectionLimit : 10,
            host            : KORS_SERVER,
            user            : KORS_USERNAME,
            password        : KORS_PASSWORD,
            database        : KORS_DATABASE
          });
          */
    cluster.add(name, config); // add a named pool
    pools[name] = name; // keep track of all named pools
  }
  //        var pool = cluster.of(name);  //return the specific pool

  //        return pool;
  //      }
  return {
    query(sql, args) {
      // console.log(`before query => sql = ${sql}, args= ${args}`);

      return util
        .promisify(cluster.of(name).query)
        .call(cluster.of(name), sql, args);
    },
    end() {
      return util.promisify(cluster.end).call(cluster);
    },
  };
}
/*
function query(sql,args) {
  return util.promisify( pool.query)
  .call(pool,sql,args);
}
*/
/*
const someRows = await query( 'select Data_hour AS solution from HourlyOEEValues' );
console.log('The solution is: ', someRows);

function makeDb( config ) {
  const connection = mysql.createConnection( config );
  return {
    query( sql, args ) {
      return util.promisify( connection.query )
        .call( connection, sql, args );
    },
    close() {
      return util.promisify( connection.end ).call( connection );
    }
  };
}
*/
/*
async function getPool(name, config) {

  if (Object.keys(cluster).length === 0){
    cluster = sql.createPoolCluster();
    const end = cluster.end.bind(cluster)

    cluster.end = (...args) => {
      pools={};
      return end(...args);
    };
  }

  if (!Object.prototype.hasOwnProperty.call(pools, name)) {
    cluster.add(name,config); // add a named pool
    pools[name] = name;  // keep track of all named pools
  }
  var pool = cluster.of(name);  //return the specific pool

  return pool;
}

// close all pools
function closeAll() {
  if (typeof cluster === 'object')
  {
    // close all connections
    cluster.end(function(err) {
      // all connections in the pool cluster have ended
      console.log("all connection in cluster have ended");
    });
  }
}

module.exports = {
  closeAll,
  getPool
};
*/

module.exports = {
  makeDb,
};
