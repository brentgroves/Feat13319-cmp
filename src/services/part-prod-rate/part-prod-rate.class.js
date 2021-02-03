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
exports.PartProdRate = class PartProdRate {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    let ret;
    let conn;
    const { $limit, $skip, $startPeriod, $endPeriod } = params.query;
    try {
      conn = await pool.getConnection();
      const someRows = await conn.query(
        'call PartProdRateFetch(?,?,?,?,@pRecordCount); select @pRecordCount as pRecordCount',
        [$startPeriod, $endPeriod, $limit, $skip]
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

  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
};
