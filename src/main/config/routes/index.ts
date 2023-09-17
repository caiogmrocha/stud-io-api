import { Router } from 'express';
import { profileRouter } from './profiles.routes';

const router = Router();

router.use('/profiles', profileRouter);

export { router };
