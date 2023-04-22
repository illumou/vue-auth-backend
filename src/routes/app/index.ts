import { Router } from 'express';
const router = Router();

import {checkBody} from '../../utils/middleware';

router.get('/', checkBody,(req, res) => res.sendStatus(200));

export default router;
