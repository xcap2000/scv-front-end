import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs/Observable';
import { StoreListModel } from './store-list.model';

@Injectable()
export class StoreService extends BaseService {

  public constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
    super();
  }

  public get(userId: string = null, brandId: string = null): Observable<StoreListModel[]> {
    let params = new HttpParams();

    if (userId) {
      params = params.set('userId', userId);
    }

    if (brandId) {
      params = params.set('brandId', brandId);
    }

    return this.http.get<StoreListModel[]>(this.baseUrl + 'store', { headers: this.getDefaultHeaders(), params: params });
  }
}