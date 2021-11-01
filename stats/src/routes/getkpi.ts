import express, { Request, Response } from 'express';
import { loadData } from '../services/postgres-actions'

const router = express.Router();

// Get request - Return pets KPIs
router.get('/api/stats/kpidemascotas', async (req: Request, res: Response) => {
  const data = await loadData();
  res.status(200).send(data);
});

export { router as getKpiRouter };
