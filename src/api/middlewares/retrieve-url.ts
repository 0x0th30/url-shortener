import { RetrieveUrlService, RetrieveUrlRequest, RetrieveUrlResponse }
  from '@services/retrieve-url-service';
import { Url } from '@entities/url';
import { prisma } from '@loaders/prisma-client';
import { Request, Response } from 'express';

const urlEntity = new Url(prisma);
const retrieveUrlService = new RetrieveUrlService(urlEntity);

export async function retrieveUrl(req: Request, res: Response) {
  const response: RetrieveUrlResponse = { success: false };

  const { id } = req.params;
  if (!id) {
    response.success = false;
    response.message = 'Missing "id" parameters after "/"!';
    return res.status(400).json(response);
  }

  const retrieveUrlRequest: RetrieveUrlRequest = { id };
  const retrieveUrlResponse: RetrieveUrlResponse = await retrieveUrlService
    .execute(retrieveUrlRequest);

  if (retrieveUrlResponse.success && retrieveUrlResponse.url) {
    return res.status(301).redirect(retrieveUrlResponse.url);
  }

  response.success = false;
  response.message = retrieveUrlResponse.message;

  return res.status(404).json(response);
}
