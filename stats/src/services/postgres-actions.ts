import { Stat } from '../models/stat'
import { Knex } from 'knex'
import {calculate} from './calculate-deviation'

const knex = require('./postgres-connection');

// Stats model
interface StatsReport {
  animal: string
  averageAge: number
  standardDeviation: Number
}

// Save data in postgres
async function saveData (knex: Knex, data: Stat) {
  try {
    await knex('stats')
      .insert({ species: data.species, age: data.age });
  } catch (error) {
    console.log('[::Stats::] Unable to save data in Postgres. Ensure a valid connection');
    throw new Error('[::Stats::] Unable to save data in Postgres. Ensure a valid connection');
  }
}

// Load data and calculate kpi
export async function loadData (): Promise<StatsReport> {
  try {
    // Specie most dominant
    const specieDominant =  await knex('stats').select('species')
      .count({ elements: 'age' })
      .groupBy('species')
      .orderBy('elements', 'desc')
      .first();

    if (!specieDominant) {
      return { animal: 'No data available', averageAge: 0, standardDeviation: 0 }
    }

    // Average age
    const averageAgeRaw = await knex('stats').where('species', specieDominant.species).avg('age');
    const averageAge = Number(averageAgeRaw[0].avg)

    const ages = await knex('stats').where('species', specieDominant.species).select('age');

    // Standard deviation
    const standardDeviation = calculate(ages, averageAge);

    return { animal: specieDominant.species, averageAge, standardDeviation }
  } catch (err) {
    console.log('[::Stats::] Unable to load data from Postgres. Ensure a valid connection');
    throw new Error('[::Stats::] Unable to load data from Postgres. Ensure a valid connection');
  }
}

// Get data from event-bus message and try to save it in Postgres
export async function getData (data: Stat) {
  try {
    await saveData(knex, data);
  } catch (err) {
    console.log('[::Stats::] Unable to get data from message. Ensure a valid connection');
    throw new Error('[::Stats::] Unable to get data from message. Ensure a valid connection');
  }
}
