import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ProviderListModel } from './provider-list.model';
import { PagedResult } from './paged-result.model';


@Injectable()
export class ProviderService {
  public constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) { }

  public get(filter: string = null, page: number = 1, itemsPerPage: number = 10): Observable<PagedResult<ProviderListModel>> {
    const headers = new HttpHeaders()
      .set('Content-Type', ['application/json', 'charset=utf-8']);

    let params = new HttpParams()
      .set('page', page.toString())
      .set('itemsPerPage', itemsPerPage.toString());

    if (filter) {
      params = params.set('filter', filter);
    }

    return this.http.get<PagedResult<ProviderListModel>>(this.baseUrl + 'providers', { headers: headers, params: params });
  }
}