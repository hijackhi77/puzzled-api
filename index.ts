import 'dotenv/config';
import express from 'express';
import { appName } from './config';

const app = express();
const port = typeof process.env.PORT === 'undefined' ? 3000 : process.env.PORT;

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

import { router as apiRouter } from './routes/api';
app.use('/api', apiRouter);

app.listen(port, () =>
  console.log(`[INFO] ${appName} starts listening on port ${port}!`)
);
