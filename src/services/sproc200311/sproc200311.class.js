const sql = require('mssql');
const { getPool } = require('../../pools');


/* eslint-disable no-unused-vars */
exports.Sproc200311 = class Sproc200311 {
  constructor (options) {
    this.options = options || {};
  }

  async find(params) {
    const { $table, $limit, $skip } = params.query;
    console.log(params);
    try {
      /*      
      const {
        MSSQL_USER,
        MSSQL_PASSWORD,
        MSSQL_DATABASE,
        MSSQL_SERVER
      } = process.env;
      console.log(
        `user: ${MSSQL_USER},password: ${MSSQL_PASSWORD}, database: ${MSSQL_DATABASE}, server: ${MSSQL_SERVER}`
      );
 
      let pool = await sql.connect({
        user: MSSQL_USER,
        password: MSSQL_PASSWORD,
        database: MSSQL_DATABASE,
        server: MSSQL_SERVER
      });
      */
     let pool = await getPool('cm', {
      user : 'sa',
      password : 'buschecnc1',
      database : 'cribmaster',
      server : '10.1.2.17'
    });
     /*
      let pool = await sql.connect({
        user : 'sa',
        password : 'buschecnc1',
        database : 'cribmaster',
        server : '10.1.2.17'
      });
      */
      console.log('after connect to 10.1.2.17')
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
