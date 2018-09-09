import { HttpHeaders } from '@angular/common/http';

export abstract class BaseService {
  protected getDefaultHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', ['application/json', 'charset=utf-8']);
  }
}