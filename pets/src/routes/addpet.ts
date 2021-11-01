import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '@wutils/common';
import { natsWrapper } from '../nats-wrapper';
import { Pet } from '../models/pet';
import { PetCreatedPublisher } from '../events/publishers/pet-created-publisher'

const router = express.Router();

// Post request - Add pet to MongoDB
// Needed 5 params
router.post(
  '/api/pets/creamascota',
  [
    body('name').trim().notEmpty().withMessage('Name must not be empty'),
    body('species').trim().notEmpty().withMessage('Name must not be empty'),
    body('gender').trim().notEmpty().withMessage('Name must not be empty'),
    body('age').trim().isNumeric().withMessage('Age must be a number'),
    body('birthdate').trim().notEmpty().withMessage('Birthdate must not be empty'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, species, gender, age, birthdate } = req.body;

    const pet = Pet.build({ name, species, gender, age, birthdate });
    await pet.save();

    // Message to Event-bus
    await new PetCreatedPublisher(natsWrapper.client).publish({
      name: pet.name,
      species: pet.species,
      gender: pet.gender,
      age: pet.age,
      birthdate: pet.birthdate,
    });

    res.status(201).send(pet);
  }
);

export { router as addPetRouter };
