const mariadb = require("mariadb");
//var jstz = require('jstz');
//var moment = require('moment');

const {
  KORS_SERVER,
  KORS_USERNAME,
  KORS_PASSWORD,
  KORS_DATABASE,
} = process.env;

const pool = mariadb.createPool( {
  connectionLimit: 5,
  multipleStatements: true,
  host: KORS_SERVER,
  user: KORS_USERNAME,
  password: KORS_PASSWORD,
  database: KORS_DATABASE,
});

/* eslint-disable no-unused-vars */
exports.Maria200206 = class Maria200206 {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    let rows;
    let conn;
    const { $table, $limit, $skip } = params.query;
//    console.log(`params.query.$table=>${params.query.$table}`);
    try {
      // console.log(`user: ${KORS_USERNAME},password: ${KORS_PASSWORD}, database: ${KORS_DATABASE}, server: ${KORS_SERVER}`);
      conn = await pool.getConnection();      
      rows = await conn.query(`select * from ${$table} ORDER BY primary_key LIMIT ${$limit} OFFSET ${$skip}`);
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

  async create (data, params) {
    let ret;
    let conn;
    //console.log(`user: ${KORS_USERNAME},password: ${KORS_PASSWORD}, database: ${KORS_DATABASE}, hostname: ${KORS_SERVER}`);
//    let startDate = data.startDate.toISOString();
//    let endDate = data.endDate.toISOString();
//    console.log(`before request(), table: ${data.table}, startDate: ${startDate}, endDate: ${endDate}` );
    console.log(`before request(), table: ${data.table}, startDate: ${data.startDate}, endDate: ${data.endDate}` );
    try {
      conn = await pool.getConnection();      
      const someRows = await conn.query('call Sproc200206(?,?,?,@pRecordCount); select @pRecordCount as pRecordCount',[data.startDate,data.endDate,data.table]);
      //console.log("The solution is: ", someRows[1][0].pRecordCount);
      ret = {
        record_count: someRows[1][0].pRecordCount,
        table: data.table
      };
    } catch (err) {
      // handle the error
      console.log(`Error =>${err}`);
    } finally {
      if (conn) conn.release(); //release to pool
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
