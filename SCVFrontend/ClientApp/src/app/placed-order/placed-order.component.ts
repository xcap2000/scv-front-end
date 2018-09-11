import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-placed-order',
  templateUrl: './placed-order.component.html',
  styleUrls: ['./placed-order.component.css']
})
export class PlacedOrderComponent implements OnInit {
  
  public orderNumber: number;

  public constructor(
    private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.orderNumber = params['orderId'];
    });
  }

}
