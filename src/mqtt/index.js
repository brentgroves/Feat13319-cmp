const mqtt = require('mqtt');
// const config = require('./config.json');
const common = require('@bgroves/common');

var { MQTT_SERVER } = process.env;

module.exports = function (app) {
  common.log(`Feat13319=>MQTT_SERVER=${MQTT_SERVER}`);
  const mqttClient = mqtt.connect(`mqtt://${MQTT_SERVER}`);

  mqttClient.on('connect', function () {
    mqttClient.subscribe('Kep13319', function (err) {
      if (!err) {
        common.log('Feat13319 subscribed to: Kep13319');
      }
    });
  });
  // message is a buffer
  mqttClient.on('message', function (topic, message) {
    const p = JSON.parse(message.toString()); // payload is a buffer
    common.log(`Feat13319.mqtt=>${p}`);
    // let msg;
    if ('Kep13319' == topic) {
      app
        .service('kep13319')
        .update(p.updateId, { updateId:p.updateId,value: p.value,transDate: p.transDate })
        .then(async (res) => {
          common.log(`updated kep13319 updateId=${p.updateId}, value=${p.value}. transDate=${p.transDate}`);
        })
        .catch((e) => {
          console.error('Authentication error', e);
        });
    }
  });
};
/*
app
  .service('users')
  .create({
    email: 'user@buschegroup.com',
    password: 'password',
    userName: 'bgroves',
    firstName: 'Brent',
    lastName: 'Groves',
    isAdmin: true,
    roles: ['Admin', 'Manager', 'Quality']
  })
  .then(async res => {
    console.log('created user!');
  })
  .catch(e => {
    console.error('Authentication error', e);
  });
*/
