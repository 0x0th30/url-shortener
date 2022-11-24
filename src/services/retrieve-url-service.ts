import { Url } from '@entities/url';
import { logger } from '@loaders/logger';

export interface RetrieveUrlRequest {
  id: string,
}

export interface RetrieveUrlResponse {
  success: boolean,
  url?: string,
  message?: string,
}

export class RetrieveUrlService {
  private url: Url;

  constructor(url: Url) {
    this.url = url;
  }

  public async execute(request: RetrieveUrlRequest): Promise<RetrieveUrlResponse> {
    logger.info('Initializing retrieve-url-service...');

    const response: RetrieveUrlResponse = { success: false };

    logger.info('Starting to search by the specified id...');
    const { id } = request;
    const urlExists = await this.url.searchById(id);
    if (urlExists) {
      response.success = true;
      response.url = urlExists.url;

      return response;
    }

    logger.error('The specified id cannot be found!');

    response.success = false;
    response.message = 'Not found url id!';

    return response;
  }
}
