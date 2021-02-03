var datetime = require("node-datetime");
//const config = require('../../../../Config13319/config.json');
const sql = require("mssql");
const { getPool } = require("../../pools");
const common = require('@bgroves/common');


/* eslint-disable no-unused-vars */
exports.Sproc200206 = class Sproc200206 {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    const { $table, $limit, $skip } = params.query;
    common.log(params);
    try {
      /*
      - MSSQL_USER=$MSSQL_USER
      - MSSQL_PASSWORD=$MSSQL_PASSWORD
      - MSSQL_DATABASE=$MSSQL_DATABASE
      - MSSQL_SERVER=$MSSQL_SERVER

*/

      const {
        MSSQL_USER,
        MSSQL_PASSWORD,
        MSSQL_DATABASE,
        MSSQL_SERVER,
      } = process.env;
      common.log(
        `user: ${MSSQL_USER},password: ${MSSQL_PASSWORD}, database: ${MSSQL_DATABASE}, server: ${MSSQL_SERVER}`
      );

      let pool = await getPool("kors", {
        user: MSSQL_USER,
        password: MSSQL_PASSWORD,
        database: MSSQL_DATABASE,
        server: MSSQL_SERVER,
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
      common.log(params.query.$table);

      let resultSet = await pool
        .request()
        .query(
          `select * from ${$table} ORDER BY primary_key OFFSET ${$skip} ROWS FETCH NEXT ${$limit} ROWS ONLY`
        );
      console.dir(resultSet);
      return resultSet.recordset;
    } catch (e) {
      common.log("caught exception!", e);
    }
  }

  async get(id, params) {
    return {
      id,
      text: `A new message with ID: ${id}!`,
    };
  }

  async create(data, params) {
    var result;
    common.log("in Sproc200206.create()");
    const startDate = "2020-02-09T00:00:00";
    const endDate = "2020-02-10T23:59:59";
    common.log(
      `table: ${data.table}, startDate: ${data.startDate}, endDate: ${data.endDate}`
    );

    try {
      // have problems with knex and this working at same time on linux
      //      let pool = await sql.connect(config.mssql)
      const {
        MSSQL_USER,
        MSSQL_PASSWORD,
        MSSQL_DATABASE,
        MSSQL_SERVER,
      } = process.env;
      common.log(
        `user: ${MSSQL_USER},password: ${MSSQL_PASSWORD}, database: ${MSSQL_DATABASE}, server: ${MSSQL_SERVER}`
      );
      let pool = await getPool("kors", {
        user: MSSQL_USER,
        password: MSSQL_PASSWORD,
        database: MSSQL_DATABASE,
        server: MSSQL_SERVER,
      });
      // query database
      common.log(
        `before request(), table: ${data.table}, startDate: ${data.startDate}, endDate: ${data.endDate}`
      );
      /*
      common.log('list params');
      common.log(Object.getOwnPropertyNames(params)); 
      common.log('list data');
      common.log(Object.getOwnPropertyNames(data));
      */
      const resultSet = await pool
        .request()
        .input("start_date", sql.DateTime, data.startDate)
        .input("end_date", sql.DateTime, data.endDate)
        .input("table_name", sql.VarChar(12), data.table)
        .output("record_count", sql.Int)
        .execute("Sproc200206");
      common.log(
        `after request(), table: ${data.table}, startDate: ${data.startDate}, endDate: ${data.endDate}`
      );
      //common.log(resultSet);
      result = resultSet;
    } catch (e) {
      common.log("caught exception!", e);
    }
    //common.log(result);
    let ret;
    ret = {
      record_count: result.output.record_count,
      table: data.table,
    };
    common.log(`sproc200206.class.ret: ${ret.record_count},${ret.table}`);
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
