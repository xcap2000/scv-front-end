import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CartItemModel } from './cart-item.model';
import { CartModel } from './cart.model';

@Injectable()
export class CartService extends BaseService {

  public constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
    super();
  }

  public get(userId: string): Observable<CartModel> {
    return this.http.get<CartModel>(this.baseUrl + `cart/${userId}`, { headers: this.getDefaultHeaders() });
  }

  public post(userId: string, productId: string): Observable<CartItemModel> {
    return this.http.post<CartItemModel>(this.baseUrl + 'cart', {userId: userId, productId: productId}, { headers: this.getDefaultHeaders() });
  }

  public put(cartItemId: string, quantity: number): Observable<boolean> {
    return this.http.put<boolean>(this.baseUrl + 'cart', {cartItemId: cartItemId, quantity: quantity}, { headers: this.getDefaultHeaders() });
  }

  public delete(cartItemId: string): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl + `cart/${cartItemId}`, { headers: this.getDefaultHeaders() });
  }
}