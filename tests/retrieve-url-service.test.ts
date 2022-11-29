import { RetrieveUrlService } from '@services/retrieve-url-service';
import { UrlMock } from '@mocks/url';

const RetrieveUrlServiceSUT = new RetrieveUrlService(UrlMock as any);

describe('RetrieveUrlService class', () => {
  describe('(public) execute', () => {
    test('should search by the requested id', async () => {
      const id = 'asdf';
      const request = { id };

      UrlMock.searchById.mockImplementation();

      await RetrieveUrlServiceSUT.execute(request);

      expect(UrlMock.searchById).toBeCalledTimes(1);
      expect(UrlMock.searchById).toBeCalledWith(id);
    });
    test('should return the URL content if id be found', async () => {
      const id = 'asdf';
      const url = 'http://foo.bar/baz';
      const request = { id };
      const urlContent = { id, url };

      UrlMock.searchById.mockResolvedValue(urlContent);

      const expectedValue = { success: true, url };
      const receivedValue = await RetrieveUrlServiceSUT.execute(request);

      expect(receivedValue).toEqual(expectedValue);
    });
    test('should return error message if id not be found', async () => {
      const id = 'asdf';
      const request = { id };

      UrlMock.searchById.mockResolvedValue(undefined);

      const expectedValue = { success: false, message: 'Not found url id!' };
      const receivedValue = await RetrieveUrlServiceSUT.execute(request);

      expect(receivedValue).toEqual(expectedValue);
    });
  });
});
