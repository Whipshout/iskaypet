import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger.json'

const router = express.Router();

// Swagger request
router.use('/api/stats/swagger', swaggerUi.serve);
router.get('/api/stats/swagger', swaggerUi.setup(swaggerDocument));

export { router as swaggerRouter };
