import { Router } from 'express';
import { createUrl } from '@middlewares/create-url';
import { retrieveUrl } from '@middlewares/retrieve-url';

const router = Router();
router.get('/:id', retrieveUrl);
router.post('/create', createUrl);

export { router };
