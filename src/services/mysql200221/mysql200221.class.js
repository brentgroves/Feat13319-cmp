const { makeDb } = require("../../pools/mysql");

const {
  KORS_SERVER,
  KORS_USERNAME,
  KORS_PASSWORD,
  KORS_DATABASE,
} = process.env;

/* eslint-disable no-unused-vars */
exports.Mysql200221 = class Mysql200221 {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    let someRows;
    const { $table, $limit, $skip } = params.query;
    console.log(`start of find: ${params}`);
    console.log(`JSON.stringify: ${JSON.stringify(params.query)}`);
    const db = makeDb("Kors", {
      connectionLimit: 10,
      multipleStatements: true,
      host: KORS_SERVER,
      user: KORS_USERNAME,
      password: KORS_PASSWORD,
      database: KORS_DATABASE,
    });  
    try {
 
      someRows = await db.query(`select * from ${$table} ORDER BY primary_key LIMIT ${$limit} OFFSET ${$skip}`);
      console.log("The solution is: ", someRows);
//      console.log("The solution is: ", JSON.stringify(someRows[0]));
//      console.log("The solution is: ", someRows[0].fieldCount);  // 0
//      console.log("The solution is: ", someRows[0].OkPacket);  //undefined
      //      console.log("The solution is: ", someRows[1][0].@pRecordCount);
//      console.log("The solution is: ", someRows[0].solution);

      // do something with someRows and otherRows
    } catch (err) {
      // handle the error
      console.log(`Error =>${err}`);
    } finally {
      console.log("In query finally");
      //  await db.close();
    }
    return someRows;
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    const {
      KORS_SERVER,
      KORS_USERNAME,
      KORS_PASSWORD,
      KORS_DATABASE,
    } = process.env;
    console.log(
      `user: ${KORS_USERNAME},password: ${KORS_PASSWORD}, database: ${KORS_DATABASE}, hostname: ${KORS_SERVER}`
    );
    console.log(
      `before request(), table: ${data.table}, startDate: ${data.startDate}, endDate: ${data.endDate}`
    );

    const db = makeDb("Kors", {
      connectionLimit: 10,
      multipleStatements: true,
      host: KORS_SERVER,
      user: KORS_USERNAME,
      password: KORS_PASSWORD,
      database: KORS_DATABASE,
    });
    var ret;
    try {
      /*
      const someRows = await db.query(
        "select Data_hour AS solution from HourlyOEEValues"
      );
      */
      //   const otherRows = await db.query( 'SELECT * FROM other_table' );
      //var pRecordCount = 1;
      const someRows = await db.query('call Sproc200221(?,?,?,@pRecordCount); select @pRecordCount as pRecordCount',[data.startDate,data.endDate,data.table]);
//      const someRows = await db.query('call Sproc200221("2020-03-01 00:00:00","2020-04-04 23:59:59", "TempTable",@pRecordCount); select @pRecordCount as pRecordCount');
      console.log("The solution is: ", someRows[1][0].pRecordCount);
//      console.log("The solution is: ", someRows[0].solution);
      ret = {
        record_count: someRows[1][0].pRecordCount,
        table: data.table
      };
      // do something with someRows and otherRows
    } catch (err) {
      // handle the error
      console.log(`Error =>${err}`);
    } finally {
      console.log("In query finally");
      console.log("The ret is: ", ret);

      //  await db.close();
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
