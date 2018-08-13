import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { ProviderListModel } from './provider-list.model';
import { PagedResult } from './paged-result.model';


@Injectable()
export class ProviderService {
  public constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) { }

  // TODO - Add parameters to filter and page the records.
  public get(): Observable<PagedResult<ProviderListModel>> {
    return this.http.get<PagedResult<ProviderListModel>>(this.baseUrl + 'providers');
  }
}