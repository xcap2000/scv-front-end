import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ProviderListModel } from './provider-list.model';
import { PagedResult } from './paged-result.model';
import { ProviderCreateModel } from './provider-create.model';
import { ProviderEditModel } from './provider-edit.model';
import { BaseService } from './base.service';

@Injectable()
export class ProviderService extends BaseService {

  public constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
    super();
  }

  public get(filter: string = null, page: number = 1, itemsPerPage: number = 10): Observable<PagedResult<ProviderListModel>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('itemsPerPage', itemsPerPage.toString());

    if (filter) {
      params = params.set('filter', filter);
    }

    return this.http.get<PagedResult<ProviderListModel>>(this.baseUrl + 'providers', { headers: this.getDefaultHeaders(), params: params });
  }

  public getById(id: string = null): Observable<ProviderEditModel> {
    return this.http.get<ProviderEditModel>(this.baseUrl + `providers/${id}`, { headers: this.getDefaultHeaders() });
  }

  public post(providerCreateModel: ProviderCreateModel): Observable<ProviderCreateModel> {
    return this.http.post<ProviderCreateModel>(this.baseUrl + 'providers', providerCreateModel, { headers: this.getDefaultHeaders() });
  }

  public put(providerEditModel: ProviderEditModel): Observable<ProviderCreateModel> {
    return this.http.put<ProviderEditModel>(this.baseUrl + `providers/${providerEditModel.id}`, providerEditModel, { headers: this.getDefaultHeaders() });
  }

  public delete(id: string): Observable<ProviderCreateModel> {
    return this.http.delete<ProviderEditModel>(this.baseUrl + `providers/${id}`, { headers: this.getDefaultHeaders() });
  }

}