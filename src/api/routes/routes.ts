import { Router } from 'express';
import { test } from '@middlewares/test';
import { createUrl } from '@middlewares/create-url';

const router = Router();
router.get('/', test);
router.post('/create', createUrl);

export { router };
