var datetime = require('node-datetime');
//const config = require('../../../../Config13319/config.json');
const sql = require('mssql');
const { getPool } = require('../../pools');

/* eslint-disable no-unused-vars */
exports.Sproc200221 = class Sproc200221 {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    const { $table, $limit, $skip } = params.query;
    console.log(params);
    try {
      const {
        MSSQL_USER,
        MSSQL_PASSWORD,
        MSSQL_DATABASE,
        MSSQL_SERVER
      } = process.env;
      console.log(
        `user: ${MSSQL_USER},password: ${MSSQL_PASSWORD}, database: ${MSSQL_DATABASE}, server: ${MSSQL_SERVER}`
      );
      let pool = await getPool('kors', {
        user: MSSQL_USER,
        password: MSSQL_PASSWORD,
        database: MSSQL_DATABASE,
        server: MSSQL_SERVER
      });
      /*      
      let pool = await sql.connect({
        user: MSSQL_USER,
        password: MSSQL_PASSWORD,
        database: MSSQL_DATABASE,
        server: MSSQL_SERVER
      });
      */
      /*
      let pool = await sql.connect({
        "user" : "sa",
        "password" : "S@Tsql@dmin1",
        "database" : "Kors",
        "server": "10.30.1.17"
      })
*/

      // query database
      console.log(params.query.$table);

      let resultSet = await pool
        .request()
        .query(
          `select * from ${$table} ORDER BY primary_key OFFSET ${$skip} ROWS FETCH NEXT ${$limit} ROWS ONLY`
        );
      console.dir(resultSet);
      return resultSet.recordset;
    } catch (e) {
      console.log('caught exception!', e);
    }
  }

  async get(id, params) {
    return {
      id,
      text: `A new message with ID: ${id}!`
    };
  }

  async create(data, params) {
    var result;
    console.log('in Sproc200221.create()');
    console.log(
      `table: ${data.table}, startDate: ${data.startDate}, endDate: ${data.endDate}`
    );
    try {
      // have problems with knex and this working at same time on linux
      //      let pool = await sql.connect(config.mssql)
      const {
        MSSQL_USER,
        MSSQL_PASSWORD,
        MSSQL_DATABASE,
        MSSQL_SERVER
      } = process.env;
      console.log(
        `user: ${MSSQL_USER},password: ${MSSQL_PASSWORD}, database: ${MSSQL_DATABASE}, server: ${MSSQL_SERVER}`
      );

      let pool = await getPool('kors', {
        user: MSSQL_USER,
        password: MSSQL_PASSWORD,
        database: MSSQL_DATABASE,
        server: MSSQL_SERVER
      });
/*

      let pool = await sql.connect({
        user: MSSQL_USER,
        password: MSSQL_PASSWORD,
        database: MSSQL_DATABASE,
        server: MSSQL_SERVER
      });
*/
      // query database
      const resultSet = await pool
        .request()
        .input('start_date', sql.DateTime, data.startDate)
        .input('end_date', sql.DateTime, data.endDate)
        .input('table_name', sql.VarChar(12), data.table)
        .output('record_count', sql.Int)
        .execute('Sproc200221');
      //console.log(resultSet);
      result = resultSet;
    } catch (e) {
      console.log('caught exception!', e);
    }
    //console.log(result);
    let ret;
    ret = {
      record_count: result.output.record_count,
      table: data.table
    }
    console.log(`sproc200221.class.ret: ${ret.record_count},${ret.table}`);
//    return result.output.record_count;
    return ret;
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
