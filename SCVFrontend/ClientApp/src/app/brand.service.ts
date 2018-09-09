import { Injectable, Inject } from '@angular/core';
import { BrandListModel } from './brand-list.model';
import { Observable } from 'rxjs/Observable';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BrandService extends BaseService {

  public constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
    super();
  }

  public get(): Observable<BrandListModel[]> {
    return this.http.get<BrandListModel[]>(this.baseUrl + 'brands', { headers: this.getDefaultHeaders() });
  }

}