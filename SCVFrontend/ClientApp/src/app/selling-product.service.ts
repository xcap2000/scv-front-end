import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs/Observable';
import { SellingProductListModel } from './selling-product-list.model';

@Injectable()
export class SellingProductService extends BaseService {

  public constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
    super();
  }

  public get(userId: string, brandId: string = null): Observable<SellingProductListModel[]> {
    return this.http.get<SellingProductListModel[]>(this.baseUrl + 'selling-products/' + userId + (brandId ? '/' + brandId : ''), { headers: this.getDefaultHeaders() });
  }
}