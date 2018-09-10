import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
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
import { StoreComponent } from './store/store.component';
import { BrandService } from './brand.service';
import { StoreService } from './store.service';
import { CartComponent } from './cart/cart.component';
import { CartService } from './cart.service';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    SpinnerComponent,
    SignInComponent,
    ProductsComponent,
    StoreComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'store', component: StoreComponent, pathMatch: 'full' },
      { path: 'store/:brandId', component: StoreComponent, pathMatch: 'full' },
      { path: 'cart', component: CartComponent, pathMatch: 'full', canActivate: [AuthorizedGuard] },
      { path: 'checkout/:cartId', component: CheckoutComponent, pathMatch: 'full', canActivate: [AuthorizedGuard] },
      { path: 'signin', component: SignInComponent, pathMatch: 'full' },
      { path: 'products', component: ProductsComponent, pathMatch: 'full', canActivate: [AuthorizedGuard] },
      { path: '',    redirectTo: '/store', pathMatch: 'full'  }
    ]),
    ProvidersModule,
    BsDropdownModule.forRoot()
  ],
  providers: [
    SpinnerService,
    AuthorizationService,
    SignInService,
    BrandService,
    StoreService,
    CartService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpSpinnerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpJWTInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
