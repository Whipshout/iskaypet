import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { errorHandler, NotFoundError } from '@wutils/common'

import { addPetRouter } from './routes/addpet'
import { getPetsRouter } from './routes/getpets'
import { swaggerRouter } from './routes/swagger'

const app = express();
app.set('trust proxy', true);
app.use(json());

app.use(addPetRouter);
app.use(getPetsRouter);
app.use(swaggerRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
