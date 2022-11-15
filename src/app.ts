import express from 'express';
import { router } from '@routes/routes';
import { logger } from '@utils/logger';

// eslint-disable-next-line dot-notation
const port = process.env['PORT'] || 3000;
const server = express();

server.use(express.json());
server.use(router);

server.listen(port, () => {
  logger.info(`Running application at http://localhost:${port}/`);
});
