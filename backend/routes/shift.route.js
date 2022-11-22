import { Router } from 'express';
import * as ShiftController from '../controllers/shift.controller';

const router = Router();

router.route('/').get(ShiftController.list);
router.route('/compare').post(ShiftController.compare);

export default router;
