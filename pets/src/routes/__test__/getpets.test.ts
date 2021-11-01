import request from 'supertest';
import { app } from '../../app';

describe("Tests for 'getPets' route", () => {
  it('returns pets list when database has data on successful get', async () => {
    await request(app)
      .post('/api/pets/creamascota')
      .send({
        name: 'Wampo',
        species: 'Dog',
        gender: 'Male',
        age: 8,
        birthdate: '11-08-2013'
      })
      .expect(201);

    const pets = await request(app)
      .get('/api/pets/lismascotas')
      .send()
      .expect(200);

    expect(pets.body).toHaveLength(1);
    expect(pets.body[0].name).toEqual('Wampo');
    expect(pets.body[0].species).toEqual('Dog');
    expect(pets.body[0].gender).toEqual('Male');
    expect(pets.body[0].age).toEqual(8);
    expect(pets.body[0].birthdate).toEqual('11-08-2013');
  });

  it('returns an empty list when database has no data on successful get', async () => {
    const pets = await request(app)
      .get('/api/pets/lismascotas')
      .send()
      .expect(200);

    expect(pets.body).toHaveLength(0);
  });
});

