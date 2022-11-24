import { CreateUrlService, CreateUrlRequest, CreateUrlResponse }
  from '@services/create-url-service';
import { Url } from '@entities/url';
import { prisma } from '@loaders/prisma-client';
import { Request, Response } from 'express';

const urlEntity = new Url(prisma);
const createUrlService = new CreateUrlService(urlEntity);

export async function createUrl(req: Request, res: Response) {
  const response: CreateUrlResponse = { success: false };

  const { host } = req.headers;

  const { url } = req.body;
  if (!url) {
    response.success = false;
    response.message = 'Missing "url" post parameter!';
    return res.status(400).json(response);
  }

  const createUrlRequest: CreateUrlRequest = { url };
  const createUrlResponse: CreateUrlResponse = await createUrlService
    .execute(createUrlRequest);

  if (createUrlResponse.success) {
    response.success = true;
    response.shortenedLink = `http://${host}/${createUrlResponse.shortenedLink}`;

    return res.status(201).json(response);
  }

  response.success = false;
  response.message = createUrlResponse.message;

  return res.status(500).json(response);
}
