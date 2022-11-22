import { Router } from 'express';
import shiftRoutes from './shift.route';
import queryRoute from './query.route';

const router = Router();

router.use('/shift', shiftRoutes);
router.use('/query', queryRoute);

export default router;
