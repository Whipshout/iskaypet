import request from 'supertest';
import { app } from '../../app';

describe("Tests for 'addPet' route", () => {
  it('returns a 201 on successful register', async () => {
    return request(app)
      .post('/api/pets/creamascota')
      .send({
        name: 'Wampo',
        species: 'Dog',
        gender: 'Male',
        age: 8,
        birthdate: '11-08-2013'
      })
      .expect(201);
  });

  it('returns a 400 with an invalid name', async () => {
    return request(app)
      .post('/api/pets/creamascota')
      .send({
        name: '',
        species: 'Dog',
        gender: 'Male',
        age: 8,
        birthdate: '11-08-2013'
      })
      .expect(400);
  });

  it('returns a 400 with an invalid species', async () => {
    return request(app)
      .post('/api/pets/creamascota')
      .send({
        name: 'Wampo',
        species: '',
        gender: 'Male',
        age: 8,
        birthdate: '11-08-2013'
      })
      .expect(400);
  });

  it('returns a 400 with an invalid gender', async () => {
    return request(app)
      .post('/api/pets/creamascota')
      .send({
        name: 'Wampo',
        species: 'Dog',
        gender: '',
        age: 8,
        birthdate: '11-08-2013'
      })
      .expect(400);
  });

  it('returns a 400 with an invalid age', async () => {
    return request(app)
      .post('/api/pets/creamascota')
      .send({
        name: 'Wampo',
        species: 'Dog',
        gender: 'Male',
        age: 'asdf',
        birthdate: '11-08-2013'
      })
      .expect(400);
  });

  it('returns a 400 with an invalid birthdate', async () => {
    return request(app)
      .post('/api/pets/creamascota')
      .send({
        name: 'Wampo',
        species: 'Dog',
        gender: 'Male',
        age: 8,
        birthdate: ''
      })
      .expect(400);
  });
});


