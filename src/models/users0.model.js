var datetime = require('node-datetime');
// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class users extends Model {

  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['password'],

      properties: {

        email: { type: ['string', 'null'] },
        password: 'string',
        userName: 'string',
        firstName: 'string',
        lastName: 'string',
        isAdmin: 'boolean',
        roles: {
          type: 'array',
          maxItems: 3,
          items: { type: 'string' }
        }
      }
    };
  }

  $beforeInsert() {
//    this.createdAt = this.updatedAt = new Date().toISOString();
//    this.createdAt = this.updatedAt = new Date().toISOString();
       var dt = datetime.create();
        var createdAt = dt.format('Y-m-d H:M:S');
       this.createdAt = this.updatedAt = createdAt;

  }

  $beforeUpdate() {
//    this.updatedAt = new Date().toISOString();
       var dt = datetime.create();
        var updatedAt = dt.format('Y-m-d H:M:S');
    this.updatedAt = updatedAt;
  }
}
/*
MySql Notes
https://stackoverflow.com/questions/36882149/error-1067-42000-invalid-default-value-for-created-at
-- took out NO_ZERO_IN_DATE,NO_ZERO_DATE  because when creating a model with knex and two timestamp columns this setting gives an erro
-- can be set from dbeaver
set global sql_mode = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';

-- does not work with feathers knex.
--set global sql_mode = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION


*/
module.exports = function (app) {
  const db = app.get('knex');

  db.schema.hasTable('users').then(exists => {
    if (!exists) {
      db.schema.createTable('users', table => {
        table.increments('id');

        table.string('email').unique();
        table.string('password');
        table.string('userName');
        table.string('firstName');
        table.string('lastName');
        table.boolean('isAdmin');
        //table.string('roles');  mssql
        table.json('roles'); // mysql
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log('Created users table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating users table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error creating users table', e)); // eslint-disable-line no-console

  return users;
};
