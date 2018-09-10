import { Component, OnInit } from '@angular/core';
import { CheckoutModel } from '../checkout.model';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public checkoutModel: CheckoutModel = {
    cartId: null,
    street: null,
    city: null,
    state: null,
    country: null,
    postalCode: null,
    creditCardNumber: null,
    verificationNumber: null
  };

  public constructor(
    private route: ActivatedRoute,
    private cartService: CartService) {
  }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.checkoutModel.cartId = params['cartId'];
    });
  }

  public confirm(): void {
    this.cartService.checkout(this.checkoutModel)
      .subscribe(
        orderNumber => {

        },
        error => console.log(error)
      )
  }
}