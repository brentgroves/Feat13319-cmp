const mqtt = require('mqtt');
//const mysql = require('mysql2/promise');
var datetime = require('node-datetime');
const config = require('../../../config/config.json');
const sql = require('mssql');
/* eslint-disable no-unused-vars */
exports.Sproc200206 = class Sproc200206 {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    return [];
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    console.log("in Sproc200206.create()");
    const mysql = require('mysql');
    const transDate ="2019-12-15 09:00";
    // create the connection
    // query database
    try {
//      const [rows, fields] = await c.query('show databases');
//      const c = await mysql.createConnection(config.Database);
      // get the client
      const mysql = require('mysql2/promise');
      // create the connection
      const connection = await mysql.createConnection(config.Database);
      // query database
      const [resultSet, fields] = await connection.query('CALL DS13318(?)',[transDate]);
      //console.log(rows[0][1]);
      resultSet[0].forEach(function(item, index) {
        // Update GMT time to local time.
        var tz_transDate = item.TransDate;
        var pastDateTime = datetime.create(tz_transDate);
        var fmt = pastDateTime.format('Y-m-d H:M:S');
        item.TransDate=fmt;
        console.log(item, index);
      });


//      const [rows, fields] = await c.query('CALL DS13318(?)', [transDate]);
  //    console.log(`Data received from Db on ${transDate}:\n`);
    } catch (e) {
      console.log('caught exception!', e);
    }
    // create the connection to database
    // create the connection to database
    /*
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'test'
    });
    "Database": {
      "host": "localhost",
      "user": "brent",
      "password": "JesusLives1!",
      "insecureAuth": true,
      "database": "mach2"
    },
    */
/*
    con.connect(function(err) {
      if (err) throw err;

      // https://www.sitepoint.com/using-node-mysql-javascript-client/
      // con.query(`select * from DS13318`,function(err, resultSet){
      // con.query(`CALL DS13318("2019-12-15 09:00")`,function(err, rows){
      // con.query(`CALL DS13318('${transDate}')`,function(err, resultSet){
      con.query('CALL DS13318(?)', [transDate], function(err, resultSet) {
        if (err) throw err;
        console.log(`Data received from Db on ${transDate}:\n`);
        // console.log(resultSet[0][1]);
        resultSet[0].forEach(function(item, index) {
          // Update GMT time to local time.
          var tz_transDate = item.TransDate;
          var pastDateTime = datetime.create(tz_transDate);
          var fmt = pastDateTime.format('Y-m-d H:M:S');
          item.TransDate=fmt;
          // console.log(item, index);
        });
        console.log(resultSet[0]);
        let msgString = JSON.stringify(resultSet[0]);
        console.log(msgString);
        //const obj = JSON.parse(msgString); // payload is a buffer
        const obj = JSON.parse(msgString.toString()); // payload is a buffer
        console.log(obj);
        let rec0 = obj[0].TransDate;
        console.log(`Record 0 => ${rec0} `);

        //mqttClient.publish('Sproc13318', msgString);
      });
    });
*/
  //  console.log(`data=${data}`);
  //  console.log(`params=${params}`);
  /* USE THIS IF YOU WANT SOME OTHER APP TO CREATE RECORD
    let mqttClient = mqtt.connect(config.MQTT);
    let msg = {
      startDate: data.startDate,
      endDate: data.endDate
    };
    let msgString = JSON.stringify(msg);
    console.log(msg);
    mqttClient.publish('Sproc200206', msgString);
    */
/*
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
    */
    return {res:'Ok'}
    //
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
