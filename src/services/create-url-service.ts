import md5 from 'md5';
import { Url } from '@entities/url';
import { logger } from '@loaders/logger';

export interface CreateUrlRequest {
  url: string,
}

export interface CreateUrlResponse {
  success: boolean,
  shortenedLink?: string,
  message?: string,
}

export class CreateUrlService {
  private url: Url;

  constructor(url: Url) {
    this.url = url;
  }

  public async execute(request: CreateUrlRequest): Promise<CreateUrlResponse> {
    logger.info('Initializing create-url-service...');

    const response: CreateUrlResponse = { success: false };

    logger.info('Generating a url id...');
    const id = this.generateUrlId(request.url);

    logger.info('Checking if the requested url already be shortened...');
    const urlExists = await this.url.searchById(id);
    if (urlExists) {
      response.success = true;
      response.shortenedLink = urlExists.id;

      return response;
    }

    logger.info('Creating a new register to the requested url...');
    const createUrl = await this.url.create({ id, url: request.url });
    if (createUrl) {
      response.success = true;
      response.shortenedLink = createUrl.id;

      return response;
    }

    logger.error('The url cannot be shortened by unknown reasons!');

    response.success = false;
    response.message = 'The url cannot be shortened, please try again later!';

    return response;
  }

  private generateUrlId(url: string) {
    logger.info('Starting to generate url id...');

    const urlBuffer = Buffer.from(url);

    const base64Url = urlBuffer.toString('base64');
    const md5Url = md5(base64Url);
    const urlId = md5Url.slice(0, 6);

    logger.info('The url id was successfully generated.');

    return urlId;
  }
}
