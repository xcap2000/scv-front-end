import { Injectable, forwardRef, Inject } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { SpinnerService } from "./spinner.service";
import { catchError, finalize, map } from 'rxjs/operators';

@Injectable()
export class HttpSpinnerInterceptor implements HttpInterceptor {

  private counter: number = 0;

  public constructor(
    @Inject(forwardRef(() => SpinnerService)) private spinnerService) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.counter++;
    if(this.counter > 0)
      this.spinnerService.show();
    return next.handle(req).pipe(
      map(event => {
        return event;
      }),
      catchError(error => {
        return Observable.throw(error);
      }),
      finalize(() => {
        this.counter--;
        if(this.counter === 0)
          this.spinnerService.hide();
      })
    )
  }
}