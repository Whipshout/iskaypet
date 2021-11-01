import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { errorHandler, NotFoundError } from '@wutils/common'
import { getKpiRouter } from './routes/getkpi'
import { swaggerRouter } from './routes/swagger'

const app = express();
app.set('trust proxy', true);
app.use(json());

app.use(getKpiRouter);
app.use(swaggerRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
