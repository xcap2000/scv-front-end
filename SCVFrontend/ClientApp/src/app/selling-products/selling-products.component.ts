import { Component, OnInit } from '@angular/core';
import { BrandListModel } from '../brand-list.model';
import { ActivatedRoute } from '@angular/router';
import { SellingProductListModel } from '../selling-product-list.model';
import { SellingProductService } from '../selling-product.service';
import { BrandService } from '../brand.service';
import { AuthorizationService } from '../authorization.service';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-selling-products',
  templateUrl: './selling-products.component.html',
  styleUrls: ['./selling-products.component.css']
})
export class SellingProductsComponent implements OnInit {

  public brands: BrandListModel[] = [];
  public sellingProducts: SellingProductListModel[] = [];
  private brandId: string;

  public constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private sellingProductService: SellingProductService,
    private authorizationService: AuthorizationService,
    private brandService: BrandService) { }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.brandId = params['brandId'];
      this.brandService.get()
        .subscribe(
          brands => {
            this.brands = brands;
            this.sellingProductService.get(this.authorizationService.getUserId(), this.brandId)
              .subscribe(
                products => {
                  this.sellingProducts = products;
                },
                error => console.log(error)
              )
          },
          error => console.log(error)
        );
    });
  }

  public buy(sellingProduct: SellingProductListModel): void {
    this.cartService.post(this.authorizationService.getUserId(), sellingProduct.id)
      .subscribe(
        cartItemModel => sellingProduct.inCart = true,
        error => console.log(error)
      )
  }
}