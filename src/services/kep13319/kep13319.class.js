const config = require('../../../config/config.json');
const common = require('@bgroves/common');

/* eslint-disable no-unused-vars */
exports.Kep13319 = class Kep13319 {
  constructor(options) {
    this.options = options || {};
    this.messages =[];
  }

  async find(params) {
  //  return this.nodes;

    return config.nodes;
  }
  async update (updateId, data, params) {
    //let msg = JSON.stringify(data);
    common.log(`Feat13319.Kep13319.update: updateId=${updateId}, data.value=${data.value}, date.transDate=${data.transDate}`);
    var foundIndex = config.nodes.findIndex(node => node.updateId == updateId);
    config.nodes[foundIndex].value = data.value;
    config.nodes[foundIndex].transDate=data.transDate;
    // BUG Fix: updateId is not the same as index.
    // config.nodes[id].value=data.value;
    // config.nodes[id].transDate=data.transDate;
    return data;
  }
/* 
I DONT WANT TO USE CREATE BECAUSE I WANT TO BE KNOW THE INDEX OF
EVERY ARRAY ELEMENT SO IT CAN BE QUICKLY REPLACED WITH NEW
DATA USING THE UPDATE METHOD
*/
  async create(data) {
    // The new message is the data merged with a unique identifier
    // using the messages length since it changes whenever we add one
    const message = {
      id: this.messages.length,
      text: data.text,
    };
    // Add new message to the list
    this.messages.push(message);

    return message;
  }
};
/*
class Kep13318 {
  constructor() {
    this.messages = [];
  }

  async find() {
    // Just return all our messages
    return this.messages;
  }

  async create(data) {
    // The new message is the data merged with a unique identifier
    // using the messages length since it changes whenever we add one
    const message = {
      id: this.messages.length,
      text: data.text,
    };

    // Add new message to the list
    this.messages.push(message);

    return message;
  }
}

NOT IMPLEMENTED
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


*/
