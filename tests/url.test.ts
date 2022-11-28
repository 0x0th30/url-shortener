import { Url } from '@entities/url';
import { PrismaClientMock } from '@mocks/prisma-client';

const UrlSUT = new Url(PrismaClientMock as any);

describe('Url class', () => {
  describe('(public) searchById method', () => {
    test('should call prisma-client findFirst function once time', async () => {
      const id = 'asdf';

      PrismaClientMock.url.findFirst.mockImplementation();

      await UrlSUT.searchById(id);

      expect(PrismaClientMock.url.findFirst).toBeCalledTimes(1);
    });
    test('should search by the specified id', async () => {
      const id = 'asdf';

      PrismaClientMock.url.findFirst.mockImplementation();

      await UrlSUT.searchById(id);

      expect(PrismaClientMock.url.findFirst).toBeCalledWith({ where: { id } });
    });
    test('should find and return the URL content, if exists', async () => {
      const id = 'asdf';
      const expectedValue = {
        id: 'asdf',
        url: 'http://foo.bar/baz',
      };

      PrismaClientMock.url.findFirst.mockResolvedValue(expectedValue);

      const receivedValue = await UrlSUT.searchById(id);

      expect(receivedValue).toBe(expectedValue);
    });
    test('should return undefined if the id does not exists', async () => {
      const id = 'asdf';
      const expectedValue = undefined;

      PrismaClientMock.url.findFirst.mockResolvedValue(null);

      const receivedValue = await UrlSUT.searchById(id);

      expect(receivedValue).toBe(expectedValue);
    });
    test('should re-throw error if something fail during id search', async () => {
      const id = 'asdf';
      const genericError = new Error('FOO');

      PrismaClientMock.url.findFirst.mockImplementation(() => { throw genericError; });

      try {
        await UrlSUT.searchById(id);
      } catch (error: any) {
        expect(error).toBe(genericError);
      }
    });
  });
  describe('(public) create method', () => {
    test('should call prisma-client create function once time', async () => {
      const data = {
        id: 'asdf',
        url: 'http://foo.bar/baz',
      };

      PrismaClientMock.url.create.mockImplementation();

      await UrlSUT.create(data);

      expect(PrismaClientMock.url.create).toBeCalledTimes(1);
    });
    test('should create the URL register with the specified data', async () => {
      const data = {
        id: 'asdf',
        url: 'http://foo.bar/baz',
      };

      PrismaClientMock.url.create.mockImplementation();

      await UrlSUT.create(data);

      expect(PrismaClientMock.url.create).toBeCalledWith({ data });
    });
    test('should create and return the created URL content', async () => {
      const data = {
        id: 'asdf',
        url: 'http://foo.bar/baz',
      };

      PrismaClientMock.url.create.mockResolvedValue(data);

      const receivedValue = await UrlSUT.create(data);

      expect(receivedValue).toBe(data);
    });
    test('should re-throw error if something fail during URL creation', async () => {
      const data = {
        id: 'asdf',
        url: 'http://foo.bar/baz',
      };
      const genericError = new Error('FOO');

      PrismaClientMock.url.create.mockImplementation(() => { throw genericError; });

      try {
        await UrlSUT.create(data);
      } catch (error: any) {
        expect(error).toBe(genericError);
      }
    });
  });
});
