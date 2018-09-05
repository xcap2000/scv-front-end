import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { AuthorizationService } from "./authorization.service";

@Injectable()
export class HttpJWTInterceptor implements HttpInterceptor {

  constructor(private authorizationService: AuthorizationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headerName = 'Authorization';
    let token = 'Bearer ' + this.authorizationService.getToken();
    if (token !== null && !req.headers.has(headerName)) {
      req = req.clone({ headers: req.headers.set(headerName, token) });
    }
    return next.handle(req);
  }

}