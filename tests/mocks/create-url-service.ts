import { CreateUrlService } from '@services/create-url-service';

export const CreateUrlServiceMock = {
  execute: jest.spyOn(CreateUrlService.prototype, 'execute'),
  generateUrlId: jest.spyOn(CreateUrlService.prototype as any, 'generateUrlId'),
};
