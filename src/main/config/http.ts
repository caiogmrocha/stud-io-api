import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { router } from './routes';
import { InternalServerError } from '@/presentation/http/contracts';

dotenv.config({ path: '.env' });

const app = express();

app.use(cors());

app.use(express.json({
	type: ['application/json']
}));

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
	return response.status(500).json({
		error: new InternalServerError(),
	});
});

app.use(router);

export { app };
