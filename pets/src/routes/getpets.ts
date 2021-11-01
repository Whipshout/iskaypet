import express, { Request, Response } from 'express';

import { Pet } from '../models/pet';

const router = express.Router();

// Get request - Get pets list
router.get('/api/pets/lismascotas', async (req: Request, res: Response) => {
  const pets = await Pet.find();

  res.status(200).send(pets);
});

export { router as getPetsRouter };
