import { Component, OnInit } from '@angular/core';
import { CheckoutModel } from '../checkout.model';
import { ActivatedRoute, Router } from '@angular/router';
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
    verificationCode: null
  };

  public constructor(
    private router: Router,
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
          this.router.navigate(['/placed-order', orderNumber.toString().padStart(10, '0')]);
        },
        error => console.log(error)
      )
  }
}