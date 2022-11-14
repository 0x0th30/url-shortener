import { Router } from 'express';
import { test } from '@middlewares/test';

const router = Router();
router.get('/', test);

export { router };
