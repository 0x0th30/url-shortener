import { Url } from '@entities/url';

export const UrlMock = {
  searchById: jest.spyOn(Url.prototype, 'searchById'),
  create: jest.spyOn(Url.prototype, 'create'),
};
