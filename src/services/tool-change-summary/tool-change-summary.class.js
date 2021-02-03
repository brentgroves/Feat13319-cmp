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
exports.ToolChangeSummary = class ToolChangeSummary {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    let rows;
    let conn;
    const { $table, $limit, $skip } = params.query;
    //    console.log(`start of find: ${params}`);
    //    console.log(`JSON.stringify: ${JSON.stringify(params.query)}`);
    // console.log(`params.query.$table=>${params.query.$table}`);
    try {
      // console.log(`user: ${KORS_USERNAME},password: ${KORS_PASSWORD}, database: ${KORS_DATABASE}, server: ${KORS_SERVER}`);
      conn = await pool.getConnection();      
      rows = await conn.query(
        `select * from ${$table} LIMIT ${$limit} OFFSET ${$skip}`
      );
      // console.log(rows); //[ {val: 1}, meta: ... ]
    } catch (e) {
      console.log("caught exception!", e);
    } finally {
      if (conn) conn.release(); //release to pool
    }
    return rows;

  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }
/*
	pStartDate DATETIME,
	pEndDate DATETIME,
	pTableName varchar(12),
	OUT pRecordCount INT,
	OUT pReturnValue INT
*/
  async create (data, params) {
    let ret;
    let conn;
    common.log(
      `table: ${data.table}, startDate: ${data.startDate}, endDate: ${data.endDate}`
    );

    try {
      conn = await pool.getConnection();
      const resultSet = await conn.query(
        'call CreateToolChangeSummary(?,?,?,@recordCount,@returnValue); select @recordCount as recordCount, @returnValue as returnValue',
        [data.startDate, data.endDate,data.table]
      );
      // console.log("The solution is: ", someRows[1][0].pRecordCount);
      ret = {
        record_count: resultSet[1][0].recordCount,
        table: data.table,
        return_value: resultSet[1][0].returnValue
      };
    } catch (err) {
      // handle the error
      console.log(`Error =>${err}`);
    } finally {
      if (conn) {
        conn.release(); //release to pool
        // console.log(`In finally=>released connection`);
      }
    }
    return ret;
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
