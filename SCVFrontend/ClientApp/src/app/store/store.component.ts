import { Component, OnInit } from '@angular/core';
import { BrandListModel } from '../brand-list.model';
import { ActivatedRoute } from '@angular/router';
import { StoreListModel } from '../store-list.model';
import { StoreService } from '../store.service';
import { BrandService } from '../brand.service';
import { AuthorizationService } from '../authorization.service';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  public brands: BrandListModel[] = [];
  public storeListModels: StoreListModel[] = [];
  private brandId: string;

  public constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private storeService: StoreService,
    private authorizationService: AuthorizationService,
    private brandService: BrandService) { }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.brandId = params['brandId'];
      this.brandService.get()
        .subscribe(
          brands => {
            this.brands = brands;
            this.storeService.get(this.authorizationService.getUserId(), this.brandId)
              .subscribe(
                products => {
                  this.storeListModels = products;
                },
                error => console.log(error)
              )
          },
          error => console.log(error)
        );
    });
  }

  public buy(storeListModel: StoreListModel): void {
    this.cartService.post(this.authorizationService.getUserId(), storeListModel.id)
      .subscribe(
        cartItemModel => storeListModel.inCart = true,
        error => console.log(error)
      )
  }

  public canBuy(): boolean {
    return this.authorizationService.isAuthorized();
  }
}