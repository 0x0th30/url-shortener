import { CreateUrlService, CreateUrlRequest, CreateUrlResponse }
  from '@services/create-url-service';
import { Url } from '@entities/url';
import { prisma } from '@loaders/prisma-client';
import { Request, Response } from 'express';
import { logger } from '@loaders/logger';

const urlEntity = new Url(prisma);
const createUrlService = new CreateUrlService(urlEntity);

export async function createUrl(req: Request, res: Response) {
  logger.info(`Received request at "${req.path}" from "${req.ip}"...`);

  const response: CreateUrlResponse = { success: false };

  const { host } = req.headers;

  const { url } = req.body;
  if (!url) {
    response.success = false;
    response.message = 'Missing "url" post parameter!';

    logger.error(response.message);
    return res.status(400).json(response);
  }

  const createUrlRequest: CreateUrlRequest = { url };
  const createUrlResponse: CreateUrlResponse = await createUrlService
    .execute(createUrlRequest);

  if (createUrlResponse.success) {
    response.success = true;
    response.shortenedLink = `http://${host}/${createUrlResponse.shortenedLink}`;

    logger.info('Request was successfully handled. Returning shortened link...');
    return res.status(201).json(response);
  }

  response.success = false;
  response.message = createUrlResponse.message;

  logger.error(response.message);
  return res.status(500).json(response);
}
