const mariadb = require('mariadb');
const common = require('@bgroves/common');

const {
  MYSQL_HOSTNAME,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = process.env;
/*
const MQTT_SERVER='localhost';
const MYSQL_HOSTNAME= "localhost";
const MYSQL_USERNAME= "brent";
const MYSQL_PASSWORD= "JesusLives1!";
const MYSQL_DATABASE= "mach2";
*/
const connectionString = {
  connectionLimit: 5,
  multipleStatements: true,
  host: MYSQL_HOSTNAME,
  user: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
};

common.log(
  `user: ${MYSQL_USERNAME},password: ${MYSQL_PASSWORD}, database: ${MYSQL_DATABASE}, MYSQL_HOSTNAME: ${MYSQL_HOSTNAME}`
);

const pool = mariadb.createPool(connectionString);

/* eslint-disable no-unused-vars */
exports.CompareContainer = class CompareContainer {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    let ret;
    let conn;
    const { $limit, $skip, $startDate, $endDate } = params.query;
    try {
      conn = await pool.getConnection();
      const someRows = await conn.query(
        'call CompareContainerFetch(?,?,?,?,@pRecordCount); select @pRecordCount as pRecordCount',
        [$startDate, $endDate, $limit, $skip]
      );
      // common.log(`someRows[0] =>${someRows[0]}`);
      // common.log(`someRows[1] =>${someRows[1]}`);
      // common.log(`someRows[2] =>${someRows[2]}`);
      ret = {
        record_count: someRows[2][0].pRecordCount,
        data: someRows[0],
      };
    } catch (err) {
      // handle the error
      common.log(`Error =>${err}`);
    } finally {
      if (conn) {
        conn.release(); //release to pool
      }
    }
    return ret;

    /*
    const startDate = '2020-07-09 11:30:00';
    const endDate = '2020-07-09 15:30:00';
    let rows;
    let conn;
    const { $limit, $skip, $startDate, $endDate } = params.query;
    //    common.log(`start of find: ${params}`);
    //    common.log(`JSON.stringify: ${JSON.stringify(params.query)}`);
    // common.log(`params.query.$table=>${params.query.$table}`);
    try {
      common.log(`CompareContainer=> startDate: ${$startDate}, endDate: ${$endDate}, limit: ${$limit},offset: ${$skip}`);
      const sql = `select * from CompareContainer where transDate between '${$startDate}' and '${$endDate}' ORDER BY CompareContainer_Key LIMIT ${$limit} OFFSET ${$skip}`;
      common.log(`sql=>${sql}`);
      conn = await pool.getConnection();      
      rows = await conn.query(sql);
      // common.log(rows); //[ {val: 1}, meta: ... ]
    } catch (e) {
      common.log(`caught exception! ${e}`);
    } finally {
      if (conn) conn.release(); //release to pool
    }
    return rows;
    */
  }

  async get(id, params) {
    return {
      id,
      text: `A new message with ID: ${id}!`,
    };
  }

  async create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map((current) => this.create(current, params)));
    }

    return data;
  }

  async update(id, data, params) {
    return data;
  }

  async patch(id, data, params) {
    return data;
  }

  async remove(id, params) {
    return { id };
  }
};
