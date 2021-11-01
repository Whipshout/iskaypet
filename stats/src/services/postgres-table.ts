const knex = require('./postgres-connection');

// Create postgres table if there is no one
export async function createTable () {
  try {
    if (!await knex.schema.hasTable('stats')) {
      await knex.schema.createTable('stats', (table) => {
        table.increments('id');
        table.string('species').notNullable();
        table.integer('age').notNullable();
      });
    } else {
      await knex('stats').select('*').del();
    }
    console.log('[::Stats::] Created Postgres table!');
  } catch (error) {
    console.log('[::Stats::] Unable to create Postgres table. Ensure a valid connection');
    throw new Error('Unable to create Postgres table. Ensure a valid connection');
  }
}
