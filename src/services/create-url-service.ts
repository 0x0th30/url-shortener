import md5 from 'md5';

interface CreateUrlRequest {
  url: string,
}

class CreateUrlService {
  public execute(request: CreateUrlRequest) {
    const urlId = this.generateUrlId(request.url);
  }

  private generateUrlId(url: string) {
    const urlBuffer = Buffer.from(url);

    const base64Url = urlBuffer.toString('base64');
    const md5Url = md5(base64Url);
    const urlId = md5Url.slice(0, 6);

    return urlId;
  }
}

export { CreateUrlService, CreateUrlRequest };
