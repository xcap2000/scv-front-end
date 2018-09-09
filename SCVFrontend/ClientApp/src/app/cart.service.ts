import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BrandListModel } from './brand-list.model';
import { CartItemModel } from './cart-item.model';

@Injectable()
export class CartService extends BaseService {

  public constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
    super();
  }

  public post(userId: string, productId: string): Observable<CartItemModel> {
    return this.http.post<CartItemModel>(this.baseUrl + 'cart', {userId: userId, productId: productId}, { headers: this.getDefaultHeaders() });
  }

}
