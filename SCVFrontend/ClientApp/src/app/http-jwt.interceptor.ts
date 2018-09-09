import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { AuthorizationService } from "./authorization.service";
import { Router } from "@angular/router";
import 'rxjs/add/operator/do';

@Injectable()
export class HttpJWTInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authorizationService: AuthorizationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headerName = 'Authorization';
    let token = 'Bearer ' + this.authorizationService.getToken();
    if (token !== null && !req.headers.has(headerName)) {
      req = req.clone({ headers: req.headers.set(headerName, token) });
    }
    return next.handle(req).do((event: HttpEvent<any>) => {
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.authorizationService.removeAuthorization();
          this.router.navigate(['signin']);
        }
      }
    });
  }

}