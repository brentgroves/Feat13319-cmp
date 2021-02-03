/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');

const port = process.env.FEATHERS_PORT;
const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Feathers application started on port %d', port)
);

// TEST ONLY SECTION
/*
app.
  service('kep13319')
  .update(0,{ Value: 42 })
  .then(async res => {
    console.log('updated Kep13319');
  })
  .catch(e => {
    console.error('Authentication error', e);
  });
  */
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