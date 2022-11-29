import { RetrieveUrlService } from '@services/retrieve-url-service';

export const RetrieveUrlServiceMock = {
  execute: jest.spyOn(RetrieveUrlService.prototype, 'execute'),
};
