import { prisma } from '@loaders/prisma-client';

export const PrismaClientMock = {
  url: {
    findFirst: jest.spyOn(prisma.url, 'findFirst'),
    create: jest.spyOn(prisma.url, 'create'),
  },
};
