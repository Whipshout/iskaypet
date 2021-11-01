// Postgres configuration
const config = {
  development: {
    client: 'pg',
    connection: {
      host : process.env.POSTGRES_HOST,
      port : Number(process.env.POSTGRES_PORT),
      user : process.env.POSTGRES_USER,
      password : process.env.POSTGRES_PASSWORD,
      database : process.env.POSTGRES_DB
    },
    pool: {
      min: 1,
      max: 10,
      idleTimeoutMillis: 10000
    },
    acquireConnectionTimeout: 10000
  }
};

// Try to connect to postgres and export it
try {
  const knex = require('knex')(config['development']);
  module.exports = knex;
  console.log('[::Stats::] Connected to Postgres via Knex!');
} catch (err) {
  console.log('[::Stats::] Unable to connect to Postgres via Knex. Ensure a valid connection');
  throw new Error('Unable to connect to Postgres via Knex. Ensure a valid connection');
}




