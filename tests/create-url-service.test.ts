import { CreateUrlService } from '@services/create-url-service';
import { UrlMock } from '@mocks/url';
import { CreateUrlServiceMock } from '@mocks/create-url-service';

const CreateUrlServiceSUT = new CreateUrlService(UrlMock as any);

describe('CreateUrlService class', () => {
  describe('(public) execute method', () => {
    test('should call "CreateUrlService.generateUrlId" method', async () => {
      const url = 'http://foo.bar/baz';
      const request = { url };

      CreateUrlServiceMock.generateUrlId.mockImplementation();
      UrlMock.searchById.mockImplementation();
      UrlMock.create.mockImplementation();

      await CreateUrlServiceSUT.execute(request);

      expect(CreateUrlServiceMock.generateUrlId).toBeCalledTimes(1);
      expect(CreateUrlServiceMock.generateUrlId).toBeCalledWith(url);
    });
    test('should search if the URL id already exists in database', async () => {
      const id = 'asdf';
      const request = { url: 'http://foo.bar/baz' };

      CreateUrlServiceMock.generateUrlId.mockReturnValue(id);
      UrlMock.searchById.mockImplementation();
      UrlMock.create.mockImplementation();

      await CreateUrlServiceSUT.execute(request);

      expect(UrlMock.searchById).toBeCalledTimes(1);
      expect(UrlMock.searchById).toBeCalledWith(id);
    });
    test('should return the URL content if it already registered', async () => {
      const id = 'asdf';
      const url = 'http://foo.bar/baz';
      const request = { url };
      const urlContent = { id, url };

      CreateUrlServiceMock.generateUrlId.mockReturnValue(id);
      UrlMock.searchById.mockResolvedValue(urlContent);

      const receivedValue = await CreateUrlServiceSUT.execute(request);
      const expectedValue = { success: true, shortenedLink: id };

      expect(receivedValue).toEqual(expectedValue);
      expect(UrlMock.create).toBeCalledTimes(0);
    });
    test('should create a new register if the URL does not exists', async () => {
      const id = 'asdf';
      const url = 'http://foo.bar/baz';
      const request = { url };

      CreateUrlServiceMock.generateUrlId.mockReturnValue(id);
      UrlMock.searchById.mockResolvedValue(undefined);
      UrlMock.create.mockImplementation();

      await CreateUrlServiceSUT.execute(request);

      expect(UrlMock.searchById).toBeCalledTimes(1);
      expect(UrlMock.searchById).toBeCalledWith(id);
      expect(UrlMock.create).toBeCalledTimes(1);
      expect(UrlMock.create).toBeCalledWith({ id, url });
    });
    test('should return generic message if fails without throw errors', async () => {
      const url = 'http://foo.bar/baz';
      const request = { url };

      CreateUrlServiceMock.generateUrlId.mockImplementation();
      UrlMock.searchById.mockResolvedValue(undefined);
      UrlMock.create.mockResolvedValue(undefined);

      const receivedValue = await CreateUrlServiceSUT.execute(request);
      const expectedValue = {
        success: false,
        message: 'The url cannot be shortened, please try again later!',
      };

      expect(UrlMock.searchById).toBeCalledTimes(1);
      expect(UrlMock.create).toBeCalledTimes(1);
      expect(receivedValue).toEqual(expectedValue);
    });
  });
  describe('(private) generateUrlId method', () => {
    test('should generate the id based on URL (string > Base64 > md5)', () => {
      const url = 'http://foo.bar/baz';

      CreateUrlServiceMock.generateUrlId.mockRestore();

      const expectedValue = 'e7692d';
      const receivedValue = (CreateUrlServiceSUT as any).generateUrlId(url);

      expect(receivedValue).toEqual(expectedValue);
    });
    test('should always return a 6-digit id', () => {
      let url: string;
      let id: string;

      url = 'f';
      id = (CreateUrlServiceSUT as any).generateUrlId(url);
      expect(id.length).toEqual(6);

      url = 'foo';
      id = (CreateUrlServiceSUT as any).generateUrlId(url);
      expect(id.length).toEqual(6);

      url = 'foo.bar';
      id = (CreateUrlServiceSUT as any).generateUrlId(url);
      expect(id.length).toEqual(6);

      url = 'http://foo.bar/baz';
      id = (CreateUrlServiceSUT as any).generateUrlId(url);
      expect(id.length).toEqual(6);

      url = 'http://foo.bar/baz/baz';
      id = (CreateUrlServiceSUT as any).generateUrlId(url);
      expect(id.length).toEqual(6);

      url = 'http://foo.bar/baz/baz/quux';
      id = (CreateUrlServiceSUT as any).generateUrlId(url);
      expect(id.length).toEqual(6);
    });
  });
});
