const GenTableName = require('../../hooks/GenTableName');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [GenTableName()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
