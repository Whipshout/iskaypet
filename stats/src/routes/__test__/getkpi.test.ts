import { newDb } from 'pg-mem';
import { calculate } from '../../services/calculate-deviation'

const mem = newDb();
const knex = mem.adapters.createKnex();

// Mock postgres
async function createTable(knex: any) {
  await knex.schema.createTable('testdb', table => {
    table.increments('id');
    table.string('species').notNullable();
    table.integer('age').notNullable();
  })
}

async function dropTable(knex: any) {
  await knex.schema.dropTable('testdb');
}

interface StatsReportTest {
  animal: string
  averageAge: number
  standardDeviation: Number
}

async function loadDataTest (knex: any): Promise<StatsReportTest> {
    const specieDominant =  await knex('testdb').select('species')
      .count({ elements: 'age' })
      .groupBy('species')
      .orderBy('elements', 'desc')
      .first();

    if (!specieDominant) {
      return { animal: 'No data available', averageAge: 0, standardDeviation: 0 }
    }

    const averageAgeRaw = await knex('testdb').where('species', specieDominant.species).avg('age');
    const averageAge = Number(averageAgeRaw[0].avg)

    const ages = await knex('testdb').where('species', specieDominant.species).select('age');

    const standardDeviation = calculate(ages, averageAge);

    return { animal: specieDominant.species, averageAge, standardDeviation }
}

beforeEach(async () => {
  await createTable(knex);
});

afterEach(async () => {
  await dropTable(knex);
});

afterAll(async () => {
  await knex.destroy();
});

describe("Tests for 'getKpi' route", () => {
  it('returns kpi when there is data available', async () => {
    await knex('testdb').insert({ species: 'Dog', age: 18 });
    await knex('testdb').insert({ species: 'Dog', age: 2 });
    await knex('testdb').insert({ species: 'Cat', age: 2 });

    const {animal, averageAge, standardDeviation} = await loadDataTest(knex);

    expect(animal).toBe('Dog');
    expect(averageAge).toBe(10);
    expect(standardDeviation).toBe(8);
  });

  it('returns animal: No data available when there is no data available', async () => {
    const {animal, averageAge, standardDeviation} = await loadDataTest(knex);

    expect(animal).toBe('No data available');
    expect(averageAge).toBe(0);
    expect(standardDeviation).toBe(0);
  });
});

