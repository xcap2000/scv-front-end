import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CartModel } from '../cart.model';
import { AuthorizationService } from '../authorization.service';
import { CartItemModel } from '../cart-item.model';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cartModel: CartModel = null;

  public constructor(
    private authorizationService: AuthorizationService,
    private cartService: CartService) { }

  public ngOnInit(): void {
    this.getCart();
  }

  public showEmptyMessage(): boolean {
    return this.cartModel === null;
  }

  public showCart(): boolean {
    return this.cartModel !== null;
  }

  public refresh(cartItem: CartItemModel): void {
    this.cartService.put(cartItem.id, cartItem.quantity)
      .subscribe(
        () => {
          this.getCart();
        },
        error => console.log(error)
      );
  }

  public remove(cartItemId: string): void {
    this.cartService.delete(cartItemId)
      .subscribe(
        () => {
          this.getCart();
        },
        error => console.log(error)
      );
  }

  private getCart(): void {
    this.cartService.get(this.authorizationService.getUserId())
      .subscribe(cartModel => this.cartModel = cartModel, error => console.log(error));
  }
}