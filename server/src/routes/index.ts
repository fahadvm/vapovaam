import { Router } from 'express';
import userRouter from './user.routes.js';
import categoryRouter from './category.routes.js';
import tripRouter from './trip.routes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/categories', categoryRouter);
router.use('/trips', tripRouter);

export default router;
