import { Router } from 'express';
import * as QueryController from '../controllers/query.controller';

const router = Router();

router.route('/4').post(QueryController.Q4);
router.route('/5').post(QueryController.Q5);
router.route('/6').post(QueryController.Q6);

export default router;
