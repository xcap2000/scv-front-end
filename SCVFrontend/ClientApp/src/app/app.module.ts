import { BrowserModule } from '@angular/platform-browser';
import { NgModule, forwardRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ProvidersModule } from './providers/providers.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner.service';
import { HttpJWTInterceptor } from './http-jwt.interceptor';
import { SignInComponent } from './signin/signin.component';
import { AuthorizationService } from './authorization.service';
import { SignInService } from './signin.service';
import { HttpSpinnerInterceptor } from './http-spinner.interceptor';
import { AuthorizedGuard } from './authorized.guard';
import { ProductsComponent } from './products/products.component';
import { SellingProductsComponent } from './selling-products/selling-products.component';
import { BrandService } from './brand.service';
import { SellingProductService } from './selling-product.service';
import { CartComponent } from './cart/cart.component';
import { CartService } from './cart.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    SpinnerComponent,
    SignInComponent,
    ProductsComponent,
    SellingProductsComponent,
    CartComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent, pathMatch: 'full' },
      { path: 'selling-products', component: SellingProductsComponent, pathMatch: 'full', canActivate: [AuthorizedGuard] },
      { path: 'selling-products/:brandId', component: SellingProductsComponent, pathMatch: 'full', canActivate: [AuthorizedGuard] },
      { path: 'cart', component: CartComponent, pathMatch: 'full', canActivate: [AuthorizedGuard] },
      { path: 'signin', component: SignInComponent, pathMatch: 'full' },
      { path: 'products', component: ProductsComponent, pathMatch: 'full', canActivate: [AuthorizedGuard] },
      { path: '',    redirectTo: '/home', pathMatch: 'full'  }
    ]),
    ProvidersModule,
    BsDropdownModule.forRoot()
  ],
  providers: [
    SpinnerService,
    AuthorizationService,
    SignInService,
    BrandService,
    SellingProductService,
    CartService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpSpinnerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpJWTInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
