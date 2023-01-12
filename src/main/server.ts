import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './routes';

dotenv.config({ path: '.env' });

const app = express();

app.use(cors());

app.use(express.json({
  type: ['application/json']
}));

app.use(router);

export { app };
