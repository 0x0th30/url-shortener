import { PrismaClient } from '@prisma/client';
import { logger } from '@loaders/logger';

export interface IUrl {
  id: string,
  url: string,
}

export class Url {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  public async searchById(id: string): Promise<IUrl | undefined> {
    logger.info('Starting to search url by id...');

    try {
      const url = await this.prisma.url.findFirst({ where: { id } });
      if (url) {
        logger.info(`The url with id "${id}" was successfully found.`);
        return url;
      }
    } catch (error: any) {
      logger.error(`Searching was failed by ${error.name}!`);
      throw error;
    }

    logger.error('The specified url id does not exists.');
    return undefined;
  }

  public async create(data: IUrl): Promise<IUrl | undefined> {
    logger.info('Starting to create url with the specified data...');

    try {
      const url = await this.prisma.url.create({ data });
      if (url) {
        logger.info('The url was successfully created.');
        return url;
      }
    } catch (error: any) {
      logger.error(`Creation was failed by ${error.name}!`);
      throw error;
    }

    logger.error('The url cannot be created.');
    return undefined;
  }
}
