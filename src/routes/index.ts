import { Router } from 'express';
import authRouter from './auth';
import healthRouter from './health';

const router = Router();

router.use('/auth', authRouter);
router.use('/health', healthRouter);

export default router;
