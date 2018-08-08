import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ProviderService {
  
  constructor() { }

  getProviders() : Observable<ProviderListModel[]> {
    return of([]);
  }

}

export class ProviderListModel {
  constructor(
    public id: string,
    public name: string,
    public baseApiUrl: string) {

    }
}