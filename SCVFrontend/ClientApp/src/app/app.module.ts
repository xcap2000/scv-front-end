import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
//import { HttpXSRFInterceptor } from './http-xsrf.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' }
    ]),
    ProvidersModule,
    BsDropdownModule.forRoot()
  ],
  providers: [
    SpinnerService/*, /* TODO - Verify whether it will be possible to re-enable.
    { provide: HTTP_INTERCEPTORS, useClass: HttpXSRFInterceptor, multi: true }*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
