import { RetrieveUrlService, RetrieveUrlRequest, RetrieveUrlResponse }
  from '@services/retrieve-url-service';
import { Url } from '@entities/url';
import { prisma } from '@loaders/prisma-client';
import { Request, Response } from 'express';
import { logger } from '@loaders/logger';

const urlEntity = new Url(prisma);
const retrieveUrlService = new RetrieveUrlService(urlEntity);

export async function retrieveUrl(req: Request, res: Response) {
  logger.info(`Received request at "${req.path}" from "${req.ip}"...`);

  const response: RetrieveUrlResponse = { success: false };

  const { id } = req.params;
  if (!id) {
    response.success = false;
    response.message = 'Missing "id" parameters after "/"!';

    logger.error(response.message);
    return res.status(400).json(response);
  }

  const retrieveUrlRequest: RetrieveUrlRequest = { id };
  const retrieveUrlResponse: RetrieveUrlResponse = await retrieveUrlService
    .execute(retrieveUrlRequest);

  if (retrieveUrlResponse.success && retrieveUrlResponse.url) {
    logger.info('Request was successfully handled. Redirecting request...');
    return res.status(301).redirect(retrieveUrlResponse.url);
  }

  response.success = false;
  response.message = retrieveUrlResponse.message;

  logger.error(response.message);
  return res.status(404).json(response);
}
